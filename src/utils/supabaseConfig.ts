
// Supabase configuration to share between admin and user apps
export const SUPABASE_URL = "https://aqkerdduceeghlldjdvp.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa2VyZGR1Y2VlZ2hsbGRqZHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0Mzc0MTEsImV4cCI6MjA1OTAxMzQxMX0.w_G30r8ld55JzVEKOzlhe2VIvoO1jQyYg7T5Yi2zxH8";

// Instructions for setting up user app:
/*
1. Create a new React project for your user app
2. Copy this configuration file to your user app
3. Initialize Supabase client with these values in your user app:

import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig';
import type { Database } from './types'; // You'll need to copy the types file too

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
*/
