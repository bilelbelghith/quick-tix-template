
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Download, MapPin, Clock, CheckCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { generateTicketPDF } from '@/utils/generateTicket';

interface TicketData {
  id: string;
  event_id: string;
  ticket_tier_id: string;
  quantity: number;
  total_price: number;
  customer_email: string;
  customer_name: string;
  created_at: string;
  events: {
    name: string;
    date: string;
    location: string;
    logo_url: string | null;
    primary_color: string;
  };
  ticket_tiers: {
    name: string;
    price: number;
  };
}

const TicketConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const ticketId = searchParams.get('ticket_id');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchTicketData = async () => {
      if (!ticketId && !sessionId) {
        toast({
          variant: "destructive",
          title: "Invalid confirmation",
          description: "No ticket information found.",
        });
        navigate('/');
        return;
      }

      try {
        let query = supabase
          .from('tickets')
          .select(`
            *,
            events (name, date, location, logo_url, primary_color),
            ticket_tiers (name, price)
          `);

        if (ticketId) {
          query = query.eq('id', ticketId);
        } else if (sessionId) {
          query = query.eq('stripe_session_id', sessionId);
        }

        const { data, error } = await query.single();

        if (error) throw error;
        
        setTicket(data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        toast({
          variant: "destructive",
          title: "Error loading ticket",
          description: "Unable to load your ticket information.",
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicketData();
  }, [ticketId, sessionId, toast, navigate]);

  const handleDownloadTicket = async () => {
    if (!ticket) return;
    
    setIsDownloading(true);
    try {
      const pdfBlob = await generateTicketPDF({
        eventName: ticket.events.name,
        eventDate: new Date(ticket.events.date),
        eventLocation: ticket.events.location,
        ticketType: ticket.ticket_tiers.name,
        attendeeName: ticket.customer_name,
        attendeeEmail: ticket.customer_email,
        ticketId: ticket.id,
        organizerLogo: ticket.events.logo_url || undefined,
        primaryColor: ticket.events.primary_color
      });

      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${ticket.events.name.replace(/\s+/g, '-')}-ticket.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Ticket downloaded",
        description: "Your ticket PDF has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error downloading ticket:', error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Unable to download ticket. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddToCalendar = () => {
    if (!ticket) return;

    const event = ticket.events;
    const eventDate = new Date(event.date);
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${formatDate(eventDate)}/${formatDate(endDate)}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(`Ticket Type: ${ticket.ticket_tiers.name}\nQuantity: ${ticket.quantity}\nTicket ID: ${ticket.id}`)}`;

    window.open(calendarUrl, '_blank');
  };

  const handleShare = () => {
    const shareText = `I just got tickets to ${ticket?.events.name}! 🎟️`;
    
    if (navigator.share) {
      navigator.share({
        title: ticket?.events.name,
        text: shareText,
        url: window.location.origin
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}`);
      toast({
        title: "Link copied",
        description: "Event link copied to clipboard!",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Ticket Not Found</h1>
            <p className="mt-2 text-muted-foreground">Unable to load ticket information.</p>
          </div>
        </div>
      </div>
    );
  }

  const event = ticket.events;
  const eventDate = new Date(event.date);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Ticket Confirmed!</h1>
              <p className="text-muted-foreground">
                Your ticket for {event.name} has been confirmed
              </p>
            </motion.div>

            {/* Ticket Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="mb-6">
                <CardHeader style={{ backgroundColor: `${event.primary_color}10` }}>
                  <CardTitle className="flex items-center justify-between">
                    <span>{event.name}</span>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      {event.logo_url ? (
                        <img 
                          src={event.logo_url} 
                          alt="Event logo" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold" style={{ color: event.primary_color }}>
                          {event.name.substring(0, 2)}
                        </span>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Event Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {format(eventDate, 'EEEE, MMMM d, yyyy')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(eventDate, 'h:mm a')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">{event.location}</div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="text-sm font-medium mb-2">Ticket Details</div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>Type: {ticket.ticket_tiers.name}</div>
                          <div>Quantity: {ticket.quantity}</div>
                          <div>Total: ${ticket.total_price.toFixed(2)}</div>
                          <div>Ticket ID: {ticket.id}</div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="text-sm font-medium mb-2">Attendee</div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>{ticket.customer_name}</div>
                          <div>{ticket.customer_email}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4">
                        <QRCodeDisplay
                          data={JSON.stringify({
                            ticketId: ticket.id,
                            eventName: event.name,
                            attendee: ticket.customer_name,
                            email: ticket.customer_email,
                          })}
                          size={200}
                          primaryColor={event.primary_color}
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        Show this QR code at the event entrance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
            >
              <Button
                onClick={handleDownloadTicket}
                disabled={isDownloading}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? 'Downloading...' : 'Download PDF'}
              </Button>
              
              <Button
                onClick={handleAddToCalendar}
                variant="outline"
                className="w-full"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Event
              </Button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-muted-foreground"
            >
              <p>
                A confirmation email has been sent to {ticket.customer_email}
              </p>
              <p className="mt-2">
                Keep this confirmation safe - you'll need it to enter the event
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;
