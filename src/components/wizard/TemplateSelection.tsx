
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Music, GraduationCap, Trophy } from 'lucide-react';
import type { WizardData } from '@/components/FormWizard';

interface TemplateSelectionProps {
  data: WizardData;
  updateData: (data: Partial<WizardData>) => void;
}

const templates = [
  {
    id: 'concert' as const,
    name: 'Concert',
    description: 'Perfect for music events and performances',
    icon: Music,
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'workshop' as const,
    name: 'Workshop',
    description: 'Ideal for classes, webinars and workshops',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sports' as const,
    name: 'Sports',
    description: 'Great for matches, tournaments and competitions',
    icon: Trophy,
    color: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ data, updateData }) => {
  const handleTemplateSelect = (templateType: 'concert' | 'workshop' | 'sports') => {
    updateData({ templateType });
  };

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Choose a template that best fits your event type. You can customize it in the next steps.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template, index) => {
          const IconComponent = template.icon;
          const isSelected = data.templateType === template.id;
          
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="h-12 w-12 text-white" />
                  </div>
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelection;
