
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Initialize Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");

    // Parse request body
    const { 
      ticketId, 
      recipientEmail, 
      recipientName,
      eventName,
      eventDate,
      eventLocation,
      ticketType,
      pdfBase64
    } = await req.json();
    
    if (!ticketId || !recipientEmail || !eventName || !pdfBase64) {
      throw new Error("Missing required fields");
    }

    // Convert base64 PDF to buffer for attachment
    const pdfBuffer = Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0));

    // Send email with PDF attachment
    const { data, error } = await resend.emails.send({
      from: "Tixify <tickets@tixify.app>",
      to: [recipientEmail],
      subject: `Your Tickets for ${eventName}`,
      html: `
        <div style="font-family: 'Helvetica', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #6D28D9; padding: 20px; text-align: center; color: white;">
            <h1>Your Tickets are Confirmed!</h1>
          </div>
          
          <div style="padding: 20px; background-color: white;">
            <p>Hello ${recipientName || "there"},</p>
            
            <p>Thank you for your purchase! Your tickets for <strong>${eventName}</strong> are attached to this email as a PDF.</p>
            
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Event:</strong> ${eventName}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(eventDate).toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>Location:</strong> ${eventLocation}</p>
              <p style="margin: 5px 0;"><strong>Ticket Type:</strong> ${ticketType}</p>
            </div>
            
            <p>Please bring your tickets (printed or on your mobile device) to the event. The QR code on your ticket will be scanned at entry.</p>
            
            <p>We're excited to see you there!</p>
            
            <p style="margin-top: 30px;">Best regards,<br>The Tixify Team</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Tixify. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `${eventName.replace(/\s+/g, '-')}-Ticket.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      throw new Error(`Error sending email: ${error.message}`);
    }

    // Update ticket status in database
    const { error: updateError } = await supabaseAdmin
      .from('tickets')
      .update({ status: 'emailed' })
      .eq('id', ticketId);
      
    if (updateError) {
      console.error(`Error updating ticket status: ${updateError.message}`);
      // Don't throw error here, we still want to return success since email was sent
    }

    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
