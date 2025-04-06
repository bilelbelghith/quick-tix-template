
import React, { useState } from 'react';
import { Check, Palette, ChevronDown, ChevronUp } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface ColorOption {
  value: string;
  label: string;
}

interface ColorSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: ColorOption[];
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ 
  value, 
  onChange, 
  options 
}) => {
  const [customColor, setCustomColor] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
  };

  const applyCustomColor = () => {
    if (customColor && customColor.match(/^#([0-9A-F]{3}){1,2}$/i)) {
      onChange(customColor);
    }
  };

  const toggleCustom = () => {
    setShowCustom(!showCustom);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              w-12 h-12 rounded-full relative flex items-center justify-center
              transition-all
              ${value === option.value ? 'ring-4 ring-offset-2 ring-blue-500/40' : 'hover:scale-110'}`}
            style={{ backgroundColor: option.value }}
            title={option.label}
          >
            {value === option.value && (
              <Check className="h-5 w-5 text-white" />
            )}
          </button>
        ))}
        
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 flex items-center justify-center hover:scale-110 transition-all"
              title="Custom color"
            >
              <Palette className="h-5 w-5 text-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 bg-white">
            <div className="space-y-3">
              <h4 className="font-medium">Custom Brand Color</h4>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: customColor || "#FFFFFF" }}
                ></div>
                <Input 
                  type="text" 
                  placeholder="#4A86E8" 
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="flex-1"
                />
              </div>
              <button
                onClick={applyCustomColor}
                className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 transition-colors"
              >
                Apply Color
              </button>
              <p className="text-xs text-gray-500">
                Enter a valid HEX color code (e.g., #4A86E8)
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <button 
        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        onClick={toggleCustom}
      >
        {showCustom ? (
          <>
            <ChevronUp className="h-4 w-4 mr-1" />
            Hide more colors
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-1" />
            Show more colors
          </>
        )}
      </button>
      
      {showCustom && (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {[
            "#E57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB",
            "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
            "#AED581", "#DCE775", "#FFF176", "#FFD54F", "#FFB74D",
            "#FF8A65", "#A1887F", "#90A4AE", "#132043", "#022C43"
          ].map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`
                w-8 h-8 rounded-full relative flex items-center justify-center
                transition-all
                ${value === color ? 'ring-2 ring-offset-2 ring-blue-500/40' : 'hover:scale-110'}`}
              style={{ backgroundColor: color }}
            >
              {value === color && (
                <Check className="h-3 w-3 text-white" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelector;
