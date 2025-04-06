
import React from 'react';
import { Button } from '@/components/ui/button';

interface PricingAddonProps {
  name: string;
  price: string;
  description: string;
  buttonText: string;
}

const PricingAddon: React.FC<PricingAddonProps> = ({ 
  name, 
  price, 
  description, 
  buttonText
}) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition-all duration-200">
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="font-bold text-lg text-purple-700">{price}</div>
        <Button size="sm" variant="outline" className="whitespace-nowrap">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingAddon;
