
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const templateCategories = [
  {
    title: "Music Events",
    description: "Perfect for concerts, festivals, and live performances",
    icon: <Music className="h-8 w-8 text-purple-500" />,
    link: "/use-cases/music",
    features: ["Seating charts", "Artist profiles", "Performance schedules"]
  },
  {
    title: "Workshops & Conferences",
    description: "Ideal for educational events and professional gatherings",
    icon: <BookOpen className="h-8 w-8 text-purple-500" />,
    link: "/use-cases/workshops",
    features: ["Agenda planning", "Speaker bios", "Session registration"]
  },
  {
    title: "Sports Events",
    description: "Great for games, tournaments, and athletic competitions",
    icon: <Trophy className="h-8 w-8 text-purple-500" />,
    link: "/use-cases/sports",
    features: ["Team matchups", "Venue maps", "Competition brackets"]
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
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />
      <div className="container mx-auto pt-28 px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Event Templates
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a template that fits your event type and customize it to create a unique experience for your attendees.
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
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-purple-300">
                <CardHeader>
                  <div className="mb-4">{category.icon}</div>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-600"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to={category.link} className="w-full">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
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
          className="mt-16 bg-purple-100 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Ready to create your event?</h2>
          <p className="text-gray-700 mb-6">Start with one of our templates and customize it to match your brand.</p>
          <Link to="/onboarding">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;
