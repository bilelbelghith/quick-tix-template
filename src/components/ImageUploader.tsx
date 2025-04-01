
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from '@/lib/supabase';

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        setUploadProgress(0);
        
        // For the preview, we'll use a local URL first
        const localUrl = URL.createObjectURL(file);
        onChange(localUrl);
        
        // In a real implementation, we would track upload progress
        // This simulates progress for now
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 95) {
              clearInterval(progressInterval);
              return 95;
            }
            return prev + 5;
          });
        }, 100);
        
        // We're not actually uploading to Supabase here yet
        // That will happen when the form is submitted to prevent orphaned files
        
        setTimeout(() => {
          clearInterval(progressInterval);
          setUploadProgress(100);
          setIsUploading(false);
        }, 2000);
      } catch (error) {
        console.error('Error handling file upload:', error);
        setIsUploading(false);
        onClear(); // Clear on error
      }
    }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="text-sm font-medium">{label}</div>
      
      {!value ? (
        <label 
          className={`border-2 border-dashed border-muted rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:border-purple-600 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange} 
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="text-center">
              <Loader2 className="h-8 w-8 text-purple-600 animate-spin mx-auto mb-2" />
              <span className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</span>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${uploadProgress}%` }} 
                />
              </div>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload</span>
            </>
          )}
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
          {isHovering && !isUploading && (
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
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <span>Uploading... {uploadProgress}%</span>
                <div className="w-full bg-muted rounded-full h-2 mt-2 max-w-xs">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${uploadProgress}%` }} 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
