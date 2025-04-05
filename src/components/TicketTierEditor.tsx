import React from 'react';
import { Plus, Trash2, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { TicketTier } from '@/types/ticketTier';

interface TicketTierEditorProps {
  ticketTiers: TicketTier[];
  onAddTier: () => void;
  onUpdateTier: (index: number, tier: TicketTier) => void;
  onRemoveTier: (index: number) => void;
}

const TicketTierEditor = ({ ticketTiers, onAddTier, onUpdateTier, onRemoveTier }: TicketTierEditorProps) => {
  const updateTier = (index: number, field: keyof TicketTier, value: string | number) => {
    const newTier = { ...ticketTiers[index] };
    
    if (field === 'price' || field === 'quantity' || field === 'available') {
      newTier[field] = typeof value === 'string' ? parseFloat(value) || 0 : value;
      
      // Keep available in sync with quantity when changing quantity
      if (field === 'quantity') {
        newTier.available = newTier.quantity;
      }
    } else if (field === 'name' || field === 'description') {
      newTier[field] = value as string;
    }
    
    onUpdateTier(index, newTier);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Ticket Tiers</h3>
        <Button 
          onClick={onAddTier} 
          variant="outline" 
          size="sm" 
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Tier
        </Button>
      </div>

      {ticketTiers.length === 0 && (
        <div className="p-8 text-center border rounded-md bg-muted/30">
          <p className="text-muted-foreground mb-4">No ticket tiers added yet</p>
          <Button onClick={onAddTier} variant="outline">Add Your First Ticket Tier</Button>
        </div>
      )}

      {ticketTiers.map((tier, index) => (
        <Card key={tier.id || index} className="relative hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="absolute top-2 right-2">
              <Button 
                onClick={() => onRemoveTier(index)} 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                disabled={ticketTiers.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium">Tier Name</label>
                <Input
                  value={tier.name}
                  onChange={(e) => updateTier(index, 'name', e.target.value)}
                  placeholder="e.g., General Admission, VIP..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tier.price}
                    onChange={(e) => updateTier(index, 'price', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Quantity</label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={tier.quantity}
                    onChange={(e) => updateTier(index, 'quantity', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={tier.description || ''}
                  onChange={(e) => updateTier(index, 'description', e.target.value)}
                  placeholder="Describe what's included with this ticket tier"
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TicketTierEditor;
