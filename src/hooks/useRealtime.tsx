
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { ValidTableName, asValidTableName } from '@/utils/tableTypes';

type FetchFunction<T> = () => Promise<T[]>;

export function useRealtime<T>(
  table: ValidTableName | string,
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
          // Use the utility function to ensure type safety
          const validTableName = asValidTableName(table.toString());
          
          const { data: supabaseData, error: supabaseError } = await supabase
            .from(validTableName)
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
    // Enable Realtime for the table if not already enabled
    const enableRealtimeForTable = async () => {
      try {
        console.log(`Enabling realtime for table: ${table}`);
        await supabase.rpc('enable_realtime_for_table', { 
          table_name: table.toString() 
        });
      } catch (error) {
        console.warn(`Error enabling realtime for ${table}:`, error);
        // Continue anyway as the table might already be enabled
      }
    };

    enableRealtimeForTable();
    
    // Create a new real-time channel
    const setupRealtimeSubscription = () => {
      if (!table) return null;
      
      const channelName = `public:${table}`;
      console.log(`Setting up real-time subscription to ${channelName}`);
      
      const newChannel = supabase
        .channel(channelName)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public',
          table: table.toString()
        }, payload => {
          console.log(`Real-time update received for ${table}:`, payload);
          
          const handleChange = async () => {
            try {
              // Fetch the latest data
              if (fetchFunction) {
                const freshData = await fetchFunction();
                setData(freshData);
              } else {
                const validTableName = asValidTableName(table.toString());
                
                const { data: supabaseData, error: supabaseError } = await supabase
                  .from(validTableName)
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
        const validTableName = asValidTableName(table.toString());
        
        const { data: supabaseData, error: supabaseError } = await supabase
          .from(validTableName)
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
