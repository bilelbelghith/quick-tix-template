
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import TicketCounter from './TicketCounter';
import TicketCheckout from './TicketCheckout';

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description?: string;
  quantity: number;
  available: number;
}

interface TicketTierTableProps {
  ticketTiers: TicketTier[];
  onCheckout?: (selections: { tierId: string; quantity: number }[]) => void;
  primaryColor?: string;
  eventId: string;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  logoUrl?: string | null;
}

const TicketTierTable: React.FC<TicketTierTableProps> = ({ 
  ticketTiers, 
  onCheckout,
  primaryColor = '#6D28D9',
  eventId,
  eventName,
  eventDate,
  eventLocation,
  logoUrl
}) => {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [showCheckout, setShowCheckout] = useState(false);
  
  const handleQuantityChange = (tierId: string, quantity: number) => {
    setSelections(prev => ({
      ...prev,
      [tierId]: quantity
    }));
  };
  
  const handleCheckout = () => {
    const selectedTiers = Object.entries(selections)
      .filter(([_, quantity]) => quantity > 0)
      .map(([tierId, quantity]) => ({ tierId, quantity }));
    
    if (selectedTiers.length > 0) {
      // Use the new checkout experience
      setShowCheckout(true);
      
      // For backward compatibility, still call the onCheckout if provided
      if (onCheckout) {
        onCheckout(selectedTiers);
      }
    }
  };
  
  const handleCheckoutSuccess = () => {
    // Reset selections after successful checkout
    setSelections({});
  };
  
  const selectedTickets = ticketTiers
    .filter(tier => selections[tier.id] && selections[tier.id] > 0)
    .map(tier => ({
      tierId: tier.id,
      name: tier.name,
      quantity: selections[tier.id],
      price: tier.price
    }));
  
  const hasSelections = Object.values(selections).some(qty => qty > 0);
  
  return (
    <>
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[240px]">Ticket Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Availability</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ticketTiers.map((tier) => (
              <TableRow key={tier.id}>
                <TableCell className="font-medium">
                  <div>
                    <p>{tier.name}</p>
                    {tier.description && (
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>${tier.price.toFixed(2)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {tier.available} available
                </TableCell>
                <TableCell>
                  <TicketCounter
                    initialCount={selections[tier.id] || 0}
                    minCount={0}
                    maxCount={tier.available}
                    onChange={(count) => handleQuantityChange(tier.id, count)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 bg-muted/30 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {hasSelections ? 'Ready to purchase tickets' : 'Select ticket quantity to proceed'}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: hasSelections ? 1 : 0.5, 
              scale: hasSelections ? 1 : 0.95
            }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              onClick={handleCheckout}
              disabled={!hasSelections}
              style={{ backgroundColor: primaryColor }}
            >
              Checkout
            </Button>
          </motion.div>
        </div>
      </div>
      
      {showCheckout && (
        <TicketCheckout
          eventId={eventId}
          eventName={eventName}
          eventDate={eventDate}
          eventLocation={eventLocation}
          primaryColor={primaryColor}
          logoUrl={logoUrl}
          tickets={selectedTickets}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </>
  );
};

export default TicketTierTable;
