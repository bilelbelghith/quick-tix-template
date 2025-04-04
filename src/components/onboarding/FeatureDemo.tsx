
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Palette,
  Ticket,
  CreditCard,
  Link as LinkIcon,
  Share2,
  BarChart
} from 'lucide-react';

interface FeatureDemoProps {
  onInteraction: () => void;
}

const FeatureDemo: React.FC<FeatureDemoProps> = ({ onInteraction }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      id: 'customize',
      title: 'Fully Customizable',
      description: 'Personalize colors, logos, and layouts to match your brand',
      icon: <Palette className="h-8 w-8" />,
      color: 'bg-blue-500'
    },
    {
      id: 'tickets',
      title: 'Flexible Ticketing',
      description: 'Create multiple ticket tiers with different prices',
      icon: <Ticket className="h-8 w-8" />,
      color: 'bg-purple-500'
    },
    {
      id: 'payments',
      title: 'Secure Payments',
      description: 'Accept payments with Stripe integration',
      icon: <CreditCard className="h-8 w-8" />,
      color: 'bg-green-500'
    },
    {
      id: 'custom-domain',
      title: 'Custom Domain',
      description: 'Use your own domain for a branded experience',
      icon: <LinkIcon className="h-8 w-8" />,
      color: 'bg-orange-500'
    },
    {
      id: 'share',
      title: 'Social Sharing',
      description: 'Promote your event across social platforms',
      icon: <Share2 className="h-8 w-8" />,
      color: 'bg-pink-500'
    },
    {
      id: 'analytics',
      title: 'Real-time Analytics',
      description: 'Track ticket sales and attendee data',
      icon: <BarChart className="h-8 w-8" />,
      color: 'bg-indigo-500'
    }
  ];
  
  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
      onInteraction();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length, onInteraction]);
  
  // Manual feature selection
  const handleSelectFeature = (index: number) => {
    setActiveFeature(index);
    onInteraction();
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 h-full flex flex-col">
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Powerful features to boost your events
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Everything you need to create, manage, and sell tickets for your events
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Feature showcase */}
        <motion.div 
          className="relative h-80 md:h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="absolute inset-0 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeFeature === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <div className={`${feature.color} text-white p-4 rounded-full inline-flex mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Feature list */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className={`p-4 cursor-pointer transition-all ${
                activeFeature === index 
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200' 
                  : 'hover:bg-blue-50'
              }`}
              onClick={() => handleSelectFeature(index)}
            >
              <div className="flex items-center">
                <div className={`${feature.color} text-white p-2 rounded mr-4 shrink-0`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureDemo;
