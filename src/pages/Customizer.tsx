import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImageUploader from '@/components/ImageUploader';
import { eventSchema, EventFormValues, defaultEventValues, colorOptions } from '@/lib/schemas/event-schema';
import { useToast } from '@/hooks/use-toast';
import EventPreview from '@/components/EventPreview';
import ColorSelector from '@/components/ColorSelector';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { supabase, generateUniqueSlug } from '@/lib/supabase';

const Customizer = () => {
  const { templateId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
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
      
      navigate(`/${userData.user.email?.split('@')[0] || organizerId}/${slug}`);
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
            <Button 
              onClick={form.handleSubmit(onSubmit)} 
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? 'Saving...' : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Event
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-[40%] border-r p-6 overflow-auto">
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Event" {...field} />
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="123 Event St" {...field} />
                          <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Ticket Tiers</h3>
                <Accordion type="single" collapsible className="w-full">
                  {form.watch('ticketTiers')?.map((tier, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-sm">
                        {tier.name} - ${tier.price}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{tier.description}</p>
                        <p className="text-sm mt-1">Quantity: {tier.quantity}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
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
