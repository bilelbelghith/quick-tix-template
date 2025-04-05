
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Globe, Lock, ChevronRight, ChevronDown, ChevronUp, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/ImageUploader';
import ColorSelector from '@/components/ColorSelector';
import EventPreviewFrame from '@/components/EventPreviewFrame';
import OrganizerFeedback from '@/components/OrganizerFeedback';
import { TicketTier } from '@/types/ticketTier';

interface LiveBrandingSectionProps {
  onGetStarted?: () => void;
}

const colorOptions = [
  { value: '#6D28D9', label: 'Purple' },
  { value: '#2563EB', label: 'Blue' },
  { value: '#DC2626', label: 'Red' },
  { value: '#059669', label: 'Green' },
  { value: '#D97706', label: 'Orange' },
  { value: '#4B5563', label: 'Gray' },
];

const testimonials = [
  { 
    text: "After switching to Tixify, I sold out my events 3x faster. The simple setup made all the difference!", 
    author: "Sarah Johnson",
    role: "Concert Organizer"
  },
  { 
    text: "Tixify's branded checkout increased our conversions by 45%. Our attendees love the seamless experience.", 
    author: "Mike Chen",
    role: "Conference Director"
  },
  { 
    text: "No more tech headaches! Created and published my first event in under 10 minutes.", 
    author: "Alexis Rodriguez",
    role: "Workshop Host"
  }
];

const LiveBrandingSection: React.FC<LiveBrandingSectionProps> = ({ onGetStarted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { toast } = useToast();
  const [event, setEvent] = useState({
    name: 'Your Amazing Event',
    date: new Date().toISOString(),
    time: '7:00 PM',
    location: 'San Francisco, CA',
    cover_image_url: '',
    logo_url: '',
    primary_color: '#2563EB',
    ticket_tiers: [] as TicketTier[],
    domain_type: 'free'
  });

  const handleDemoRequest = () => {
    toast({
      title: "Demo request received!",
      description: "Our team will contact you shortly to schedule your personalized demo.",
    });
  };
  
  const handleFeedbackSubmit = (rating: number, comment: string) => {
    console.log('Feedback submitted:', { rating, comment });
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input to help us improve Tixify.",
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Transform Your Event Marketing Today</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of event creators who increased ticket sales by up to 40% with branded event pages
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg border border-blue-100"
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Why Event Creators Choose Tixify</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Custom Branding in Minutes</h4>
                    <p className="text-gray-600">Upload your logo and select colors that match your brand identity.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Higher Conversion Rates</h4>
                    <p className="text-gray-600">Branded checkout experiences convert 35% better than generic pages.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Faster Time to Market</h4>
                    <p className="text-gray-600">Launch events in minutes, not days. No technical skills required.</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="font-medium text-blue-800">4.9/5 average rating</p>
                  </div>
                  <div className="relative overflow-hidden h-24">
                    {testimonials.map((testimonial, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ 
                          opacity: activeTestimonial === index ? 1 : 0,
                          x: activeTestimonial === index ? 0 : 20
                        }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <p className="text-sm italic mb-1">"{testimonial.text}"</p>
                        <p className="text-xs font-semibold">{testimonial.author}, <span className="font-normal">{testimonial.role}</span></p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-2 mt-2">
                    {testimonials.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={`w-2 h-2 rounded-full ${activeTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  size="lg"
                  onClick={onGetStarted} 
                  className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  onClick={handleDemoRequest}
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold"
                >
                  Schedule Demo
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative max-w-md w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl transform rotate-2 opacity-10"></div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative transform -rotate-1 transition-transform hover:rotate-0 duration-500">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                    alt="Concert example"
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Summer Music Festival</h3>
                    <p className="text-white/80 text-sm">Central Park · July 15-17</p>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-blue-800" /> Featured Event
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">
                      Tickets Available
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm font-medium">Early Bird</span>
                      <span className="font-semibold text-sm text-blue-700">$59.00</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm font-medium">Regular Admission</span>
                      <span className="font-semibold text-sm text-blue-700">$89.00</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium">VIP Experience</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs line-through text-gray-400">$199.00</span>
                        <span className="font-semibold text-sm text-blue-700">$149.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Tickets
                  </Button>
                  
                  <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                    <span>Powered by</span>
                    <span className="font-semibold text-gray-700 ml-1">Tixify</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-blue-600 border border-blue-100">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Custom branding applied
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveBrandingSection;
