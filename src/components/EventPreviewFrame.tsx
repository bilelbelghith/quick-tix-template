
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EventPreviewFrameProps {
  event: any;
}

const EventPreviewFrame: React.FC<EventPreviewFrameProps> = ({ event }) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  
  if (!event) return null;

  const getTemplateColor = (templateType?: string) => {
    switch (templateType) {
      case 'concert':
        return 'bg-purple-600';
      case 'workshop':
        return 'bg-green-600';
      case 'sports':
        return 'bg-orange-600';
      default:
        return 'bg-blue-600';
    }
  };

  const templateColor = getTemplateColor(event.template_type);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-2">
        <Button
          variant={viewMode === 'desktop' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('desktop')}
          className={viewMode === 'desktop' ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          <Monitor className="h-4 w-4 mr-2" />
          Desktop
        </Button>
        <Button
          variant={viewMode === 'mobile' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('mobile')}
          className={viewMode === 'mobile' ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          <Smartphone className="h-4 w-4 mr-2" />
          Mobile
        </Button>
      </div>

      <div className="relative">
        <motion.div
          animate={{
            width: viewMode === 'mobile' ? 320 : 640,
            height: viewMode === 'mobile' ? 568 : 480,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn(
            "bg-white rounded-lg overflow-hidden shadow-lg",
            viewMode === 'mobile' ? 'border-8 border-black rounded-xl' : 'border border-gray-200'
          )}
        >
          <div className="w-full h-full bg-muted overflow-hidden">
            {event.cover_image_url ? (
              <div 
                className="w-full h-[45%] bg-cover bg-center"
                style={{ backgroundImage: `url(${event.cover_image_url})` }}
              >
                <div 
                  className="w-full h-full flex flex-col justify-end p-6"
                  style={{ 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' 
                  }}
                >
                  {event.template_type && (
                    <span className={`${templateColor} text-white text-xs px-2 py-1 rounded-full w-fit mb-2`}>
                      {event.template_type.charAt(0).toUpperCase() + event.template_type.slice(1)} Event
                    </span>
                  )}
                  
                  <h3 className="text-white text-xl font-bold">
                    {event.name || 'Event Title'}
                  </h3>
                  <p className="text-white text-opacity-80 text-sm mt-1">
                    {event.description || 'Event description goes here'}
                  </p>
                  
                  <div className="flex items-center mt-3 space-x-2">
                    <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">
                      {new Date(event.date || '').toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                    </div>
                    <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">
                      {event.location || 'Location'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-[45%] bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center"
              >
                <p className="text-white opacity-50">No cover image</p>
              </div>
            )}
            
            <div className="p-4">
              {event.logo_url && (
                <div className="flex items-center mb-4">
                  <img 
                    src={event.logo_url} 
                    alt="Event logo" 
                    className="w-10 h-10 rounded-full border-2 border-white mr-3 object-cover"
                  />
                  <div className="text-sm font-medium text-gray-800">
                    {event.organizer_name || 'Organizer'}
                  </div>
                </div>
              )}
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Date & Time</div>
                    <div className="text-xs text-gray-500">
                      {new Date(event.date || '').toLocaleDateString()} • {event.time || '7:00 PM'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-xs text-gray-500">{event.location || 'Event venue location'}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 w-full p-3" 
                style={{ 
                  backgroundColor: event.primary_color || '#2563EB',
                  color: 'white',
                  borderRadius: '0.375rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}
              >
                Get Tickets
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventPreviewFrame;
