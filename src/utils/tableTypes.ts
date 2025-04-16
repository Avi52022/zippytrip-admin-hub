
import { Database } from '@/integrations/supabase/types';

// Type for valid table names from the Database type
export type ValidTableName = keyof Database['public']['Tables'];

// Function to safely cast a string to a valid table name
export const asValidTableName = (tableName: string): ValidTableName => {
  // Validate that the tableName is actually a valid table name
  const validTables: ValidTableName[] = ['routes', 'buses', 'schedules', 'bookings', 'user_profiles'];
  if (!validTables.includes(tableName as ValidTableName)) {
    console.warn(`Warning: '${tableName}' is not a recognized table name. This may cause runtime errors.`);
  }
  return tableName as ValidTableName;
};

// Type guard to check if a value is a valid table name
export const isValidTableName = (value: string): value is ValidTableName => {
  const validTables: ValidTableName[] = ['routes', 'buses', 'schedules', 'bookings', 'user_profiles'];
  return validTables.includes(value as ValidTableName);
};
