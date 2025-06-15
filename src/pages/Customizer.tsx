import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import ColorSelector from '@/components/ColorSelector';
import EventPreviewFrame from '@/components/EventPreviewFrame';
import TicketTierEditor from '@/components/TicketTierEditor';
import type { TicketTier } from '@/types/ticketTier';

const formSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  event_time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  organizer_name: z.string().min(1, 'Organizer name is required'),
  template_id: z.enum(['concert', 'workshop', 'sports']),
  primary_color: z.string().min(1, 'Primary color is required'),
});

interface EventFormData {
  name: string;
  description: string;
  date: string;
  event_time: string;
  location: string;
  organizer_name: string;
  template_id: 'concert' | 'workshop' | 'sports';
  primary_color: string;
}

const Customizer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState<any>(null);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([]);

  const form = useForm<EventFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      date: '',
      event_time: '',
      location: '',
      organizer_name: '',
      template_id: 'concert',
      primary_color: '#2563eb',
    },
  });

  useEffect(() => {
    if (id) {
      fetchEventData();
    }
  }, [id]);

  const fetchEventData = async () => {
    if (!id) return;
    
    try {
      const { data: event, error } = await supabase
        .from('events')
        .select('*, ticket_tiers(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (event) {
        setEventData(event);
        form.reset({
          name: event.name || '',
          description: event.description || '',
          date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
          event_time: event.event_time || '',
          location: event.location || '',
          organizer_name: event.organizer_name || '',
          template_id: (event.template_id as 'concert' | 'workshop' | 'sports') || 'concert',
          primary_color: event.primary_color || '#2563eb',
        });
        
        setLogoUrl(event.logo_url || '');
        setCoverImageUrl(event.cover_image_url || '');
        
        const ticketTiersData: TicketTier[] = (event.ticket_tiers || []).map((tier: any) => ({
          id: tier.id || '',
          name: tier.name || '',
          price: typeof tier.price === 'number' ? tier.price : 0,
          description: tier.description || '',
          quantity: typeof tier.quantity === 'number' ? tier.quantity : 0,
          available: typeof tier.available === 'number' ? tier.available : (typeof tier.quantity === 'number' ? tier.quantity : 0)
        }));
        
        setTicketTiers(ticketTiersData);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      toast({
        title: 'Error',
        description: 'Failed to load event data',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: EventFormData) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to save events',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const eventPayload = {
        ...data,
        organizer_id: user.id,
        logo_url: logoUrl,
        cover_image_url: coverImageUrl,
        updated_at: new Date().toISOString(),
        slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      };

      let eventId = id;
      
      if (id) {
        const { error: updateError } = await supabase
          .from('events')
          .update(eventPayload)
          .eq('id', id);
        
        if (updateError) throw updateError;
      } else {
        const { data: newEvent, error: insertError } = await supabase
          .from('events')
          .insert([eventPayload])
          .select()
          .single();
        
        if (insertError) throw insertError;
        eventId = newEvent.id;
      }

      if (eventId && ticketTiers.length > 0) {
        const { error: deleteError } = await supabase
          .from('ticket_tiers')
          .delete()
          .eq('event_id', eventId);
        
        if (deleteError) throw deleteError;

        const tierInserts = ticketTiers.map(tier => ({
          event_id: eventId,
          name: tier.name,
          price: tier.price,
          description: tier.description,
          quantity: tier.quantity,
          available: tier.available,
        }));

        const { error: tiersError } = await supabase
          .from('ticket_tiers')
          .insert(tierInserts);
        
        if (tiersError) throw tiersError;
      }

      toast({
        title: 'Success',
        description: 'Event saved successfully!',
      });
      
      if (!id && eventId) {
        navigate(`/customizer/${eventId}`);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: 'Error',
        description: 'Failed to save event',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = () => {
    if (eventData?.id) {
      navigate(`/publish/${eventData.id}`);
    } else {
      toast({
        title: 'Error',
        description: 'Please save your event first before publishing',
        variant: 'destructive',
      });
    }
  };

  const handleAddTier = () => {
    const newTier: TicketTier = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      description: '',
      quantity: 0,
      available: 0
    };
    setTicketTiers([...ticketTiers, newTier]);
  };

  const handleUpdateTier = (index: number, updatedTier: TicketTier) => {
    const newTiers = [...ticketTiers];
    newTiers[index] = updatedTier;
    setTicketTiers(newTiers);
  };

  const handleRemoveTier = (index: number) => {
    const newTiers = ticketTiers.filter((_, i) => i !== index);
    setTicketTiers(newTiers);
  };

  const previewData = {
    ...form.getValues(),
    logo_url: logoUrl,
    cover_image_url: coverImageUrl,
    id: eventData?.id || 'preview',
    time: form.getValues().event_time,
    template_type: form.getValues().template_id,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Event Customizer</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={handlePublish}
                disabled={!eventData?.id}
                className="bg-green-600 hover:bg-green-700"
              >
                Publish Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter event name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your event" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="event_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Event venue" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organizer_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organizer Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name or organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Branding</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <ImageUploader
                        value={logoUrl}
                        onChange={setLogoUrl}
                        onClear={() => setLogoUrl('')}
                        aspectRatio="1/1"
                        label="Logo"
                      />
                    </div>

                    <div>
                      <ImageUploader
                        value={coverImageUrl}
                        onChange={setCoverImageUrl}
                        onClear={() => setCoverImageUrl('')}
                        aspectRatio="16/9"
                        label="Cover Image"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="primary_color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color</FormLabel>
                          <FormControl>
                            <ColorSelector
                              value={field.value}
                              onChange={field.onChange}
                              options={[
                                { value: '#2563eb', label: 'Blue' },
                                { value: '#7c3aed', label: 'Purple' },
                                { value: '#059669', label: 'Green' },
                                { value: '#dc2626', label: 'Red' },
                                { value: '#ea580c', label: 'Orange' },
                                { value: '#0891b2', label: 'Cyan' }
                              ]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Tiers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TicketTierEditor
                      ticketTiers={ticketTiers}
                      onAddTier={handleAddTier}
                      onUpdateTier={handleUpdateTier}
                      onRemoveTier={handleRemoveTier}
                    />
                  </CardContent>
                </Card>

                <Button type="submit" disabled={isLoading} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Event'}
                </Button>
              </form>
            </Form>
          </div>

          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <EventPreviewFrame event={previewData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
