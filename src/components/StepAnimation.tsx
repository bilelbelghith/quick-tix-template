
import React from 'react';
import Lottie from 'lottie-react';

interface StepAnimationProps {
  animation: any;
  title: string;
  description: string;
  delay: number;
}

const StepAnimation: React.FC<StepAnimationProps> = ({ animation, title, description, delay }) => {
  return (
    <div 
      className="flex flex-col items-center" 
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
      data-aos="fade-up"
    >
      <div className="w-48 h-48 mb-4">
        <Lottie animationData={animation} loop />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-center text-muted-foreground max-w-[250px]">{description}</p>
    </div>
  );
};

export default StepAnimation;
