export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          capacity: number
          contact_email: string | null
          cover_image_url: string | null
          created_at: string | null
          date: string
          description: string | null
          event_time: string | null
          id: string
          is_online: boolean | null
          location: string
          logo_url: string | null
          metadata: Json | null
          name: string
          organizer_id: string
          organizer_name: string | null
          primary_color: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          template_id: string
          updated_at: string
        }
        Insert: {
          capacity?: number
          contact_email?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          event_time?: string | null
          id?: string
          is_online?: boolean | null
          location: string
          logo_url?: string | null
          metadata?: Json | null
          name: string
          organizer_id: string
          organizer_name?: string | null
          primary_color?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          template_id: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          contact_email?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          event_time?: string | null
          id?: string
          is_online?: boolean | null
          location?: string
          logo_url?: string | null
          metadata?: Json | null
          name?: string
          organizer_id?: string
          organizer_name?: string | null
          primary_color?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          template_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      ticket_tiers: {
        Row: {
          available: number
          created_at: string | null
          description: string | null
          event_id: string
          id: string
          name: string
          price: number
          quantity: number
        }
        Insert: {
          available: number
          created_at?: string | null
          description?: string | null
          event_id: string
          id?: string
          name: string
          price?: number
          quantity: number
        }
        Update: {
          available?: number
          created_at?: string | null
          description?: string | null
          event_id?: string
          id?: string
          name?: string
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "ticket_tiers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_name: string
          event_id: string
          id: string
          qr_code: string | null
          quantity: number
          status: string
          ticket_tier_id: string
          total_price: number
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_name: string
          event_id: string
          id?: string
          qr_code?: string | null
          quantity: number
          status?: string
          ticket_tier_id: string
          total_price: number
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          event_id?: string
          id?: string
          qr_code?: string | null
          quantity?: number
          status?: string
          ticket_tier_id?: string
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_ticket_tier_id_fkey"
            columns: ["ticket_tier_id"]
            isOneToOne: false
            referencedRelation: "ticket_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
