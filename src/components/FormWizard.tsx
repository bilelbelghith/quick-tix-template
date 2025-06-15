
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import TemplateSelection from '@/components/wizard/TemplateSelection';
import BrandingStep from '@/components/wizard/BrandingStep';
import TicketInfoStep from '@/components/wizard/TicketInfoStep';

export interface WizardData {
  templateType: 'concert' | 'workshop' | 'sports' | '';
  eventName: string;
  logoUrl: string;
  primaryColor: string;
  ticketTiers: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

const FormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    templateType: '',
    eventName: '',
    logoUrl: '',
    primaryColor: '#2563eb',
    ticketTiers: [
      { id: '1', name: 'General Admission', price: 25, quantity: 100 }
    ]
  });

  const steps = [
    { number: 1, title: 'Choose Template', component: TemplateSelection },
    { number: 2, title: 'Add Branding', component: BrandingStep },
    { number: 3, title: 'Ticket Info', component: TicketInfoStep }
  ];

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return wizardData.templateType !== '';
      case 2:
        return wizardData.eventName.trim() !== '';
      case 3:
        return wizardData.ticketTiers.length > 0 && wizardData.ticketTiers.every(tier => tier.name && tier.price > 0 && tier.quantity > 0);
      default:
        return false;
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium
                  ${currentStep > step.number ? 'bg-green-600 text-white' : 
                    currentStep === step.number ? 'bg-blue-600 text-white' : 
                    'bg-gray-300 text-gray-600'}
                `}>
                  {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">{steps[currentStep - 1].title}</h2>
                <CurrentStepComponent 
                  data={wizardData} 
                  updateData={updateWizardData}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button 
                  onClick={nextStep}
                  disabled={!canProceed()}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!canProceed()}
                >
                  Create Event
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormWizard;
