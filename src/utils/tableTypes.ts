
import { Database } from '@/integrations/supabase/types';

// Type for valid table names from the Database type
export type ValidTableName = keyof Database['public']['Tables'];

// Function to safely cast a string to a valid table name
export const asValidTableName = (tableName: string): ValidTableName => {
  return tableName as ValidTableName;
};
