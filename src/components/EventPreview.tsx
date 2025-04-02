
import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Ticket, Music, Users, Award, Clock, GraduationCap, Layers, Trophy, Flag, User, Dumbbell } from 'lucide-react';
import { EventFormValues } from '@/lib/schemas/event-schema';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface EventPreviewProps {
  event: Partial<EventFormValues>;
  templateId: string;
}

const EventPreview: React.FC<EventPreviewProps> = ({ event, templateId }) => {
  const formattedDate = event.date ? format(new Date(event.date), 'EEEE, MMMM d, yyyy') : '';
  
  // Template-specific icon and color scheme
  const getTemplateIcon = () => {
    switch (templateId) {
      case 'concert':
        return <Music className="h-5 w-5" />;
      case 'workshop':
        return <GraduationCap className="h-5 w-5" />;
      case 'sports':
        return <Trophy className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Cover Image with template-specific styling */}
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
            {templateId === 'concert' && 'Concert Cover Image'}
            {templateId === 'workshop' && 'Workshop Cover Image'}
            {templateId === 'sports' && 'Sports Event Cover Image'}
          </div>
        )}
        
        {/* Badge showing template type */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-background/80 text-foreground backdrop-blur-sm">
            {getTemplateIcon()}
            <span className="ml-1 capitalize">{templateId}</span>
          </Badge>
        </div>
        
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
            {event.time && (
              <>
                <Clock className="ml-4 mr-2 h-4 w-4" />
                <span>{event.time}</span>
              </>
            )}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{event.location || 'Event Location'}</span>
          </div>
        </div>
        
        {/* Template-specific section */}
        {templateId === 'concert' && (
          <div className="mb-8 bg-muted/20 rounded-lg p-4 border">
            <h2 className="font-semibold flex items-center mb-4">
              <Music className="mr-2 h-5 w-5" />
              Concert Details
            </h2>
            <div className="space-y-2">
              {(event as any).artistName && (
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Artist:</span>
                  <span>{(event as any).artistName}</span>
                </div>
              )}
              {(event as any).genre && (
                <div className="flex items-center">
                  <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Genre:</span>
                  <span>{(event as any).genre}</span>
                </div>
              )}
              {(event as any).openingAct && (
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Opening Act:</span>
                  <span>{(event as any).openingAct}</span>
                </div>
              )}
              {(event as any).duration && (
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Duration:</span>
                  <span>{(event as any).duration}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {templateId === 'workshop' && (
          <div className="mb-8 bg-muted/20 rounded-lg p-4 border">
            <h2 className="font-semibold flex items-center mb-4">
              <GraduationCap className="mr-2 h-5 w-5" />
              Workshop Details
            </h2>
            <div className="space-y-2">
              {(event as any).instructorName && (
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Instructor:</span>
                  <span>{(event as any).instructorName}</span>
                </div>
              )}
              {(event as any).skillLevel && (
                <div className="flex items-center">
                  <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Skill Level:</span>
                  <span>{(event as any).skillLevel}</span>
                </div>
              )}
              {(event as any).prerequisites && (
                <div className="flex items-center">
                  <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Prerequisites:</span>
                  <span>{(event as any).prerequisites}</span>
                </div>
              )}
              {(event as any).materials && (
                <div className="flex items-center">
                  <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Materials:</span>
                  <span>{(event as any).materials}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {templateId === 'sports' && (
          <div className="mb-8 bg-muted/20 rounded-lg p-4 border">
            <h2 className="font-semibold flex items-center mb-4">
              <Trophy className="mr-2 h-5 w-5" />
              Event Details
            </h2>
            <div className="space-y-2">
              {(event as any).teamNames && (
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Teams:</span>
                  <span>{(event as any).teamNames}</span>
                </div>
              )}
              {(event as any).sportType && (
                <div className="flex items-center">
                  <Dumbbell className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Sport:</span>
                  <span>{(event as any).sportType}</span>
                </div>
              )}
              {(event as any).competitionLevel && (
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Level:</span>
                  <span>{(event as any).competitionLevel}</span>
                </div>
              )}
              {(event as any).rules && (
                <div className="flex items-center">
                  <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium mr-2">Rules:</span>
                  <span>{(event as any).rules}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
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
      </div>
    </div>
  );
};

export default EventPreview;
