
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PricingTierProps {
  name: string;
  price: string;
  billingPeriod?: string;
  description: string;
  features: Array<{text: string; included: boolean}>;
  popular?: boolean;
  buttonText: string;
  buttonVariant?: 'default' | 'outline';
  className?: string;
  discount?: string;
  annualPrice?: string;
  delay?: number;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  name, 
  price, 
  billingPeriod = 'month',
  description, 
  features, 
  popular = false, 
  buttonText, 
  buttonVariant = 'default',
  className = '',
  discount,
  annualPrice,
  delay = 0
}) => {
  return (
    <div 
      className={`relative rounded-xl ${popular ? 'border-2 border-purple-600 shadow-lg transform hover:-translate-y-1' : 'border shadow-sm hover:shadow-md'} bg-card transition-all duration-300 ${className}`}
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
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            {price !== 'Custom' && price !== 'Free' && (
              <span className="text-lg font-normal text-muted-foreground ml-1">/{billingPeriod}</span>
            )}
          </div>
          
          {annualPrice && (
            <div className="text-sm text-muted-foreground mt-1 flex items-center">
              <span>{annualPrice}/year</span>
              {discount && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  Save {discount}
                </Badge>
              )}
            </div>
          )}
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
              )}
              <span className={!feature.included ? "text-gray-400" : ""}>{feature.text}</span>
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
