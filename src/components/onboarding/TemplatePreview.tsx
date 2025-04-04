
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Music, GraduationCap, Trophy, Calendar } from 'lucide-react';

interface TemplatePreviewProps {
  onInteraction: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ onInteraction }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const templates = [
    {
      id: 'standard',
      name: 'Standard Event',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Perfect for any type of event'
    },
    {
      id: 'concert',
      name: 'Concert',
      icon: <Music className="h-6 w-6" />,
      color: 'bg-purple-500',
      description: 'Ideal for music events and performances'
    },
    {
      id: 'workshop',
      name: 'Workshop',
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-green-500',
      description: 'Great for classes and workshops'
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: <Trophy className="h-6 w-6" />,
      color: 'bg-orange-500',
      description: 'Perfect for matches and competitions'
    }
  ];
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
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
          Create beautiful event pages in minutes
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Browse our professionally designed templates to find the perfect fit for your event
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className={`border rounded-xl overflow-hidden bg-card shadow-sm transition-all ${selectedTemplate === template.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => handleSelectTemplate(template.id)}
          >
            <div className={`aspect-video flex items-center justify-center ${template.color}`}>
              <div className="bg-white/10 p-4 rounded-full">
                {template.icon}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-muted-foreground mb-4">{template.description}</p>
              <Button 
                variant={selectedTemplate === template.id ? "default" : "outline"}
                className="w-full"
                onClick={() => handleSelectTemplate(template.id)}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Preview'}
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="flex-grow flex items-center justify-center">
        {selectedTemplate && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <p className="text-xl font-medium mb-2">Great choice!</p>
            <p className="text-muted-foreground">Continue to see how customization works</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TemplatePreview;
