
import React from 'react';
import { Check } from 'lucide-react';

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
  return (
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
    </div>
  );
};

export default ColorSelector;
