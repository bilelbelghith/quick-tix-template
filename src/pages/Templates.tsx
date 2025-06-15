
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TemplatesGallery from '@/components/TemplatesGallery';
import { Button } from "@/components/ui/button";

const Templates: React.FC = () => {
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
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose from our professionally designed templates to create stunning event pages in minutes
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TemplatesGallery />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 bg-blue-100 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to create your event?</h2>
          <p className="text-gray-700 mb-6">Start with one of our templates and customize it to match your brand.</p>
          <Link to="/auth">
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
