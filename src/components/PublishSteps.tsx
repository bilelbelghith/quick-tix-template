
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface PublishStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Review Event Details' },
  { id: 2, label: 'Publish' },
  { id: 3, label: 'Share' }
];

const PublishSteps: React.FC<PublishStepsProps> = ({ currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: currentStep >= step.id ? 1 : 0.8 }}
                className="relative flex items-center justify-center"
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-10 w-10 text-purple-600" />
                ) : currentStep === step.id ? (
                  <motion.div
                    initial={{ borderColor: '#d1d5db' }}
                    animate={{ borderColor: '#6D28D9' }}
                    className="h-10 w-10 rounded-full border-2 border-purple-600 flex items-center justify-center"
                  >
                    <span className="text-sm font-medium text-purple-600">{step.id}</span>
                  </motion.div>
                ) : (
                  <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-400">{step.id}</span>
                  </div>
                )}
              </motion.div>
              <span 
                className={`mt-2 text-sm ${
                  currentStep >= step.id ? 'font-medium text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`w-20 h-0.5 mx-2 ${
                  currentStep > index + 1 ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PublishSteps;
