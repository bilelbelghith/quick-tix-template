
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { ticketTierId, quantity } = await req.json();
    
    // First, verify available tickets
    const { data: tierData, error: tierError } = await supabaseClient
      .from('ticket_tiers')
      .select('available')
      .eq('id', ticketTierId)
      .single();
    
    if (tierError) throw tierError;
    
    if (tierData.available < quantity) {
      return new Response(
        JSON.stringify({ 
          error: 'Not enough tickets available',
          available: tierData.available
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Update available tickets
    const { error: updateError } = await supabaseClient
      .from('ticket_tiers')
      .update({ available: tierData.available - quantity })
      .eq('id', ticketTierId);
    
    if (updateError) throw updateError;
    
    return new Response(
      JSON.stringify({ success: true, remainingTickets: tierData.available - quantity }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error decreasing tickets:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
