
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
  primaryColor?: string;
}

const UseCaseContent: React.FC<UseCaseContentProps> = ({
  title,
  subtitle,
  description,
  features,
  testimonial,
  imageSrc,
  imageAlt,
  primaryColor = '#2563eb'
}) => {
  // Utility function to determine if a color is light or dark
  const isLightColor = (color: string) => {
    if (!color || !color.startsWith('#')) return false;
    
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  // Get text color based on background color for contrast
  const getTextColor = (bgColor: string) => {
    return isLightColor(bgColor) ? '#000000' : '#FFFFFF';
  };

  const textColor = getTextColor(primaryColor);
  
  return (
    <div className="container mx-auto pt-28 px-4 pb-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 
          className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent"
          style={{ 
            backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}CC)` 
          }}
        >
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
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 
            className="text-3xl font-bold"
            style={{ color: primaryColor }}
          >
            Key Features
          </h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex gap-4"
              >
                <div 
                  className="mt-1 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  <Check 
                    className="h-4 w-4" 
                    style={{ color: primaryColor }}
                  />
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
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
        >
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl p-8 text-white mb-16"
        style={{ 
          background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}AA)`,
          color: textColor
        }}
      >
        <div className="max-w-4xl mx-auto">
          <svg 
            className="h-8 w-8 mb-4" 
            fill="currentColor" 
            viewBox="0 0 32 32" 
            aria-hidden="true"
            style={{ color: `${textColor}80` }}
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-xl italic mb-6">{testimonial.quote}</p>
          <div className="font-bold">{testimonial.author}</div>
          <div style={{ color: `${textColor}80` }}>{testimonial.role}</div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Ready to create your own event?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/onboarding">
            <Button 
              size="lg" 
              style={{ 
                backgroundColor: primaryColor,
                color: textColor,
              }}
              className="hover:opacity-90"
            >
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/templates">
            <Button 
              size="lg" 
              variant="outline" 
              style={{ 
                borderColor: primaryColor,
                color: primaryColor, 
              }}
              className="hover:bg-opacity-10"
            >
              View All Templates
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UseCaseContent;
