
// Define the valid table names in the database
export type ValidTableName = 'routes' | 'buses' | 'schedules' | 'bookings' | 'user_profiles';

// Utility function to validate and convert a string to a valid table name
export function asValidTableName(tableName: string): ValidTableName {
  if (
    tableName === 'routes' ||
    tableName === 'buses' ||
    tableName === 'schedules' ||
    tableName === 'bookings' ||
    tableName === 'user_profiles'
  ) {
    return tableName as ValidTableName;
  }
  throw new Error(`Invalid table name: ${tableName}`);
}

// Function to check if a string is a valid table name without throwing
export function isValidTableName(tableName: string): tableName is ValidTableName {
  return (
    tableName === 'routes' ||
    tableName === 'buses' ||
    tableName === 'schedules' ||
    tableName === 'bookings' ||
    tableName === 'user_profiles'
  );
}

// Cast a string to ValidTableName for Supabase queries
export function castToValidTableName(tableName: string): ValidTableName {
  if (isValidTableName(tableName)) {
    return tableName;
  }
  console.error(`Invalid table name: ${tableName}`);
  // Default to 'routes' or throw error depending on your error handling strategy
  return 'routes';
}
