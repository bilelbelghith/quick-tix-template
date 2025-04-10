
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
  primaryColor = '#2563eb' // Default to blue
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
          style={{ 
            borderColor: primaryColor, 
            color: getTextColor(primaryColor) === '#000000' ? primaryColor : 'white',
            backgroundColor: getTextColor(primaryColor) === '#000000' ? 'transparent' : primaryColor
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingAddon;
