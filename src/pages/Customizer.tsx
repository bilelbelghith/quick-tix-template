
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, MapPin, Save, Clock, Users, 
  Mail, Edit, Music, Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import ImageUploader from '@/components/ImageUploader';
import { eventSchema, EventFormValues, defaultEventValues, colorOptions } from '@/lib/schemas/event-schema';
import { useToast } from '@/hooks/use-toast';
import EventPreview from '@/components/EventPreview';
import ColorSelector from '@/components/ColorSelector';
import TicketTierEditor from '@/components/TicketTierEditor';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase, generateUniqueSlug } from '@/lib/supabase';

const Customizer = () => {
  const { templateId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultEventValues,
  });

  const uploadImage = async (file: string, path: string): Promise<string | null> => {
    if (!file || !file.startsWith('blob:')) return null;
    
    try {
      const response = await fetch(file);
      const blob = await response.blob();
      
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      const filePath = `${path}/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('organizer_uploads')
        .upload(filePath, blob);
      
      if (error) throw error;
      
      const { data: publicUrlData } = supabase.storage
        .from('organizer_uploads')
        .getPublicUrl(data.path);
      
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    }
  };

  const onSubmit = async (data: EventFormValues) => {
    setIsLoading(true);
    
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      const organizerId = userData.user?.id;
      if (!organizerId) throw new Error('You must be logged in to create an event');
      
      const slug = await generateUniqueSlug(data.name);
      
      let coverImageUrl = null;
      let logoUrl = null;
      
      if (data.coverImage) {
        coverImageUrl = await uploadImage(data.coverImage, `events/${organizerId}/covers`);
      }
      
      if (data.logoImage) {
        logoUrl = await uploadImage(data.logoImage, `events/${organizerId}/logos`);
      }
      
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .insert({
          organizer_id: organizerId,
          name: data.name,
          slug: slug,
          date: data.date.toISOString(),
          location: data.location,
          cover_image_url: coverImageUrl,
          logo_url: logoUrl,
          primary_color: data.primaryColor,
          template_id: templateId || 'concert',
          description: data.description,
          organizer_name: data.organizerName,
          contact_email: data.contactEmail,
          capacity: data.capacity,
          is_online: data.isOnline,
          event_time: data.time
        })
        .select()
        .single();
      
      if (eventError) throw eventError;
      
      if (data.ticketTiers && data.ticketTiers.length > 0) {
        const ticketTiersData = data.ticketTiers.map(tier => ({
          event_id: eventData.id,
          name: tier.name,
          price: tier.price,
          description: tier.description,
          quantity: tier.quantity,
          available: tier.quantity
        }));
        
        const { error: tiersError } = await supabase
          .from('ticket_tiers')
          .insert(ticketTiersData);
        
        if (tiersError) throw tiersError;
      }
      
      toast({
        title: "Event saved!",
        description: "Your event has been created successfully.",
      });
      
      navigate(`/events/${eventData.id}/publish`);
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "There was a problem saving your event.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formValues = form.watch();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link to="/onboarding" className="mr-4 flex items-center">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold">Customize Your {templateId?.charAt(0).toUpperCase() + templateId?.slice(1)} Template</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={form.handleSubmit(onSubmit)} 
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Saving...' : 'Save & Publish'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-[40%] border-r p-6 overflow-auto">
          <Form {...form}>
            <form className="space-y-6">
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="mb-6"
              >
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="details">Basic Info</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="My Awesome Event" {...field} />
                            <Edit className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="date"
                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                onChange={(e) => {
                                  const date = e.target.value ? new Date(e.target.value) : new Date();
                                  field.onChange(date);
                                }}
                              />
                              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Time</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="time"
                                {...field}
                              />
                              <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="isOnline"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Online Event</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Is this a virtual/online event?
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{formValues.isOnline ? "Online Event URL" : "Event Location"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder={formValues.isOnline ? "https://zoom.us/j/123456789" : "123 Event St"} 
                              {...field} 
                            />
                            {formValues.isOnline ? 
                              <LinkIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" /> :
                              <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            }
                          </div>
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
                        <FormLabel>Event Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell attendees about your event..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="organizerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organizer Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Event Organizer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type="email" 
                                placeholder="contact@example.com" 
                                {...field} 
                              />
                              <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Capacity</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              min="1"
                              placeholder="100"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                            <Users className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="appearance" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Color</FormLabel>
                        <FormControl>
                          <ColorSelector 
                            value={field.value}
                            onChange={field.onChange}
                            options={colorOptions}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                            onClear={() => field.onChange("")}
                            aspectRatio="16/9"
                            label="Cover Image (16:9)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                            onClear={() => field.onChange("")}
                            aspectRatio="1/1"
                            label="Logo Image (1:1)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="tickets" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="ticketTiers"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TicketTierEditor 
                            ticketTiers={field.value} 
                            onChange={field.onChange} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>

        <div className="w-full lg:w-[60%] bg-muted/30 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-background rounded-lg shadow-md overflow-hidden h-full"
          >
            <EventPreview event={formValues} templateId={templateId || "concert"} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
