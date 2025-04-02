
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type SupabaseTable = 'routes' | 'buses' | 'schedules' | 'bookings';
type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

export function useRealtime<T>(
  table: SupabaseTable, 
  initialData: T[] = [], 
  events: RealtimeEvent[] = ['*'],
  fetchFunction?: () => Promise<T[]>
) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      if (!fetchFunction) return;
      try {
        setLoading(true);
        const fetchedData = await fetchFunction();
        setData(fetchedData);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${table} data:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, fetchFunction]);

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase.channel(`public:${table}`);
    
    // Add listeners for all specified events
    events.forEach(event => {
      if (event === '*') {
        channel.on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table 
        }, async (payload) => {
          if (fetchFunction) {
            // Re-fetch all data to ensure consistency
            try {
              const freshData = await fetchFunction();
              setData(freshData);
              toast({
                title: `New ${table.slice(0, -1)} added`,
                description: "The data has been updated."
              });
            } catch (err) {
              console.error(`Error re-fetching ${table} data:`, err);
            }
          }
        });

        channel.on('postgres_changes', { 
          event: 'UPDATE', 
          schema: 'public', 
          table 
        }, async (payload) => {
          if (fetchFunction) {
            // Re-fetch all data to ensure consistency
            try {
              const freshData = await fetchFunction();
              setData(freshData);
              toast({
                title: `${table.slice(0, -1)} updated`,
                description: "The data has been updated."
              });
            } catch (err) {
              console.error(`Error re-fetching ${table} data:`, err);
            }
          }
        });

        channel.on('postgres_changes', { 
          event: 'DELETE', 
          schema: 'public', 
          table 
        }, async (payload) => {
          if (fetchFunction) {
            // Re-fetch all data to ensure consistency
            try {
              const freshData = await fetchFunction();
              setData(freshData);
              toast({
                title: `${table.slice(0, -1)} deleted`,
                description: "The data has been updated."
              });
            } catch (err) {
              console.error(`Error re-fetching ${table} data:`, err);
            }
          }
        });
      } else {
        channel.on('postgres_changes', { 
          event, 
          schema: 'public', 
          table 
        }, async (payload) => {
          if (fetchFunction) {
            // Re-fetch all data to ensure consistency
            try {
              const freshData = await fetchFunction();
              setData(freshData);
              toast({
                title: `${table.slice(0, -1)} ${event.toLowerCase()}ed`,
                description: "The data has been updated."
              });
            } catch (err) {
              console.error(`Error re-fetching ${table} data:`, err);
            }
          }
        });
      }
    });
    
    // Subscribe to the channel
    channel.subscribe((status) => {
      if (status !== 'SUBSCRIBED') {
        console.log(`Realtime subscription to ${table} status:`, status);
      }
    });
    
    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, events, fetchFunction, toast]);
  
  return { data, loading, error, setData };
}
