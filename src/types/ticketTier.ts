
export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description?: string;
  quantity: number;
  available: number;
}
