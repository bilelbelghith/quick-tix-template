import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle, Calendar, MapPin, Ticket, Image, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PublishSteps from '@/components/PublishSteps';
import EventPreviewFrame from '@/components/EventPreviewFrame';
import ShareOptions from '@/components/ShareOptions';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface EventData {
  id: string;
  name: string;
  date: string;
  location: string;
  cover_image_url: string | null;
  logo_url: string | null;
  primary_color: string;
  slug: string;
  template_id: string;
  published: boolean;
}

interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity: number;
  available: number;
  description?: string;
}

interface ValidationResult {
  valid: boolean;
  message: string;
}

const PublishEvent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<EventData | null>(null);
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [validations, setValidations] = useState<Record<string, ValidationResult>>({
    eventName: { valid: false, message: 'Event name is required' },
    eventDate: { valid: false, message: 'Event date is required' },
    eventLocation: { valid: false, message: 'Event location is required' },
    coverImage: { valid: false, message: 'Cover image is required' },
    ticketTiers: { valid: false, message: 'At least one ticket tier is required' }
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    fetchEventData();
  }, [id]);

  const fetchEventData = async () => {
    try {
      setIsLoading(true);
      
      if (!id) {
        throw new Error('Event ID is required');
      }
      
      // Fetch event data
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      
      if (eventError) throw eventError;
      
      setEvent(eventData);
      
      // Fetch ticket tiers
      const { data: tiersData, error: tiersError } = await supabase
        .from('ticket_tiers')
        .select('*')
        .eq('event_id', id);
      
      if (tiersError) throw tiersError;
      
      setTicketTiers(tiersData || []);
      
      // Run validations
      validateEvent(eventData, tiersData || []);
    } catch (error) {
      console.error('Error fetching event data:', error);
      toast({
        variant: "destructive",
        title: "Error loading event",
        description: "There was a problem loading your event data. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateEvent = (eventData: EventData, tiers: TicketTier[]) => {
    const newValidations = {
      eventName: { 
        valid: !!eventData.name, 
        message: eventData.name ? 'Event name is set' : 'Event name is required' 
      },
      eventDate: { 
        valid: !!eventData.date, 
        message: eventData.date ? 'Event date is set' : 'Event date is required' 
      },
      eventLocation: { 
        valid: !!eventData.location, 
        message: eventData.location ? 'Event location is set' : 'Event location is required' 
      },
      coverImage: { 
        valid: !!eventData.cover_image_url, 
        message: eventData.cover_image_url ? 'Cover image is set' : 'Cover image is required' 
      },
      ticketTiers: { 
        valid: tiers.length > 0, 
        message: tiers.length > 0 ? `${tiers.length} ticket types set` : 'At least one ticket tier is required' 
      }
    };
    
    setValidations(newValidations);
  };
  
  const isReadyToPublish = () => {
    return Object.values(validations).every(validation => validation.valid);
  };
  
  const handlePublish = async () => {
    try {
      if (!isReadyToPublish() || !event) return;
      
      setIsPublishing(true);
      
      // Generate user-friendly URL slug if necessary
      let eventSlug = event.slug;
      
      // Update the event as published
      const { data: updatedEvent, error: updateError } = await supabase
        .from('events')
        .update({ 
          published: true,
          published_at: new Date().toISOString()
        })
        .eq('id', event.id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      
      // Get the user's profile for the URL
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("User not authenticated");
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userData.user.id)
        .single();
        
      let username;
      if (profileError || !profileData) {
        console.error("Couldn't fetch profile, using fallback username", profileError);
        username = userData.user.email?.split('@')[0] || userData.user.id;
      } else {
        username = profileData.username;
      }
      
      // Construct the shareable URL
      const shareableUrl = `${window.location.origin}/${username}/${eventSlug}`;
      
      setPublishedUrl(shareableUrl);
      setShowShareOptions(true);
      setCurrentStep(3);
      
      toast({
        title: "Event published successfully!",
        description: "Your event is now live and ready for ticket sales.",
      });
      
    } catch (error) {
      console.error('Error publishing event:', error);
      toast({
        variant: "destructive",
        title: "Publishing failed",
        description: "There was a problem publishing your event. Please try again.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/${event?.template_id}/customize?id=${id}`);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Button variant="ghost" size="icon" className="mr-4 rounded-full" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold">Publish Your Event</h1>
          </div>
        </div>
      </header>

      <div className="container max-w-screen-xl mx-auto py-8 px-4">
        <PublishSteps currentStep={currentStep} />
        
        <div className="mt-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Finalize Event Details</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Event Details Checklist</h3>
                      <div className="space-y-4">
                        {Object.entries(validations).map(([key, validation]) => (
                          <div key={key} className="flex items-center gap-3">
                            <div className={`rounded-full p-1 ${validation.valid ? 'bg-green-100' : 'bg-amber-100'}`}>
                              {validation.valid ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-amber-600" />
                              )}
                            </div>
                            <div>
                              <p className={validation.valid ? 'text-green-700' : 'text-amber-700'}>
                                {validation.message}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Event Summary</h3>
                      
                      {event && (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Event Name</p>
                            <p className="font-medium">{event.name}</p>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                            <p className="font-medium flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
                            </p>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Location</p>
                            <p className="font-medium flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              {event.location}
                            </p>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Ticket Types</p>
                            {ticketTiers.map((tier) => (
                              <div key={tier.id} className="flex items-center justify-between py-1">
                                <div className="flex items-center">
                                  <Ticket className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{tier.name}</span>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">${tier.price}</p>
                                  <p className="text-xs text-muted-foreground">{tier.quantity} available</p>
                                </div>
                              </div>
                            ))}
                            
                            {ticketTiers.length === 0 && (
                              <p className="text-amber-600">No ticket types defined yet</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Preview</h3>
                  <EventPreviewFrame event={event} />
                </div>
              </div>
              
              <div className="mt-8 flex gap-4 justify-end">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/${event?.template_id}/customize?id=${id}`)}
                >
                  Edit Event
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Continue to Publishing
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Ready to Go Live</h2>
              
              <div className="max-w-2xl mx-auto">
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="text-center mb-8">
                      <div className="rounded-full bg-muted h-24 w-24 mx-auto flex items-center justify-center mb-4">
                        <Image className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold">{event?.name}</h3>
                      <p className="text-muted-foreground">
                        {new Date(event?.date || '').toLocaleDateString()} • {event?.location}
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">What happens after publishing?</h3>
                        <ul className="space-y-3">
                          <li className="flex gap-3">
                            <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <span>Your event page will be live and accessible to the public</span>
                          </li>
                          <li className="flex gap-3">
                            <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <span>Ticket sales will be enabled immediately</span>
                          </li>
                          <li className="flex gap-3">
                            <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <span>You'll get a shareable link to promote your event</span>
                          </li>
                          <li className="flex gap-3">
                            <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <span>All sales will be tracked in your dashboard</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex gap-4 justify-center pt-4">
                        <Button
                          variant="outline"
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handlePublish}
                          disabled={!isReadyToPublish() || isPublishing}
                          className="px-8 bg-purple-600 hover:bg-purple-700"
                        >
                          {isPublishing ? 'Publishing...' : 'Publish Event Now'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Event is Live!</h2>
              
              <div className="max-w-2xl mx-auto">
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="text-center mb-8">
                      <div className="rounded-full bg-green-100 h-24 w-24 mx-auto flex items-center justify-center mb-4">
                        <Check className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold">{event?.name} is now published!</h3>
                      <p className="text-muted-foreground mb-4">
                        Your event is live and tickets are available for purchase
                      </p>
                      
                      <div className="bg-muted p-3 rounded-md flex items-center gap-2 max-w-md mx-auto">
                        <input
                          type="text"
                          readOnly
                          value={publishedUrl}
                          className="bg-transparent flex-1 text-sm border-none focus:outline-none"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(publishedUrl);
                            toast({
                              description: "Link copied to clipboard!",
                            });
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <ShareOptions url={publishedUrl} title={event?.name || 'My Event'} />
                    
                    <div className="mt-8 flex gap-4 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => window.open(publishedUrl, '_blank')}
                      >
                        View Event Page
                      </Button>
                      <Button 
                        onClick={() => navigate('/dashboard')}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Go to Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishEvent;
