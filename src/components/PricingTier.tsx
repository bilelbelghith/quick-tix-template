
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant?: 'default' | 'outline';
  className?: string;
  delay?: number;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  name, 
  price, 
  description, 
  features, 
  popular = false, 
  buttonText, 
  buttonVariant = 'default',
  className = '',
  delay = 0
}) => {
  return (
    <div 
      className={`rounded-xl ${popular ? 'border-2 border-purple-600 shadow-lg transform hover:-translate-y-1' : 'border shadow-sm hover:shadow-md'} bg-card transition-all duration-300 relative ${className}`}
      style={{ opacity: 0, animationDelay: `${delay}ms` }}
      data-aos="fade-up"
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-32 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium text-center">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="text-3xl font-bold mb-4">
          {price}
          {price !== 'Custom' && price !== 'Free' && <span className="text-lg font-normal text-muted-foreground">/mo</span>}
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={buttonVariant} 
          className={`w-full ${popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingTier;
