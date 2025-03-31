
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onClear: () => void;
  aspectRatio?: string;
  label: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  onClear,
  aspectRatio = "16/9",
  label
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this to Supabase storage
      // For now, we'll use a local URL
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="text-sm font-medium">{label}</div>
      
      {!value ? (
        <label 
          className="border-2 border-dashed border-muted rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:border-purple-600 transition-colors"
        >
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange} 
          />
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">Click to upload</span>
        </label>
      ) : (
        <div 
          className="relative rounded-md overflow-hidden"
          style={{ aspectRatio }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img 
            src={value} 
            alt="Uploaded image" 
            className="w-full h-full object-cover"
          />
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onClear}
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
