
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Music, GraduationCap, Trophy, Calendar, Star, Mic, Users, Clock, Award, MapPin } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';

interface TemplatePreviewProps {
  onInteraction: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ onInteraction }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const templates = [
    {
      id: 'concert',
      name: 'Concert Template',
      icon: <Music className="h-6 w-6 text-white" />,
      color: 'bg-purple-600',
      description: 'Ideal for music events and performances',
      features: [
        { icon: <Mic className="h-4 w-4" />, text: 'Artist profiles' },
        { icon: <Clock className="h-4 w-4" />, text: 'Set times' },
        { icon: <Users className="h-4 w-4" />, text: 'Fan experiences' }
      ],
      preview: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      event: {
        title: 'Summer Music Festival',
        subtitle: 'Featuring live performances from top artists',
        date: 'Jul 15-17',
        location: 'Central Park'
      }
    },
    {
      id: 'workshop',
      name: 'Workshop Template',
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      color: 'bg-green-600',
      description: 'Perfect for classes and workshops',
      features: [
        { icon: <Users className="h-4 w-4" />, text: 'Instructor bios' },
        { icon: <Award className="h-4 w-4" />, text: 'Skill levels' },
        { icon: <Clock className="h-4 w-4" />, text: 'Materials included' }
      ],
      preview: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      event: {
        title: 'Design Thinking Workshop',
        subtitle: 'Learn innovative problem-solving techniques',
        date: 'Sep 5',
        location: 'Innovation Hub'
      }
    },
    {
      id: 'sports',
      name: 'Sports Template',
      icon: <Trophy className="h-6 w-6 text-white" />,
      color: 'bg-orange-600',
      description: 'Great for matches and competitions',
      features: [
        { icon: <Users className="h-4 w-4" />, text: 'Team matchups' },
        { icon: <MapPin className="h-4 w-4" />, text: 'Venue maps' },
        { icon: <Award className="h-4 w-4" />, text: 'Tournament info' }
      ],
      preview: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      event: {
        title: 'Championship Finals',
        subtitle: 'The ultimate showdown for the championship title',
        date: 'Oct 12',
        location: 'Stadium Arena'
      }
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
          Choose Your Event Template
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Select a template designed specifically for your event type
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className={`border rounded-xl overflow-hidden bg-card shadow-sm transition-all ${selectedTemplate === template.id ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-md'}`}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => handleSelectTemplate(template.id)}
          >
            <div className="aspect-video relative">
              <img 
                src={template.preview} 
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <span className={`${template.color} text-white text-xs px-2 py-1 rounded-full w-fit mb-2`}>
                  {template.id.charAt(0).toUpperCase() + template.id.slice(1)} Template
                </span>
                <h3 className="text-white text-lg font-bold">{template.event.title}</h3>
                <p className="text-white/80 text-xs mt-1">{template.event.subtitle}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">{template.event.date}</div>
                  <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">{template.event.location}</div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-muted-foreground mb-4">{template.description}</p>
              
              <div className="space-y-2 mb-5">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="mr-2 text-blue-500">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant={selectedTemplate === template.id ? "default" : "outline"}
                className={`w-full ${selectedTemplate === template.id ? template.color.replace('bg-', 'bg-') + ' text-white hover:bg-opacity-90' : ''}`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Use This Template'}
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
            <div className="mb-4">
              <Player
                autoplay
                loop
                src="/src/assets/animations/template.json"
                style={{ height: '120px', width: '120px' }}
              />
            </div>
            <p className="text-xl font-medium mb-2">Great choice!</p>
            <p className="text-muted-foreground">Continue to customize your {templates.find(t => t.id === selectedTemplate)?.name.toLowerCase()}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TemplatePreview;
