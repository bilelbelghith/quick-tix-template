import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Share2, CheckCircle, Loader2 } from 'lucide-react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { generateTicketPDF } from '@/utils/generateTicket';
import OrganizerFeedback from './OrganizerFeedback';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface CheckoutProps {
  eventId: string;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  primaryColor: string;
  logoUrl?: string | null;
  tickets: { tierId: string; name: string; quantity: number; price: number }[];
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutForm = ({ 
  eventId, 
  eventName, 
  eventDate, 
  eventLocation, 
  tickets, 
  primaryColor,
  logoUrl,
  onSuccess 
}: Omit<CheckoutProps, 'onClose'>) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [isGeneratingTicket, setIsGeneratingTicket] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('customerEmail');
    const savedName = localStorage.getItem('customerName');
    
    if (savedEmail) setCustomerEmail(savedEmail);
    if (savedName) setCustomerName(savedName);
  }, []);

  const subtotal = tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + serviceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (saveInfo) {
        localStorage.setItem('customerEmail', customerEmail);
        localStorage.setItem('customerName', customerName);
      }
      
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      });
      
      if (paymentError) {
        throw new Error(paymentError.message || 'Payment failed');
      }
      
      for (const ticket of tickets) {
        const { error: ticketError } = await supabase
          .from('tickets')
          .insert({
            event_id: eventId,
            ticket_tier_id: ticket.tierId,
            quantity: ticket.quantity,
            total_price: ticket.price * ticket.quantity,
            customer_email: customerEmail,
            customer_name: customerName,
          });
          
        if (ticketError) throw ticketError;
        
        const { error: updateError } = await supabase.rpc('decrease_available_tickets', {
          p_ticket_tier_id: ticket.tierId,
          p_quantity: ticket.quantity
        });
        
        if (updateError) throw updateError;
      }
      
      setIsComplete(true);
      toast({
        title: "Purchase successful!",
        description: "Your tickets are being generated.",
      });
      
      setIsGeneratingTicket(true);
      await generateAndSendTickets();
      setIsGeneratingTicket(false);
      
      onSuccess();
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "There was an error processing your payment.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateAndSendTickets = async () => {
    try {
      const { data: ticketData } = await supabase
        .from('tickets')
        .select('id')
        .eq('customer_email', customerEmail)
        .eq('event_id', eventId)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (!ticketData || ticketData.length === 0) {
        throw new Error('Ticket not found');
      }
      
      const ticketId = ticketData[0].id;
      
      const pdfBlob = await generateTicketPDF({
        eventName,
        eventDate,
        eventLocation,
        ticketType: tickets[0].name,
        attendeeName: customerName,
        attendeeEmail: customerEmail,
        ticketId,
        organizerLogo: logoUrl || undefined,
        primaryColor
      });
      
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          const base64data = reader.result.split(',')[1];
          
          const { error } = await supabase.functions.invoke('send-ticket-email', {
            body: {
              ticketId,
              recipientEmail: customerEmail,
              recipientName: customerName,
              eventName,
              eventDate,
              eventLocation,
              ticketType: tickets[0].name,
              pdfBase64: base64data
            }
          });
          
          if (error) {
            console.error('Error sending ticket email:', error);
            toast({
              title: "Ticket delivery issue",
              description: "There was a problem sending your tickets by email. You can still download them now.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Tickets sent!",
              description: `Your tickets have been sent to ${customerEmail}`,
            });
          }
        }
      };
      
      const url = URL.createObjectURL(pdfBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${eventName.replace(/\s+/g, '-')}-ticket.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating ticket:', error);
      toast({
        title: "Ticket generation failed",
        description: "Please contact support for assistance.",
        variant: "destructive"
      });
    }
  };

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join me at ${eventName}!`,
        text: `I just got tickets to ${eventName}. You should come too! Use my referral link for $5 off.`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(`Join me at ${eventName}! ${window.location.href}`);
      toast({
        title: "Link copied to clipboard!",
        description: "Share with friends to earn referral credit.",
      });
    }
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    console.log("Sales feedback submitted:", { eventId, rating, comment });
    setShowFeedback(false);
  };
  
  if (isComplete) {
    return (
      <div className="text-center py-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="mb-2">Your tickets have been confirmed for {eventName}</p>
        <p className="text-sm text-muted-foreground mb-6">
          A confirmation has been sent to {customerEmail}
        </p>
        
        {isGeneratingTicket ? (
          <div className="flex items-center justify-center gap-2 mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Generating your tickets...</span>
          </div>
        ) : showFeedback ? (
          <div className="max-w-md mx-auto mb-6">
            <OrganizerFeedback 
              onSubmit={handleFeedbackSubmit}
              context="sales"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center max-w-xs mx-auto">
            <Button 
              className="w-full" 
              onClick={generateAndSendTickets}
              style={{ backgroundColor: primaryColor }}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Download Tickets Again
            </Button>
            
            <Button 
              className="w-full" 
              variant="outline"
              onClick={handleShareEvent}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share with Friends
            </Button>
            
            <Button
              className="w-full mt-2"
              variant="outline"
              onClick={() => setShowFeedback(true)}
            >
              Rate Your Experience
            </Button>
            
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Refer 3 friends who buy tickets and get $5 credit toward your next event!
            </p>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-300 focus:border-purple-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-300 focus:border-purple-600 focus:outline-none"
              required
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Payment Details</label>
          <div className="border rounded-md p-3">
            <PaymentElement />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            id="saveInfo"
            checked={saveInfo}
            onChange={() => setSaveInfo(!saveInfo)}
            className="rounded text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="saveInfo" className="text-sm">Save my information for next time</label>
        </div>
      </div>
      
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full"
        style={{ backgroundColor: primaryColor }}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>Complete Purchase</>
        )}
      </Button>
    </form>
  );
};

const TicketCheckout: React.FC<CheckoutProps> = (props) => {
  const { onClose } = props;
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClientSecret('pi_1234567890_secret_0987654321');
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast({
          variant: "destructive",
          title: "Error setting up payment",
          description: "Please try again or contact support.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    createPaymentIntent();
  }, [toast]);
  
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: props.primaryColor,
    },
  };
  
  const options = {
    clientSecret,
    appearance,
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Checkout</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium">{props.eventName}</h3>
            <div className="text-sm text-muted-foreground">
              {format(props.eventDate, 'EEEE, MMMM d, yyyy')} • {props.eventLocation}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Your Tickets</h4>
            {props.tickets.map((ticket, index) => (
              <div key={index} className="flex justify-between text-sm mb-1">
                <span>{ticket.quantity} × {ticket.name}</span>
                <span>${(ticket.price * ticket.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            </div>
          ) : clientSecret ? (
            <Elements stripe={stripePromise} options={options as any}>
              <CheckoutForm {...props} />
            </Elements>
          ) : (
            <div className="text-center py-6">
              <p className="text-red-500">Unable to initialize payment. Please try again.</p>
              <Button onClick={onClose} variant="outline" className="mt-4">
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TicketCheckout;
