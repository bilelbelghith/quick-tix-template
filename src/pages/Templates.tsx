
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, BookOpen, Trophy, Calendar, Star, Users, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';

const templateCategories = [
  {
    id: "concert",
    title: "Concert Events",
    description: "Perfect for concerts, festivals, and live performances",
    icon: <Music className="h-10 w-10 text-white" />,
    color: "bg-purple-600",
    link: "/use-cases/music",
    features: [
      { icon: <Users className="h-4 w-4" />, text: "Fan engagement features" },
      { icon: <Music className="h-4 w-4" />, text: "Artist profile sections" },
      { icon: <Clock className="h-4 w-4" />, text: "Set times and schedules" }
    ],
    example: "Perfect for music festivals, band performances, DJ sets, and more",
    preview: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    event: {
      title: "Summer Music Festival",
      subtitle: "Featuring live performances from top artists",
      date: "Jul 15-17",
      location: "Central Park"
    }
  },
  {
    id: "workshop",
    title: "Workshops & Classes",
    description: "Ideal for educational events and professional gatherings",
    icon: <BookOpen className="h-10 w-10 text-white" />,
    color: "bg-green-600",
    link: "/use-cases/workshops",
    features: [
      { icon: <Users className="h-4 w-4" />, text: "Instructor details" },
      { icon: <Star className="h-4 w-4" />, text: "Skill level indicators" },
      { icon: <Clock className="h-4 w-4" />, text: "Materials & prerequisites" }
    ],
    example: "Great for cooking classes, tech workshops, fitness training, and seminars",
    preview: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    event: {
      title: "Design Thinking Workshop",
      subtitle: "Learn innovative problem-solving techniques",
      date: "Sep 5",
      location: "Innovation Hub"
    }
  },
  {
    id: "sports",
    title: "Sports Events",
    description: "Great for games, tournaments, and athletic competitions",
    icon: <Trophy className="h-10 w-10 text-white" />,
    color: "bg-orange-600",
    link: "/use-cases/sports",
    features: [
      { icon: <Users className="h-4 w-4" />, text: "Team & player info" },
      { icon: <MapPin className="h-4 w-4" />, text: "Venue & seating maps" },
      { icon: <Trophy className="h-4 w-4" />, text: "Tournament brackets" }
    ],
    example: "Ideal for basketball games, golf tournaments, running races, and more",
    preview: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    event: {
      title: "Championship Finals",
      subtitle: "The ultimate showdown for the championship title",
      date: "Oct 12",
      location: "Stadium Arena"
    }
  }
];

const Templates: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto pt-28 px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Event Templates
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a specialized template designed specifically for your event type
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {templateCategories.map((category, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-blue-300 overflow-hidden">
                <div className="relative aspect-video">
                  <img 
                    src={category.preview} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <span className={`${category.color} text-white text-xs px-2 py-1 rounded-full w-fit mb-2`}>
                      {category.id.charAt(0).toUpperCase() + category.id.slice(1)} Template
                    </span>
                    <h3 className="text-white text-lg font-bold">{category.event.title}</h3>
                    <p className="text-white/80 text-xs mt-1">{category.event.subtitle}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">{category.event.date}</div>
                      <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">{category.event.location}</div>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {category.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            category.id === 'concert' ? 'bg-purple-100 text-purple-600' :
                            category.id === 'workshop' ? 'bg-green-100 text-green-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            {feature.icon}
                          </div>
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Separator />
                    
                    <div className="text-sm text-muted-foreground">
                      <p>{category.example}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={category.link} className="w-full">
                    <Button className={`w-full text-white ${
                      category.id === 'concert' ? 'bg-purple-600 hover:bg-purple-700' :
                      category.id === 'workshop' ? 'bg-green-600 hover:bg-green-700' :
                      'bg-orange-600 hover:bg-orange-700'
                    }`}>
                      View Template <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 bg-blue-100 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to create your event?</h2>
          <p className="text-gray-700 mb-6">Start with one of our templates and customize it to match your brand.</p>
          <Link to="/onboarding">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;
