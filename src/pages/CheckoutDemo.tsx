
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import SimpleTicketCheckout from '@/components/SimpleTicketCheckout';

const CheckoutDemo: React.FC = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handleSuccess = () => {
    setPurchaseComplete(true);
    setShowCheckout(false);
  };

  const handleCancel = () => {
    setShowCheckout(false);
  };

  const resetDemo = () => {
    setPurchaseComplete(false);
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold mb-4">Ticket Checkout Demo</h1>
              <p className="text-muted-foreground">
                Experience our simple and secure ticket purchasing process
              </p>
            </motion.div>

            {!showCheckout && !purchaseComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Ticket className="h-8 w-8 text-blue-600" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">Summer Music Festival</h2>
                    <p className="text-muted-foreground mb-6">
                      Join us for an amazing evening of live music and entertainment
                    </p>
                    
                    <div className="text-3xl font-bold text-blue-600 mb-6">
                      $45.00
                    </div>
                    
                    <Button 
                      size="lg"
                      onClick={() => setShowCheckout(true)}
                      className="w-full sm:w-auto"
                    >
                      Buy Ticket
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {showCheckout && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  className="mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Event
                </Button>
                
                <SimpleTicketCheckout
                  eventName="Summer Music Festival"
                  ticketPrice={45.00}
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
                />
              </motion.div>
            )}

            {purchaseComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Ticket className="h-8 w-8 text-green-600" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">Purchase Successful!</h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for your purchase. You'll receive a confirmation email shortly.
                    </p>
                    
                    <Button onClick={resetDemo}>
                      Try Another Purchase
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDemo;
