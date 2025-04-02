
import React from 'react';
import { Check } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  badge?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, badge }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="text-purple-600 mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 6C11 4.89543 10.1046 4 9 4H7C5.89543 4 5 4.89543 5 6V10C5 11.1046 5.89543 12 7 12H9C10.1046 12 11 11.1046 11 10V6Z" fill="currentColor" />
          <path d="M21 6C21 4.89543 20.1046 4 19 4H17C15.8954 4 15 4.89543 15 6V10C15 11.1046 15.8954 12 17 12H19C20.1046 12 21 11.1046 21 10V6Z" fill="currentColor" />
          <path d="M11 16C11 14.8954 10.1046 14 9 14H7C5.89543 14 5 14.8954 5 16V18C5 19.1046 5.89543 20 7 20H9C10.1046 20 11 19.1046 11 18V16Z" fill="currentColor" />
          <path d="M21 16C21 14.8954 20.1046 14 19 14H17C15.8954 14 15 14.8954 15 16V18C15 19.1046 15.8954 20 17 20H19C20.1046 20 21 19.1046 21 18V16Z" fill="currentColor" />
        </svg>
      </div>
      <blockquote className="text-2xl font-medium mb-4">"{quote}"</blockquote>
      <div className="font-semibold">{author}</div>
      {badge && (
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="mr-1 h-3 w-3" />
          {badge}
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
