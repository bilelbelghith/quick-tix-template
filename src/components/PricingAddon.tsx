
import React from 'react';
import { Button } from '@/components/ui/button';

interface PricingAddonProps {
  name: string;
  price: string;
  description: string;
  buttonText: string;
  primaryColor?: string;
}

const PricingAddon: React.FC<PricingAddonProps> = ({ 
  name, 
  price, 
  description, 
  buttonText,
  primaryColor = '#2563eb' // Default to blue instead of purple
}) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition-all duration-200">
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="font-bold text-lg" style={{ color: primaryColor }}>{price}</div>
        <Button 
          size="sm" 
          variant="outline" 
          className="whitespace-nowrap"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingAddon;
