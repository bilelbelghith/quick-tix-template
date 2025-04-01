
import React from 'react';
import { Twitter, Mail, Linkedin, Facebook, Hash, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface ShareOptionsProps {
  url: string;
  title: string;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({ url, title }) => {
  const { toast } = useToast();
  
  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this event: ${url}`)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard!",
    });
  };
  
  const embedCode = `<a href="${url}" style="display:inline-block;background-color:#6D28D9;color:white;padding:8px 16px;text-decoration:none;border-radius:4px;font-family:sans-serif">Get Tickets</a>`;

  return (
    <div className="w-full">
      <h3 className="font-medium mb-4">Share your event</h3>
      
      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="embed">Embed Button</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="flex flex-col items-center py-6 h-auto"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-8 w-8 mb-2 text-[#1DA1F2]" />
              <span>Twitter</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center py-6 h-auto"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-8 w-8 mb-2 text-[#1877F2]" />
              <span>Facebook</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center py-6 h-auto"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-8 w-8 mb-2 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center py-6 h-auto"
              onClick={() => handleShare('email')}
            >
              <Mail className="h-8 w-8 mb-2 text-gray-500" />
              <span>Email</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="embed" className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Copy this code to embed a "Get Tickets" button on your website.
          </p>
          
          <div className="relative">
            <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
              {embedCode}
            </pre>
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(embedCode)}
            >
              <Code className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <div className="p-4 border rounded-md flex items-center justify-center">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md no-underline"
              >
                Get Tickets
              </a>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="qr" className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">
            QR code that links directly to your event page.
          </p>
          
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md shadow-sm mb-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`}
                alt="Event QR code"
                className="w-48 h-48"
              />
            </div>
            
            <Button
              onClick={() => {
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
                window.open(qrUrl, '_blank');
              }}
            >
              <Hash className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShareOptions;
