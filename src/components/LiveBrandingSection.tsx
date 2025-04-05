
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Globe, Lock, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ImageUploader from '@/components/ImageUploader';
import ColorSelector from '@/components/ColorSelector';
import TicketTierEditor from '@/components/TicketTierEditor';
import EventPreviewFrame from '@/components/EventPreviewFrame';
import OrganizerFeedback from '@/components/OrganizerFeedback';
import { TicketTier } from '@/types/events';

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

const LiveBrandingSection: React.FC<LiveBrandingSectionProps> = ({ onGetStarted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [brandingProgress, setBrandingProgress] = useState(33);
  const [showFeedback, setShowFeedback] = useState(false);
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

  const calculateProgress = () => {
    let progress = 0;
    
    if (event.logo_url) progress += 33;
    if (event.primary_color !== '#2563EB') progress += 33;
    if (event.ticket_tiers.length > 0) progress += 34;
    
    setBrandingProgress(progress);
  };

  const handleLogoChange = (url: string) => {
    setEvent(prev => ({
      ...prev,
      logo_url: url
    }));
    calculateProgress();
  };

  const handleColorChange = (color: string) => {
    setEvent(prev => ({
      ...prev,
      primary_color: color
    }));
    calculateProgress();
  };

  const handleTicketTiersChange = (tiers: TicketTier[]) => {
    setEvent(prev => ({
      ...prev,
      ticket_tiers: tiers
    }));
    calculateProgress();
  };

  const handleDomainTypeChange = (type: 'free' | 'custom') => {
    setEvent(prev => ({
      ...prev,
      domain_type: type
    }));
  };

  const handleAddFirstTier = () => {
    if (event.ticket_tiers.length === 0) {
      handleTicketTiersChange([
        {
          name: 'General Admission',
          price: 29,
          description: 'Standard ticket with all amenities',
          quantity: 100
        }
      ]);
    }
  };
  
  const handleFeedbackSubmit = (rating: number, comment: string) => {
    console.log('Feedback submitted:', { rating, comment });
    // Here you would typically send this data to your backend
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Try It Now: Create Your Event</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your event page in real-time and see how easy it is to get started
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-8 items-start">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <EventPreviewFrame event={{
              name: event.name,
              date: event.date,
              time: event.time,
              location: event.location,
              cover_image_url: event.cover_image_url,
              logo_url: event.logo_url,
              primary_color: event.primary_color,
              ticketTiers: event.ticket_tiers
            }} />
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Customize Your Event</h3>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <span>Progress</span>
                  <span className="font-semibold">{brandingProgress}%</span>
                </div>
              </div>
              <Progress value={brandingProgress} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Logo</span>
                <span>Colors</span>
                <span>Tickets</span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-md font-medium mb-4">1. Upload Your Logo</h4>
              <ImageUploader 
                value={event.logo_url}
                onChange={handleLogoChange}
                onClear={() => handleLogoChange('')}
                aspectRatio="1/1"
                label="Logo (1:1 ratio recommended)"
              />
            </div>

            <div className="mb-8">
              <h4 className="text-md font-medium mb-4">2. Choose Your Brand Color</h4>
              <ColorSelector 
                value={event.primary_color}
                onChange={handleColorChange}
                options={colorOptions}
              />
            </div>

            <div className="mb-8">
              <h4 className="text-md font-medium mb-4">3. Select Domain Type</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <div
                  className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${
                    event.domain_type === 'free' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDomainTypeChange('free')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Free Domain</span>
                    </div>
                    {event.domain_type === 'free' && (
                      <Check className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">yourevent.tixify.co</p>
                </div>
                
                <div
                  className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${
                    event.domain_type === 'custom' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDomainTypeChange('custom')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">Custom Domain</span>
                    </div>
                    {event.domain_type === 'custom' && (
                      <Check className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Pro Plan Required</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium mb-4">4. Create Ticket Tiers</h4>
              {event.ticket_tiers.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-gray-500 mb-4">No ticket tiers created yet</p>
                  <Button 
                    onClick={handleAddFirstTier}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Add Your First Ticket Tier
                  </Button>
                </div>
              ) : (
                <TicketTierEditor 
                  ticketTiers={event.ticket_tiers}
                  onChange={handleTicketTiersChange}
                />
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Button 
                onClick={onGetStarted} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12"
              >
                Get Started Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mx-auto"
            >
              {isExpanded ? 'Show less' : 'Show more features'} 
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2">Custom Email Confirmations</h3>
                  <p className="text-gray-600 text-sm">Personalize your ticket confirmation emails with your brand colors and logo.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2">Attendee Management</h3>
                  <p className="text-gray-600 text-sm">View and manage your attendee list with our simple dashboard.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2">Quick Payouts</h3>
                  <p className="text-gray-600 text-sm">Get paid quickly with our Stripe integration and fast payouts.</p>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            {showFeedback ? (
              <OrganizerFeedback onSubmit={handleFeedbackSubmit} />
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Your Opinion Matters</h3>
                <p className="text-muted-foreground mb-4">
                  We'd love to hear about your experience with our platform.
                </p>
                <Button 
                  onClick={() => setShowFeedback(true)}
                  variant="outline" 
                  className="w-full"
                >
                  Share Feedback
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveBrandingSection;
