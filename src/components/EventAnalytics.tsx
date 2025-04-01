
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsProps {
  eventId: string;
}

interface TicketSale {
  date: string;
  count: number;
  revenue: number;
}

interface ReferralSource {
  source: string;
  count: number;
}

const EventAnalytics: React.FC<AnalyticsProps> = ({ eventId }) => {
  const [ticketSales, setTicketSales] = useState<TicketSale[]>([]);
  const [referralSources, setReferralSources] = useState<ReferralSource[]>([]);
  const [totalSold, setTotalSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch ticket sales data grouped by date
        const { data: salesData, error: salesError } = await supabase
          .from('tickets')
          .select('created_at, quantity, total_price')
          .eq('event_id', eventId)
          .order('created_at', { ascending: false });

        if (salesError) throw salesError;

        // Process sales data
        const salesByDate: Record<string, { count: number; revenue: number }> = {};
        let ticketTotal = 0;
        let revenueTotal = 0;

        salesData?.forEach(sale => {
          const date = new Date(sale.created_at).toISOString().split('T')[0];
          if (!salesByDate[date]) {
            salesByDate[date] = { count: 0, revenue: 0 };
          }
          salesByDate[date].count += sale.quantity;
          salesByDate[date].revenue += Number(sale.total_price);
          ticketTotal += sale.quantity;
          revenueTotal += Number(sale.total_price);
        });

        // Convert to array for chart
        const salesArray: TicketSale[] = Object.keys(salesByDate).map(date => ({
          date,
          count: salesByDate[date].count,
          revenue: salesByDate[date].revenue
        }));

        // Mock referral data (in a real app, this would come from the database)
        const mockReferralData: ReferralSource[] = [
          { source: 'Direct', count: Math.floor(ticketTotal * 0.6) },
          { source: 'Social', count: Math.floor(ticketTotal * 0.25) },
          { source: 'Embed', count: Math.floor(ticketTotal * 0.15) }
        ];

        setTicketSales(salesArray);
        setReferralSources(mockReferralData);
        setTotalSold(ticketTotal);
        setTotalRevenue(revenueTotal);

        // Set up real-time subscription for ticket sales
        const channel = supabase
          .channel('sales-updates')
          .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'tickets',
            filter: `event_id=eq.${eventId}`
          }, (payload) => {
            // Update totals when new tickets are sold
            const newSale = payload.new;
            setTotalSold(prev => prev + newSale.quantity);
            setTotalRevenue(prev => prev + Number(newSale.total_price));
            
            toast({
              title: "New ticket sale!",
              description: `${newSale.quantity} tickets just purchased.`,
            });
          })
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast({
          variant: "destructive",
          title: "Failed to load analytics",
          description: "Please try refreshing the page.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchAnalytics();
    }
  }, [eventId, toast]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Ticket Sales</h3>
            {isLoading ? (
              <Skeleton className="h-[150px] w-full" />
            ) : (
              <div>
                <div className="text-3xl font-bold text-purple-600">{totalSold}</div>
                <p className="text-sm text-muted-foreground">Total tickets sold</p>
                <div className="h-[150px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ticketSales}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} tickets`, 'Sales']} />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Revenue</h3>
            {isLoading ? (
              <Skeleton className="h-[150px] w-full" />
            ) : (
              <div>
                <div className="text-3xl font-bold text-purple-600">{formatCurrency(totalRevenue)}</div>
                <p className="text-sm text-muted-foreground">Total revenue</p>
                <div className="h-[150px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ticketSales}>
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                      <Bar dataKey="revenue" fill="#6D28D9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Referral Sources</h3>
          {isLoading ? (
            <Skeleton className="h-[150px] w-full" />
          ) : (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={referralSources} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="source" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value} tickets`, 'Sold via']} />
                  <Bar dataKey="count" fill="#6D28D9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventAnalytics;
