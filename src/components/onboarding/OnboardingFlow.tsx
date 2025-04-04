
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  Calendar, 
  Ticket, 
  Palette
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TemplatePreview from './TemplatePreview';
import FeatureDemo from './FeatureDemo';
import ValueProposition from './ValueProposition';

// Confetti animation when completing steps
const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none z-50">
    <Player
      autoplay
      keepLastFrame={false}
      src="https://assets2.lottiefiles.com/packages/lf20_tupgymfp.json"
      style={{ height: '100%', width: '100%' }}
    />
  </div>
);

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalSteps = 3;
  
  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  
  // Steps content
  const steps = [
    {
      title: "See how it works",
      component: <TemplatePreview onInteraction={() => setHasInteracted(true)} />
    },
    {
      title: "Experience the features",
      component: <FeatureDemo onInteraction={() => setHasInteracted(true)} />
    },
    {
      title: "Get started",
      component: <ValueProposition onInteraction={() => setHasInteracted(true)} />
    }
  ];
  
  // Handle next step with confetti animation
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setShowConfetti(true);
      setCurrentStep(currentStep + 1);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    } else {
      // On last step completion, navigate to template selection
      navigate("/onboarding");
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Skip onboarding
  const handleSkip = () => {
    toast({
      title: "Skipped onboarding",
      description: "You can always come back to learn more!",
      duration: 3000,
    });
    navigate("/onboarding");
  };
  
  useEffect(() => {
    // Track step view for analytics (placeholder)
    console.log(`User viewed onboarding step ${currentStep + 1}: ${steps[currentStep].title}`);
  }, [currentStep]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Progress value={progressPercentage} className="rounded-none h-1" />
      </div>
      
      <div className="flex-grow flex flex-col">
        {/* Step indicator and controls */}
        <div className="py-4 px-6 flex items-center justify-between border-b">
          <div className="flex items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1}/{totalSteps}: {steps[currentStep].title}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSkip}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Skip
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSkip}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Step content with animations */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {steps[currentStep].component}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Step navigation */}
        <div className="py-6 px-8 border-t">
          <div className="flex justify-between items-center max-w-5xl mx-auto w-full">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNextStep}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              {currentStep === totalSteps - 1 ? (
                <>Let's make magic together! <Sparkles className="h-4 w-4 ml-1" /></>
              ) : (
                <>Continue <ChevronRight className="h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Confetti animation */}
      {showConfetti && <Confetti />}
    </div>
  );
};

export default OnboardingFlow;
