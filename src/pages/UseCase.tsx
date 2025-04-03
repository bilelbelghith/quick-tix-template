
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';

type UseCaseType = 'music' | 'workshops' | 'sports';

const UseCase: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  
  let title = 'Use Case';
  let description = 'Learn how Tixify can help with your events.';
  
  switch (type as UseCaseType) {
    case 'music':
      title = 'Music Events';
      description = 'Perfect for concerts, festivals, and live performances.';
      break;
    case 'workshops':
      title = 'Workshops & Conferences';
      description = 'Ideal for educational events and professional gatherings.';
      break;
    case 'sports':
      title = 'Sports Events';
      description = 'Great for games, tournaments, and athletic competitions.';
      break;
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-6">{description}</p>
        <p>This is the {title} use case page. Content will be added soon.</p>
      </div>
    </div>
  );
};

export default UseCase;
