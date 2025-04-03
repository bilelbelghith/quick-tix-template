import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Music, GraduationCap, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from '@/components/Navbar';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  demoImage: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const templates: Template[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'A flexible template for any type of event',
    image: '/placeholder.svg',
    demoImage: '/placeholder.svg',
    icon: <Calendar className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-600',
    features: [
      'Simple and clean design',
      'All basic event information',
      'Customizable layout',
      'Multiple ticket tiers',
      'Event countdown'
    ]
  },
  {
    id: 'concert',
    name: 'Concert',
    description: 'Perfect for music events and performances',
    image: '/placeholder.svg',
    demoImage: '/placeholder.svg',
    icon: <Music className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-600',
    features: [
      'Artist profiles and lineup',
      'Genre categorization',
      'Opening act information',
      'Music-oriented design elements',
      'Duration details'
    ]
  },
  {
    id: 'workshop',
    name: 'Workshop',
    description: 'Ideal for classes, webinars and workshops',
    image: '/placeholder.svg',
    demoImage: '/placeholder.svg',
    icon: <GraduationCap className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-600',
    features: [
      'Instructor information',
      'Skill level indicators',
      'Prerequisites listing',
      'Materials needed section',
      'Educational design elements'
    ]
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Great for matches, tournaments and competitions',
    image: '/placeholder.svg',
    demoImage: '/placeholder.svg',
    icon: <Trophy className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-600',
    features: [
      'Team information',
      'Sport type categorization',
      'Competition level details',
      'Rules and regulations section',
      'Athletic design elements'
    ]
  },
];

const Onboarding = () => {
  const [openDemo, setOpenDemo] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleOpenDemo = (templateId: string) => {
    setOpenDemo(templateId);
  };

  const handleCloseDemo = () => {
    setOpenDemo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center mb-12 mt-8">
          <Link to="/" className="mr-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Choose Your Template</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className="border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="aspect-video bg-muted relative">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${template.color}`}>
                    {template.icon}
                    <span className="ml-1">{template.name}</span>
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  {template.icon}
                  <span className="ml-2">{template.name}</span>
                </h3>
                <p className="text-muted-foreground mb-4">{template.description}</p>
                
                <ul className="mb-6 space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="text-green-500 mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleOpenDemo(template.id)}
                  >
                    View Demo
                  </Button>
                  <Link to={`/${template.id}/customize`} className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Use Template
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <Dialog open={!!openDemo} onOpenChange={handleCloseDemo}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {openDemo && templates.find(t => t.id === openDemo)?.name} Template Preview
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 overflow-hidden rounded-lg">
              {openDemo && (
                <img 
                  src={templates.find(t => t.id === openDemo)?.demoImage} 
                  alt={`${openDemo} template preview`}
                  className="w-full object-cover"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Onboarding;
