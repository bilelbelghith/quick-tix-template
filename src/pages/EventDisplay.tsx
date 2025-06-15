
import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import type { WizardData } from '@/components/FormWizard';

const EventDisplay: React.FC = () => {
  const location = useLocation();
  const eventData = location.state?.eventData as WizardData;

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600">No event data was provided.</p>
          </div>
        </div>
      </div>
    );
  }

  // Utility function to determine if a color is light or dark
  const isLightColor = (color: string) => {
    if (!color || !color.startsWith('#')) return false;
    
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  // Get text color based on background color for contrast
  const getTextColor = (bgColor: string) => {
    return isLightColor(bgColor) ? '#000000' : '#FFFFFF';
  };

  const templateIcons = {
    concert: '🎵',
    workshop: '🎓',
    sports: '🏆'
  };

  const templateNames = {
    concert: 'Concert',
    workshop: 'Workshop',
    sports: 'Sports Event'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
          style={{ backgroundColor: eventData.primaryColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
          
          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              {/* Event Logo */}
              {eventData.logoUrl && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <img 
                    src={eventData.logoUrl} 
                    alt="Event logo" 
                    className="w-24 h-24 mx-auto rounded-full border-4 border-white/20 object-cover"
                  />
                </motion.div>
              )}

              {/* Template Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-4"
              >
                <span 
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: getTextColor(eventData.primaryColor)
                  }}
                >
                  <span className="mr-2 text-lg">
                    {templateIcons[eventData.templateType as keyof typeof templateIcons]}
                  </span>
                  {templateNames[eventData.templateType as keyof typeof templateNames]}
                </span>
              </motion.div>

              {/* Event Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{ color: getTextColor(eventData.primaryColor) }}
              >
                {eventData.eventName || 'Awesome Event'}
              </motion.h1>

              {/* Event Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl mb-8 opacity-90"
                style={{ color: getTextColor(eventData.primaryColor) }}
              >
                Join us for an amazing {eventData.templateType} experience!
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                >
                  <TicketIcon className="mr-2 h-5 w-5" />
                  Buy Tickets
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Event Details Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {/* Date Card */}
              <Card className="text-center">
                <CardContent className="p-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: eventData.primaryColor }}
                  >
                    <Calendar 
                      className="h-6 w-6" 
                      style={{ color: getTextColor(eventData.primaryColor) }}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                  <p className="text-gray-600">Coming Soon</p>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="text-center">
                <CardContent className="p-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: eventData.primaryColor }}
                  >
                    <MapPin 
                      className="h-6 w-6" 
                      style={{ color: getTextColor(eventData.primaryColor) }}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">Venue TBA</p>
                </CardContent>
              </Card>

              {/* Organizer Card */}
              <Card className="text-center">
                <CardContent className="p-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: eventData.primaryColor }}
                  >
                    <User 
                      className="h-6 w-6" 
                      style={{ color: getTextColor(eventData.primaryColor) }}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Organizer</h3>
                  <p className="text-gray-600">Event Host</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ticket Tiers */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-center mb-8">Ticket Options</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventData.ticketTiers.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <Card className="border-2 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{tier.name}</h3>
                            <p className="text-sm text-gray-600">Available: {tier.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold" style={{ color: eventData.primaryColor }}>
                              ${tier.price}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full"
                          style={{ backgroundColor: eventData.primaryColor }}
                        >
                          Select Tickets
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
