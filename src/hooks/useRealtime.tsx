
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

// Define valid table names type based on Supabase database schema
export type TableName = keyof Database['public']['Tables'];

type FetchFunction<T> = () => Promise<T[]>;

export function useRealtime<T>(
  table: TableName,
  initialData: T[] = [],
  columns: string[] = ['*'],
  fetchFunction?: FetchFunction<T>
) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedData: T[];
        
        if (fetchFunction) {
          fetchedData = await fetchFunction();
        } else {
          const { data: supabaseData, error: supabaseError } = await supabase
            .from(table)
            .select(columns.join(','));
          
          if (supabaseError) throw supabaseError;
          fetchedData = supabaseData as T[];
        }
        
        setData(fetchedData);
      } catch (err) {
        console.error(`Error fetching data from ${table}:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, columns.join(','), fetchFunction]);

  // Set up real-time subscription
  useEffect(() => {
    // Create a new real-time channel
    const setupRealtimeSubscription = () => {
      if (!table) return null;
      
      // Fix the issue with the channel setup
      const newChannel = supabase
        .channel(`public:${table}`)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public',
          table: table 
        }, payload => {
          console.log(`Real-time update received for ${table}:`, payload);
          
          const handleChange = async () => {
            try {
              // Fetch the latest data
              if (fetchFunction) {
                const freshData = await fetchFunction();
                setData(freshData);
              } else {
                const { data: supabaseData, error: supabaseError } = await supabase
                  .from(table)
                  .select(columns.join(','));
                
                if (supabaseError) throw supabaseError;
                setData(supabaseData as T[]);
              }
            } catch (err) {
              console.error(`Error updating data after real-time event on ${table}:`, err);
            }
          };
          
          handleChange();
        })
        .subscribe(status => {
          console.log(`Real-time subscription to ${table} status:`, status);
        });
      
      return newChannel;
    };
    
    const newChannel = setupRealtimeSubscription();
    setChannel(newChannel);
    
    // Cleanup subscription on unmount
    return () => {
      if (newChannel) {
        console.log(`Removing real-time subscription to ${table}`);
        supabase.removeChannel(newChannel);
      }
    };
  }, [table, columns.join(','), fetchFunction]);

  // Expose reload function for manual refresh
  const reload = async () => {
    setLoading(true);
    try {
      let freshData: T[];
      
      if (fetchFunction) {
        freshData = await fetchFunction();
      } else {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from(table)
          .select(columns.join(','));
        
        if (supabaseError) throw supabaseError;
        freshData = supabaseData as T[];
      }
      
      setData(freshData);
    } catch (err) {
      console.error(`Error reloading data from ${table}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reload };
}
