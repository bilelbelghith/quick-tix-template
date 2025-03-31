
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ShareButtons from '@/components/ShareButtons';
import TicketTierTable, { TicketTier } from '@/components/TicketTierTable';
import { useToast } from '@/hooks/use-toast';

// Mock data - would be fetched from Supabase in a real implementation
const mockEvent = {
  id: 'evt-123',
  name: 'Summer Music Festival',
  date: new Date('2023-08-15T18:00:00'),
  location: 'Central Park, New York',
  coverImage: '/placeholder.svg',
  logoImage: '',
  primaryColor: '#6D28D9', // purple-600
  organizer: 'AcmeEvents',
  slug: 'summer-music-festival',
};

const mockTicketTiers: TicketTier[] = [
  { 
    id: 'tier-1', 
    name: 'General Admission', 
    price: 25, 
    description: 'Standard entry to event', 
    quantity: 100,
    available: 68
  },
  { 
    id: 'tier-2', 
    name: 'VIP', 
    price: 50, 
    description: 'Premium seating and complimentary drink', 
    quantity: 50,
    available: 32
  }
];

const EventPage: React.FC = () => {
  const { username, eventSlug } = useParams<{ username: string; eventSlug: string }>();
  const [event, setEvent] = useState(mockEvent);
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>(mockTicketTiers);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // This would fetch real event data from Supabase
  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real implementation, we'd fetch data from Supabase
        // const { data, error } = await supabase
        //   .from('events')
        //   .select('*, ticket_tiers(*)')
        //   .eq('slug', eventSlug)
        //   .eq('organizer_username', username)
        //   .single();
        
        // if (error) throw error;
        // setEvent(data);
        // setTicketTiers(data.ticket_tiers);
        
      } catch (error) {
        console.error('Error fetching event:', error);
        toast({
          variant: "destructive",
          title: "Error loading event",
          description: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEventData();
  }, [username, eventSlug, toast]);

  const handleCheckout = async (selections: { tierId: string; quantity: number }[]) => {
    try {
      console.log('Processing checkout for:', selections);
      
      // This would initiate a Stripe checkout session
      // In a real implementation:
      // const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      //   body: { eventId: event.id, tickets: selections }
      // });
      // 
      // if (error) throw error;
      // window.location.href = data.url;
      
      toast({
        title: "Checkout initiated",
        description: "You would now be redirected to Stripe checkout",
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: "There was an error processing your request.",
      });
    }
  };

  const currentUrl = window.location.href;
  const formattedDate = format(event.date, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(event.date, 'h:mm a');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="w-full h-64 bg-muted relative"
        style={{
          backgroundColor: event.primaryColor,
        }}
      >
        {event.coverImage && (
          <img 
            src={event.coverImage} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Logo */}
        <div className="absolute -bottom-10 left-8">
          <Avatar className="h-20 w-20 border-4 border-background">
            {event.logoImage ? (
              <AvatarImage src={event.logoImage} alt="Event logo" />
            ) : (
              <AvatarFallback
                style={{ backgroundColor: event.primaryColor }}
                className="text-white text-xl"
              >
                {event.name.substring(0, 2)}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4">
        {/* Event Details */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              {event.name}
            </motion.h1>
            
            <ShareButtons 
              url={currentUrl} 
              title={`Check out ${event.name}`} 
            />
          </div>
          
          <div className="flex flex-col gap-2 my-6 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formattedDate} at {formattedTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm opacity-70">Organized by {username}</span>
            </div>
          </div>
        </div>
        
        {/* Tickets Section */}
        <section className="my-12">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Ticket className="mr-2 h-5 w-5" />
            Tickets
          </h2>
          
          <TicketTierTable 
            ticketTiers={ticketTiers}
            onCheckout={handleCheckout}
            primaryColor={event.primaryColor}
          />
        </section>
        
        {/* Event Description Section */}
        <section className="my-12 pb-12">
          <h2 className="text-xl font-bold mb-4">About This Event</h2>
          <div className="prose max-w-none">
            <p className="text-muted-foreground">
              Join us for an amazing event! More details about the event would appear here.
              In a real implementation, this would be fetched from the database.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventPage;
