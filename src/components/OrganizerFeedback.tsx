
import React, { useState } from 'react';
import { Star, Send, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface OrganizerFeedbackProps {
  onSubmit?: (rating: number, comment: string) => void;
  context?: 'publishing' | 'sales' | 'general';
}

const OrganizerFeedback: React.FC<OrganizerFeedbackProps> = ({ onSubmit, context = 'general' }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { toast } = useToast();

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const getFeedbackPrompt = () => {
    switch (context) {
      case 'publishing':
        return "How was your experience publishing this event?";
      case 'sales':
        return "How satisfied are you with the ticket sales experience?";
      default:
        return "How was your experience using Tixify?";
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Share your experience by selecting a star rating",
        variant: "destructive"
      });
      return;
    }

    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit(rating, comment);
    }

    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve the platform for all organizers.",
      action: (
        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
          <ThumbsUp className="h-4 w-4 text-white" />
        </div>
      ),
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-sm text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <ThumbsUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Feedback Received!</h3>
        <p className="text-muted-foreground">
          Thank you for sharing your experience with us. Your input helps us create a better platform.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Share Your Experience</h3>
      <p className="text-muted-foreground mb-6">
        {getFeedbackPrompt()} Your feedback helps us improve.
      </p>

      <div className="flex flex-col space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">Your Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Your Feedback (Optional)
          </label>
          <Textarea
            id="comment"
            placeholder="Tell us about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 w-full"
        >
          Submit Feedback
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OrganizerFeedback;
