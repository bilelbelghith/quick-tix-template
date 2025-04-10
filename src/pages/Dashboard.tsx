import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Ticket, DollarSign, Edit, Eye, Loader2, Share2, QrCode } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import EventAnalytics from '@/components/EventAnalytics';
import QRScanner from '@/components/QRScanner';
import TestSuite from '@/components/TestSuite';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  template_id: string;
  slug: string;
  published: boolean;
}

interface EventWithStats extends Event {
  ticketsSold: number;
}

interface DashboardStats {
  totalEvents: number;
  ticketsSold: number;
  revenue: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<EventWithStats[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    ticketsSold: 0,
    revenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        navigate('/login');
        return;
      }
      
      fetchDashboardData();
    };
    
    checkAuth();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      const userId = userData.user?.id;
      if (!userId) {
        navigate('/login');
        return;
      }
      
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', userId)
        .order('created_at', { ascending: false });
      
      if (eventsError) throw eventsError;
      
      const eventPromises = eventsData.map(async (event) => {
        const { data: ticketsData, error: ticketsError } = await supabase
          .from('tickets')
          .select('ticket_tier_id, quantity')
          .eq('event_id', event.id);
        
        if (ticketsError) {
          console.error('Error fetching tickets for event', event.id, ticketsError);
          return {
            ...event,
            ticketsSold: 0
          };
        }
        
        const ticketsSold = ticketsData?.reduce((acc, ticket) => acc + ticket.quantity, 0) || 0;
        
        return {
          ...event,
          ticketsSold
        };
      });
      
      const eventsWithStats = await Promise.all(eventPromises);
      setEvents(eventsWithStats);
      
      const totalEvents = eventsWithStats.length;
      const totalTicketsSold = eventsWithStats.reduce((acc, event) => acc + event.ticketsSold, 0);
      
      let totalRevenue = 0;
      
      for (const event of eventsWithStats) {
        const { data: tiersData, error: tiersError } = await supabase
          .from('ticket_tiers')
          .select('id, price')
          .eq('event_id', event.id);
        
        if (tiersError) {
          console.error('Error fetching tiers for event', event.id, tiersError);
          continue;
        }
        
        const { data: ticketsData, error: ticketsError } = await supabase
          .from('tickets')
          .select('ticket_tier_id, quantity')
          .eq('event_id', event.id);
        
        if (ticketsError) {
          console.error('Error fetching tickets for event', event.id, ticketsError);
          continue;
        }
        
        for (const ticket of ticketsData || []) {
          const tier = tiersData?.find(t => t.id === ticket.ticket_tier_id);
          if (tier) {
            totalRevenue += tier.price * ticket.quantity;
          }
        }
      }
      
      setStats({
        totalEvents,
        ticketsSold: totalTicketsSold,
        revenue: totalRevenue,
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        variant: "destructive",
        title: "Error loading dashboard",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600" />
          <p className="mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Organizer Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                    <h3 className="text-3xl font-bold mt-2">{stats.totalEvents}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tickets Sold</p>
                    <h3 className="text-3xl font-bold mt-2">{stats.ticketsSold}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Ticket className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <h3 className="text-3xl font-bold mt-2 text-purple-600">${stats.revenue.toFixed(2)}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="events" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="events">Your Events</TabsTrigger>
            <TabsTrigger value="analytics" disabled={!selectedEvent}>Analytics</TabsTrigger>
            <TabsTrigger value="validation" disabled={!selectedEvent}>Validation</TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="events">
          <Card className="shadow-md">
            <CardHeader className="bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Events</h2>
                <Button
                  onClick={() => navigate('/onboarding')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Create New Event
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {events.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">You haven't created any events yet.</p>
                  <Button 
                    onClick={() => navigate('/onboarding')} 
                    variant="outline" 
                    className="mt-4"
                  >
                    Create Your First Event
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Tickets Sold</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow 
                        key={event.id} 
                        className={selectedEvent === event.id ? "bg-purple-50" : ""}
                        onClick={() => {
                          setSelectedEvent(event.id);
                          setActiveTab("analytics");
                        }}
                      >
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell className="capitalize">{event.template_id}</TableCell>
                        <TableCell>{event.ticketsSold}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {event.published ? 'Published' : 'Draft'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {event.published && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(event.id);
                                  setShowQRScanner(true);
                                }}
                              >
                                <QrCode className="h-4 w-4 mr-1" />
                                Scan
                              </Button>
                            )}
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/${event.template_id}/customize?id=${event.id}`);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>

                            {!event.published ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/events/${event.id}/publish`);
                                }}
                                className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                              >
                                <Share2 className="h-4 w-4 mr-1" />
                                Publish
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  try {
                                    const { data: userData, error: userError } = await supabase.auth.getUser();
                                    if (userError) throw userError;
                                    
                                    const userId = userData.user?.id;
                                    if (!userId) {
                                      console.error("No user ID found");
                                      return;
                                    }
                                    
                                    const { data: profileData, error } = await supabase
                                      .from('profiles')
                                      .select('username')
                                      .eq('id', userId)
                                      .single();
                                    
                                    if (error || !profileData) {
                                      console.error("Error fetching profile:", error);
                                      const username = userData.user?.email?.split('@')[0] || userId;
                                      navigate(`/${username}/${event.slug}`);
                                    } else {
                                      navigate(`/${profileData.username}/${event.slug}`);
                                    }
                                  } catch (err) {
                                    console.error("Navigation error:", err);
                                  }
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          {selectedEvent ? (
            <EventAnalytics eventId={selectedEvent} />
          ) : (
            <div className="text-center py-10">
              <p>Select an event to view analytics</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="validation">
          {selectedEvent ? (
            <TestSuite eventId={selectedEvent} />
          ) : (
            <div className="text-center py-10">
              <p>Select an event to run validation tests</p>
            </div>
          )}
        </TabsContent>
      </div>

      {showQRScanner && selectedEvent && (
        <QRScanner 
          open={showQRScanner}
          onClose={() => setShowQRScanner(false)}
          eventId={selectedEvent}
        />
      )}
    </div>
  );
};

export default Dashboard;
