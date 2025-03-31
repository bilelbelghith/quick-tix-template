
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const Customizer = () => {
  const { templateId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultEventValues,
  });

  const onSubmit = async (data: EventFormValues) => {
    setIsLoading(true);
    
    // Here we would send data to Supabase
    try {
      console.log('Event data to save:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Event saved!",
        description: "Your event has been created successfully.",
      });

      // Here we would redirect to the event page
      // navigate(`/username/${slug}`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem saving your event.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Watch form values for live preview
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
              <Save className="mr-2 h-4 w-4" />
              Save Event
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Sidebar - Form */}
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

        {/* Right Preview Pane */}
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
