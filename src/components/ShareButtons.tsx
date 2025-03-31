
import React, { useState } from 'react';
import { Copy, Twitter, Check } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        description: "Link copied to clipboard!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };
  
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };
  
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleCopyLink}>
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={handleTwitterShare}>
        <Twitter className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
};

export default ShareButtons;
