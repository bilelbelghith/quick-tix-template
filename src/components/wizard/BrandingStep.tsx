
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import type { WizardData } from '@/components/FormWizard';

interface BrandingStepProps {
  data: WizardData;
  updateData: (data: Partial<WizardData>) => void;
}

const colorOptions = [
  { value: '#2563eb', label: 'Blue' },
  { value: '#7c3aed', label: 'Purple' },
  { value: '#059669', label: 'Green' },
  { value: '#dc2626', label: 'Red' },
  { value: '#ea580c', label: 'Orange' },
  { value: '#0891b2', label: 'Cyan' }
];

const BrandingStep: React.FC<BrandingStepProps> = ({ data, updateData }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ eventName: e.target.value });
  };

  const handleColorSelect = (color: string) => {
    updateData({ primaryColor: color });
  };

  const handleFileUpload = (file: File) => {
    // In a real app, you'd upload to your storage service
    const url = URL.createObjectURL(file);
    updateData({ logoUrl: url });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeLogo = () => {
    updateData({ logoUrl: '' });
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Add your branding to make your event page unique and professional.
      </p>

      {/* Event Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Name *
        </label>
        <Input
          type="text"
          placeholder="Enter your event name"
          value={data.eventName}
          onChange={handleEventNameChange}
          className="w-full"
        />
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Logo
        </label>
        
        {!data.logoUrl ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop your logo here, or</p>
            <label htmlFor="logo-upload" className="cursor-pointer">
              <Button type="button" variant="outline" asChild>
                <span>Choose File</span>
              </Button>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
          </div>
        ) : (
          <div className="relative inline-block">
            <img
              src={data.logoUrl}
              alt="Event logo"
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={removeLogo}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Primary Color
        </label>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleColorSelect(color.value)}
              className={`w-10 h-10 rounded-full transition-all ${
                data.primaryColor === color.value 
                  ? 'ring-4 ring-offset-2 ring-blue-500/40 scale-110' 
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.label}
            />
          ))}
        </div>
        
        {/* Custom Color Input */}
        <div className="mt-4">
          <label className="block text-xs text-gray-500 mb-1">
            Or enter a custom hex color:
          </label>
          <Input
            type="text"
            placeholder="#2563eb"
            value={data.primaryColor}
            onChange={(e) => updateData({ primaryColor: e.target.value })}
            className="w-32"
          />
        </div>
      </div>

      {/* Preview */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-700 mb-3">Preview</h3>
          <div 
            className="rounded-lg p-6 text-white"
            style={{ backgroundColor: data.primaryColor }}
          >
            <div className="flex items-center space-x-4">
              {data.logoUrl && (
                <img 
                  src={data.logoUrl} 
                  alt="Logo preview" 
                  className="w-12 h-12 rounded-lg object-cover bg-white/20"
                />
              )}
              <div>
                <h4 className="text-xl font-bold">
                  {data.eventName || 'Your Event Name'}
                </h4>
                <p className="opacity-90">Event preview with your branding</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingStep;
