
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
import { toast } from '@/hooks/use-toast';

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

  // This would be implemented using Stripe OAuth in a real application
  const handleConnectStripe = () => {
    // Simulate OAuth redirect
    setTimeout(() => {
      setStep(ConnectStep.PayoutSchedule);
      toast({
        title: "Stripe account connected",
        description: "You've successfully connected your Stripe account",
      });
    }, 1000);
  };

  const handlePayoutScheduleSubmit = () => {
    setStep(ConnectStep.TaxDetails);
    toast({
      description: "Payout schedule saved",
    });
  };

  const handleTaxDetailsSubmit = () => {
    setStep(ConnectStep.Complete);
    // In a real app, we would store the Stripe account ID in Supabase here
    
    toast({
      title: "Setup complete",
      description: "Your payment settings have been saved",
    });
    
    if (onComplete) {
      onComplete();
    }
  };

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
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8L11 12H15L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2"/>
              </svg>
              Connect with Stripe
              <ExternalLink className="ml-2 h-4 w-4" />
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
              >
                Continue
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
