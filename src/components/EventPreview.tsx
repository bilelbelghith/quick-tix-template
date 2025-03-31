
import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { EventFormValues } from '@/lib/schemas/event-schema';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface EventPreviewProps {
  event: Partial<EventFormValues>;
  templateId: string;
}

const EventPreview: React.FC<EventPreviewProps> = ({ event, templateId }) => {
  const formattedDate = event.date ? format(new Date(event.date), 'EEEE, MMMM d, yyyy') : '';
  
  return (
    <div className="h-full flex flex-col">
      {/* Cover Image */}
      <div 
        className="w-full h-64 bg-muted relative"
        style={{
          backgroundColor: event.primaryColor || '#6D28D9',
        }}
      >
        {event.coverImage ? (
          <img 
            src={event.coverImage} 
            alt="Event cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-opacity-30 text-xl font-semibold">
            Cover Image
          </div>
        )}
        
        {/* Logo */}
        <div className="absolute -bottom-10 left-8">
          <Avatar className="h-20 w-20 border-4 border-background">
            {event.logoImage ? (
              <AvatarImage src={event.logoImage} alt="Event logo" />
            ) : (
              <AvatarFallback
                style={{ backgroundColor: event.primaryColor || '#6D28D9' }}
                className="text-white text-xl"
              >
                {event.name?.substring(0, 2) || 'E'}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-8 pt-16">
        <h1 className="text-3xl font-bold mb-2">{event.name || 'Event Name'}</h1>
        
        <div className="flex flex-col gap-2 mb-8 text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formattedDate || 'Event Date'}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{event.location || 'Event Location'}</span>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Ticket Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Ticket className="mr-2 h-5 w-5" />
            Tickets
          </h2>
          
          <div className="space-y-4">
            {event.ticketTiers?.map((tier, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{tier.name}</h3>
                  <span className="font-bold text-lg">${tier.price}</span>
                </div>
                {tier.description && (
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {tier.quantity} available
                  </span>
                  <Button 
                    size="sm"
                    style={{ backgroundColor: event.primaryColor }}
                  >
                    Buy Ticket
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional content based on template */}
        {templateId === 'concert' && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h2 className="font-semibold">About the Artist</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Artist information will appear here in the final event page.
            </p>
          </div>
        )}
        
        {templateId === 'workshop' && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h2 className="font-semibold">Workshop Schedule</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Workshop schedule will appear here in the final event page.
            </p>
          </div>
        )}
        
        {templateId === 'sports' && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h2 className="font-semibold">Team Information</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Team and competition details will appear here in the final event page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPreview;
