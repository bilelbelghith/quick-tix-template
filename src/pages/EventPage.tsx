
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ShareButtons from '@/components/ShareButtons';
import TicketTierTable, { TicketTier } from '@/components/TicketTierTable';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  cover_image_url: string | null;
  logo_url: string | null;
  primary_color: string;
  organizer_id: string;
  slug: string;
}

const EventPage: React.FC = () => {
  const { username, eventSlug } = useParams<{ username: string; eventSlug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch event data from Supabase
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // First, find the organizer's ID from their username
        const { data: organizerData, error: organizerError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', username)
          .single();

        if (organizerError) throw organizerError;
        
        const organizerId = organizerData?.id;
        
        // Fetch the event using organizer ID and event slug
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('slug', eventSlug)
          .eq('organizer_id', organizerId)
          .single();

        if (eventError) throw eventError;
        
        setEvent(eventData);
        
        // Fetch ticket tiers for this event
        const { data: tierData, error: tierError } = await supabase
          .from('ticket_tiers')
          .select('*')
          .eq('event_id', eventData.id);
          
        if (tierError) throw tierError;
        
        // Convert to TicketTier format
        const formattedTiers: TicketTier[] = tierData.map(tier => ({
          id: tier.id,
          name: tier.name,
          price: tier.price,
          description: tier.description || '',
          quantity: tier.quantity,
          available: tier.available
        }));
        
        setTicketTiers(formattedTiers);
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
    
    if (username && eventSlug) {
      fetchEventData();
    }
  }, [username, eventSlug, toast]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4">Loading event...</p>
        </div>
      </div>
    );
  }

  // Show 404 if event not found
  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Event Not Found</h1>
          <p className="mt-4">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;
  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy');
  const formattedTime = format(new Date(event.date), 'h:mm a');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="w-full h-64 bg-muted relative"
        style={{
          backgroundColor: event.primary_color,
        }}
      >
        {event.cover_image_url && (
          <img 
            src={event.cover_image_url} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Logo */}
        <div className="absolute -bottom-10 left-8">
          <Avatar className="h-20 w-20 border-4 border-background">
            {event.logo_url ? (
              <AvatarImage src={event.logo_url} alt="Event logo" />
            ) : (
              <AvatarFallback
                style={{ backgroundColor: event.primary_color }}
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
            primaryColor={event.primary_color}
            eventId={event.id}
            eventName={event.name}
            eventDate={new Date(event.date)}
            eventLocation={event.location}
            logoUrl={event.logo_url}
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
