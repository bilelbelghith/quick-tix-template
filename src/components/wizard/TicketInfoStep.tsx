
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import type { WizardData } from '@/components/FormWizard';

interface TicketInfoStepProps {
  data: WizardData;
  updateData: (data: Partial<WizardData>) => void;
}

const TicketInfoStep: React.FC<TicketInfoStepProps> = ({ data, updateData }) => {
  const addTicketTier = () => {
    const newTier = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      quantity: 0
    };
    updateData({
      ticketTiers: [...data.ticketTiers, newTier]
    });
  };

  const removeTicketTier = (id: string) => {
    updateData({
      ticketTiers: data.ticketTiers.filter(tier => tier.id !== id)
    });
  };

  const updateTicketTier = (id: string, field: keyof typeof data.ticketTiers[0], value: string | number) => {
    updateData({
      ticketTiers: data.ticketTiers.map(tier =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    });
  };

  const totalTickets = data.ticketTiers.reduce((sum, tier) => sum + tier.quantity, 0);
  const totalRevenue = data.ticketTiers.reduce((sum, tier) => sum + (tier.price * tier.quantity), 0);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Set up your ticket tiers with different pricing and quantities.
      </p>

      {/* Ticket Tiers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Ticket Tiers</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTicketTier}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Tier
          </Button>
        </div>

        {data.ticketTiers.map((tier, index) => (
          <Card key={tier.id}>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tier Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="General Admission"
                    value={tier.name}
                    onChange={(e) => updateTicketTier(tier.id, 'name', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="25.00"
                    value={tier.price || ''}
                    onChange={(e) => updateTicketTier(tier.id, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="100"
                    value={tier.quantity || ''}
                    onChange={(e) => updateTicketTier(tier.id, 'quantity', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="flex items-end">
                  {data.ticketTiers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTicketTier(tier.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-700 mb-3">Event Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{data.ticketTiers.length}</p>
              <p className="text-sm text-gray-600">Ticket Tiers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{totalTickets}</p>
              <p className="text-sm text-gray-600">Total Tickets</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Max Revenue</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: data.primaryColor }}>
                {data.templateType.charAt(0).toUpperCase() + data.templateType.slice(1)}
              </p>
              <p className="text-sm text-gray-600">Template</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Preview */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-700 mb-3">Event Preview</h3>
          <div 
            className="rounded-lg p-6 text-white"
            style={{ backgroundColor: data.primaryColor }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {data.logoUrl && (
                  <img 
                    src={data.logoUrl} 
                    alt="Logo" 
                    className="w-12 h-12 rounded-lg object-cover bg-white/20"
                  />
                )}
                <div>
                  <h4 className="text-xl font-bold">{data.eventName}</h4>
                  <p className="opacity-90 capitalize">{data.templateType} Event</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.ticketTiers.map((tier) => (
                <div key={tier.id} className="bg-white/10 rounded-lg p-4">
                  <h5 className="font-semibold">{tier.name}</h5>
                  <p className="text-lg">${tier.price}</p>
                  <p className="text-sm opacity-90">{tier.quantity} available</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketInfoStep;
