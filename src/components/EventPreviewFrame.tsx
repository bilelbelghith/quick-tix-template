
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EventPreviewFrameProps {
  event: any;
}

const EventPreviewFrame: React.FC<EventPreviewFrameProps> = ({ event }) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  
  if (!event) return null;

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
                className="w-full h-[33%] bg-cover bg-center"
                style={{ backgroundImage: `url(${event.cover_image_url})` }}
              >
                <div 
                  className="w-full h-full flex items-end p-4"
                  style={{ 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' 
                  }}
                >
                  <div>
                    {event.logo_url && (
                      <img 
                        src={event.logo_url} 
                        alt="Event logo" 
                        className="w-12 h-12 rounded-full mb-2 border-2 border-white"
                      />
                    )}
                    <h3 className="text-white text-xl font-bold truncate">
                      {event.name}
                    </h3>
                    <p className="text-white text-opacity-80 text-sm truncate">
                      {new Date(event.date || '').toLocaleDateString()} • {event.location}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-[33%] bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center"
              >
                <p className="text-white opacity-50">No cover image</p>
              </div>
            )}
            
            <div className="p-4">
              <div className="w-full h-8 bg-gray-200 rounded-full mb-4"></div>
              <div className="w-2/3 h-8 bg-gray-200 rounded-full mb-6"></div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="w-full h-4 bg-gray-200 rounded-full mb-2"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="w-full h-4 bg-gray-200 rounded-full mb-2"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 w-full h-12 rounded-md" 
                style={{ backgroundColor: event.primary_color || '#2563EB' }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventPreviewFrame;
