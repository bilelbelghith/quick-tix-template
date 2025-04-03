
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface StripeConnectProps {
  onComplete?: () => void;
}

enum ConnectStep {
  Initial,
  PayoutSchedule,
  TaxDetails,
  Complete,
}

const StripeConnect: React.FC<StripeConnectProps> = ({ onComplete }) => {
  const [step, setStep] = useState<ConnectStep>(ConnectStep.Initial);
  const [payoutSchedule, setPayoutSchedule] = useState<string>('weekly');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConnectStripe = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('create-stripe-account', {
        body: { returnUrl: window.location.href }
      });
      
      if (error) throw error;
      if (!data?.url) throw new Error("No URL returned");
      
      // Redirect to Stripe Connect onboarding
      window.location.href = data.url;
    } catch (err) {
      console.error("Error connecting to Stripe:", err);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Could not connect to Stripe. Please try again."
      });
      setIsLoading(false);
    }
  };

  const handlePayoutScheduleSubmit = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.functions.invoke('update-payout-schedule', {
        body: { payoutSchedule }
      });
      
      if (error) throw error;
      
      setStep(ConnectStep.TaxDetails);
      toast({
        description: "Payout schedule saved",
      });
    } catch (err) {
      console.error("Error setting payout schedule:", err);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update payout schedule. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaxDetailsSubmit = () => {
    setStep(ConnectStep.Complete);
    
    toast({
      title: "Setup complete",
      description: "Your payment settings have been saved",
    });
    
    if (onComplete) {
      onComplete();
    }
  };

  // Check URL for Stripe redirect response
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
      setStep(ConnectStep.PayoutSchedule);
      // Clear the URL params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect Payment Processing</CardTitle>
        <CardDescription>
          Set up your payment account to receive ticket sales directly
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {step === ConnectStep.Initial && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-6">
              Connect your Stripe account to receive payments directly from ticket sales.
              Tixify charges a small fee per ticket sold.
            </p>
            
            <Button 
              onClick={handleConnectStripe}
              className="w-full bg-[#635BFF] hover:bg-[#5851DB] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </span>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 8L11 12H15L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2"/>
                  </svg>
                  Connect with Stripe
                  <ExternalLink className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
        
        {step === ConnectStep.PayoutSchedule && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Set Payout Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Choose how often you want to receive your funds
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payout Frequency</label>
                <Select 
                  value={payoutSchedule} 
                  onValueChange={setPayoutSchedule}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly (Recommended)</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handlePayoutScheduleSubmit} 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Continue"}
              </Button>
            </div>
          </motion.div>
        )}
        
        {step === ConnectStep.TaxDetails && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Tax Information</h3>
              <p className="text-sm text-muted-foreground">
                For MVP purposes, we'll use mock tax information.
                In a production app, you would collect necessary tax details here.
              </p>
            </div>
            
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm">
                Mock tax information successfully verified.
              </p>
            </div>
            
            <Button 
              onClick={handleTaxDetailsSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Complete Setup
            </Button>
          </motion.div>
        )}
        
        {step === ConnectStep.Complete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-6"
          >
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-center">Setup Complete</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Your Stripe account is connected and ready to receive payments.
            </p>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center space-x-1">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-xs text-muted-foreground">Secure connection</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StripeConnect;
