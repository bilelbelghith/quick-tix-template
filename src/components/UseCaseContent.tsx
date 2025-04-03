
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface Feature {
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface UseCaseContentProps {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  testimonial: Testimonial;
  imageSrc: string;
  imageAlt: string;
}

const UseCaseContent: React.FC<UseCaseContentProps> = ({
  title,
  subtitle,
  description,
  features,
  testimonial,
  imageSrc,
  imageAlt
}) => {
  return (
    <div className="container mx-auto pt-28 px-4 pb-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium mb-6">
          {subtitle}
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-purple-800">Key Features</h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
        >
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-8 text-white mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <svg className="h-8 w-8 text-purple-300 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-xl italic mb-6">{testimonial.quote}</p>
          <div className="font-bold">{testimonial.author}</div>
          <div className="text-purple-200">{testimonial.role}</div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Ready to create your own event?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/onboarding">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/templates">
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              View All Templates
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UseCaseContent;
