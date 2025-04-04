
export interface TicketTier {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export interface EventData {
  id?: string;
  title: string;
  description: string;
  date: Date | string;
  time?: string;
  location: string;
  isOnline?: boolean;
  organizerName?: string;
  organizerDescription?: string;
  capacity?: number;
  ticketTiers: TicketTier[];
  coverImage?: string;
  logoImage?: string;
  primaryColor?: string;
  templateType?: 'standard' | 'concert' | 'workshop' | 'sports';
  // Additional fields specific to template types
  performers?: string[];
  venue?: string;
  speakers?: string[];
  topics?: string[];
  teams?: string[];
  sportsType?: string;
  slug?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
