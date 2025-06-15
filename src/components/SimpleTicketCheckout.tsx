
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SimpleTicketCheckoutProps {
  eventName: string;
  ticketPrice: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SimpleTicketCheckout: React.FC<SimpleTicketCheckoutProps> = ({
  eventName,
  ticketPrice,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "Name required",
        description: "Please enter your full name."
      });
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Valid email required",
        description: "Please enter a valid email address."
      });
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment successful!",
        description: `Your ticket for ${eventName} has been confirmed.`
      });
      
      onSuccess?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const serviceFee = ticketPrice * 0.05; // 5% service fee
  const total = ticketPrice + serviceFee;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Ticket Checkout
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete your purchase for {eventName}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-medium">Customer Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isProcessing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-medium">Payment Summary</h3>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Ticket Price</span>
                <span>${ticketPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-medium">Payment Method</h3>
            
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>Stripe payment processing will be integrated here</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {onCancel && (
              <Button 
                variant="outline" 
                onClick={onCancel}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Purchase
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SimpleTicketCheckout;
