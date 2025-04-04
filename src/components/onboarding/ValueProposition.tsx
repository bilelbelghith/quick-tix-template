
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { 
  CalendarCheck, 
  BarChart3, 
  CreditCard,
  Check
} from 'lucide-react';

interface ValuePropositionProps {
  onInteraction: () => void;
}

const ValueProposition: React.FC<ValuePropositionProps> = ({ onInteraction }) => {
  const [videoWatched, setVideoWatched] = useState(false);
  const navigate = useNavigate();
  
  const handleWatchVideo = () => {
    setVideoWatched(true);
    onInteraction();
  };
  
  const handleGetStarted = () => {
    navigate('/auth/signup');
  };
  
  const handleExploreWithoutAccount = () => {
    navigate('/onboarding');
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 h-full flex flex-col">
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          You're almost there!
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          See what you can achieve with Tixify
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow">
        <div>
          {!videoWatched ? (
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 flex flex-col items-center justify-center h-full border"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center">
                <div className="mb-6">
                  <Player
                    autoplay
                    loop
                    src="https://assets9.lottiefiles.com/packages/lf20_zyu0ctqy.json"
                    style={{ height: '200px', width: '200px' }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Watch how it works</h3>
                <p className="text-muted-foreground mb-6">
                  See how Tixify helps event creators increase ticket sales and create memorable experiences
                </p>
                <Button onClick={handleWatchVideo}>
                  Watch 30-second demo
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden h-full border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <Player
                  autoplay
                  loop
                  src="https://assets5.lottiefiles.com/packages/lf20_khzniaya.json"
                  style={{ height: '250px', width: '250px' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tixify in action</h3>
                <p className="text-muted-foreground">
                  Thanks for watching! Ready to create your own event?
                </p>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="space-y-6 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Why event creators love us</h2>
            
            <div className="space-y-3 mb-8">
              {[
                {
                  icon: <CalendarCheck className="h-5 w-5 text-green-500" />,
                  text: "Create and publish events in under 5 minutes"
                },
                {
                  icon: <BarChart3 className="h-5 w-5 text-green-500" />,
                  text: "Average 35% increase in ticket sales"
                },
                {
                  icon: <CreditCard className="h-5 w-5 text-green-500" />,
                  text: "Fast payouts and transparent pricing"
                }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-green-50 p-1 rounded-full">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="flex flex-col gap-4 mt-auto">
            <Card className="p-6 bg-blue-50 border-blue-100">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <span className="bg-blue-100 p-1.5 rounded-full mr-2">
                  <Check className="h-5 w-5 text-blue-600" />
                </span>
                Ready to create your event?
              </h3>
              <p className="text-muted-foreground mb-4">
                Sign up for free and start selling tickets today
              </p>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleGetStarted}
                >
                  Create your free account
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleExploreWithoutAccount}
                >
                  Explore without an account
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
