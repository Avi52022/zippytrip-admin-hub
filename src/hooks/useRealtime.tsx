
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

  // Convert table to string for safe usage
  const tableStr = table.toString();

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
            .from(tableStr)
            .select(columns.join(','));
          
          if (supabaseError) throw supabaseError;
          fetchedData = supabaseData as T[];
        }
        
        setData(fetchedData);
      } catch (err) {
        console.error(`Error fetching data from ${tableStr}:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableStr, columns.join(','), fetchFunction]);

  // Set up real-time subscription
  useEffect(() => {
    // Enable Realtime for the table if not already enabled
    const enableRealtimeForTable = async () => {
      try {
        console.log(`Enabling realtime for table: ${tableStr}`);
        await supabase.rpc('enable_realtime_for_table', { 
          table_name: tableStr
        });
      } catch (error) {
        console.warn(`Error enabling realtime for ${tableStr}:`, error);
        // Continue anyway as the table might already be enabled
      }
    };

    enableRealtimeForTable();
    
    // Create a new real-time channel
    const setupRealtimeSubscription = () => {
      if (!tableStr) return null;
      
      const channelName = `public:${tableStr}`;
      console.log(`Setting up real-time subscription to ${channelName}`);
      
      const newChannel = supabase
        .channel(channelName)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public',
          table: tableStr
        }, payload => {
          console.log(`Real-time update received for ${tableStr}:`, payload);
          
          const handleChange = async () => {
            try {
              // Fetch the latest data
              if (fetchFunction) {
                const freshData = await fetchFunction();
                setData(freshData);
              } else {
                const { data: supabaseData, error: supabaseError } = await supabase
                  .from(tableStr)
                  .select(columns.join(','));
                
                if (supabaseError) throw supabaseError;
                setData(supabaseData as T[]);
              }
            } catch (err) {
              console.error(`Error updating data after real-time event on ${tableStr}:`, err);
            }
          };
          
          handleChange();
        })
        .subscribe(status => {
          console.log(`Real-time subscription to ${tableStr} status:`, status);
        });
      
      return newChannel;
    };
    
    const newChannel = setupRealtimeSubscription();
    setChannel(newChannel);
    
    // Cleanup subscription on unmount
    return () => {
      if (newChannel) {
        console.log(`Removing real-time subscription to ${tableStr}`);
        supabase.removeChannel(newChannel);
      }
    };
  }, [tableStr, columns.join(','), fetchFunction]);

  // Expose reload function for manual refresh
  const reload = async () => {
    setLoading(true);
    try {
      let freshData: T[];
      
      if (fetchFunction) {
        freshData = await fetchFunction();
      } else {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from(tableStr)
          .select(columns.join(','));
        
        if (supabaseError) throw supabaseError;
        freshData = supabaseData as T[];
      }
      
      setData(freshData);
    } catch (err) {
      console.error(`Error reloading data from ${tableStr}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reload };
}
