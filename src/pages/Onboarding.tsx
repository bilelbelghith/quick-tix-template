
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
}

const templates: Template[] = [
  {
    id: 'concert',
    name: 'Concert',
    description: 'Perfect for music events and performances',
    image: '/placeholder.svg',
    demoImage: '/placeholder.svg',
  },
  {
    id: 'workshop',
    name: 'Workshop',
    description: 'Ideal for classes, webinars and workshops',
    image: '/placeholder.svg',
    demoImage: '/placeholder.svg',
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Great for matches, tournaments and competitions',
    image: '/placeholder.svg',
    demoImage: '/placeholder.svg',
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-muted-foreground mb-6">{template.description}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleOpenDemo(template.id)}
                  >
                    View Demo
                  </Button>
                  <Link to={`/${template.id}/customize`} className="flex-1">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
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
