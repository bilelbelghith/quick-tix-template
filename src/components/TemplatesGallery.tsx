
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface TemplateCard {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  description: string;
}

const templates: TemplateCard[] = [
  {
    id: 'concert-festival',
    title: 'Summer Music Festival',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Concert',
    description: 'Perfect for music festivals and live performances'
  },
  {
    id: 'workshop-design',
    title: 'Design Thinking Workshop',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Workshop',
    description: 'Ideal for educational events and training sessions'
  },
  {
    id: 'sports-championship',
    title: 'Championship Finals',
    thumbnail: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Sports',
    description: 'Great for tournaments and athletic competitions'
  },
  {
    id: 'concert-acoustic',
    title: 'Acoustic Evening',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Concert',
    description: 'Intimate concert venue template'
  },
  {
    id: 'workshop-tech',
    title: 'Tech Innovation Summit',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Workshop',
    description: 'Professional conference and seminar layout'
  },
  {
    id: 'sports-marathon',
    title: 'City Marathon',
    thumbnail: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Sports',
    description: 'Perfect for running events and races'
  }
];

const TemplatesGallery: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId: string) => {
    navigate(`/customizer?template=${templateId}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Concert':
        return 'bg-purple-600';
      case 'Workshop':
        return 'bg-green-600';
      case 'Sports':
        return 'bg-orange-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border hover:border-blue-300">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={template.thumbnail} 
                alt={template.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`${getCategoryColor(template.category)} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                  {template.category}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-lg mb-1">{template.title}</h3>
                <p className="text-white/80 text-sm">{template.description}</p>
              </div>
            </div>
            <CardContent className="p-4">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleSelectTemplate(template.id)}
              >
                Select Template
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TemplatesGallery;
