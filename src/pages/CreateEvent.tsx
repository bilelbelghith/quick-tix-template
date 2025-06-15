
import React from 'react';
import Navbar from '@/components/Navbar';
import FormWizard from '@/components/FormWizard';

const CreateEvent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20">
        <FormWizard />
      </div>
    </div>
  );
};

export default CreateEvent;
