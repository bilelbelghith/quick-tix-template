
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface TicketCounterProps {
  initialCount?: number;
  maxCount?: number;
  minCount?: number;
  onChange?: (count: number) => void;
}

const TicketCounter: React.FC<TicketCounterProps> = ({
  initialCount = 1,
  maxCount = 10,
  minCount = 1,
  onChange,
}) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    if (count < maxCount) {
      const newCount = count + 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  const decrement = () => {
    if (count > minCount) {
      const newCount = count - 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={decrement}
        disabled={count <= minCount}
        className="rounded-full"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <motion.div 
        key={count} 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-8 text-center font-medium"
      >
        {count}
      </motion.div>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={increment}
        disabled={count >= maxCount}
        className="rounded-full"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TicketCounter;
