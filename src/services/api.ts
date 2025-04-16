
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// Type definitions based on Database types
type Route = {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: number | null;
  duration: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
};

type RouteInsert = Omit<Route, 'id' | 'created_at' | 'updated_at'>;
type RouteUpdate = Partial<RouteInsert>;

type Bus = {
  id: string;
  registration_number: string;
  model: string | null;
  capacity: number;
  amenities: any | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
};

type Schedule = {
  id: string;
  route_id: string;
  bus_id: string;
  departure_time: string;
  arrival_time: string;
  fare: number;
  available_seats: number;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
  routes?: Route;
  buses?: Bus;
};

type Booking = {
  id: string;
  user_id: string;
  schedule_id: string;
  booking_date: string;
  total_fare: number;
  seat_numbers: string[];
  status: string | null;
  payment_status: string | null;
  payment_method: string | null;
  payment_id: string | null;
  created_at: string;
  updated_at: string;
  schedules?: Schedule;
};

// Routes API
export const fetchRoutes = async () => {
  console.log("Fetching routes...");
  try {
    const { data, error } = await supabase
      .from('routes' as string)
      .select('*')
      .order('name');
    
    if (error) {
      console.error("Error fetching routes:", error);
      throw error;
    }
    
    console.log("Routes fetched successfully:", data);
    return data as Route[];
  } catch (err) {
    console.error("Error in fetchRoutes:", err);
    throw err;
  }
};

export const getRoute = async (id: string) => {
  const { data, error } = await supabase
    .from('routes' as string)
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Route;
};

export const createRoute = async (routeData: RouteInsert) => {
  console.log("Creating route with data:", routeData);
  try {
    const { data, error } = await supabase
      .from('routes' as string)
      .insert(routeData)
      .select();
    
    if (error) {
      console.error("Error creating route:", error);
      throw error;
    }
    
    console.log("Route created successfully:", data);
    return data;
  } catch (err) {
    console.error("Error in createRoute:", err);
    throw err;
  }
};

export const updateRoute = async (id: string, routeData: RouteUpdate) => {
  const { data, error } = await supabase
    .from('routes' as string)
    .update(routeData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
};

export const deleteRoute = async (id: string) => {
  const { error } = await supabase
    .from('routes' as string)
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// Buses API
export const fetchBuses = async () => {
  console.log("Fetching buses...");
  try {
    const { data, error } = await supabase
      .from('buses' as string)
      .select('*')
      .order('registration_number');
    
    if (error) {
      console.error("Error fetching buses:", error);
      throw error;
    }
    
    console.log("Buses fetched successfully:", data);
    return data as Bus[];
  } catch (err) {
    console.error("Error in fetchBuses:", err);
    throw err;
  }
};

// Schedules API
export const fetchSchedules = async (date?: string) => {
  console.log("Fetching schedules for date:", date);
  try {
    let query = supabase
      .from('schedules' as string)
      .select(`
        *,
        routes (
          id,
          name,
          origin,
          destination
        ),
        buses (
          id,
          registration_number,
          model,
          capacity
        )
      `);
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      query = query
        .gte('departure_time', startOfDay.toISOString())
        .lte('departure_time', endOfDay.toISOString());
    }
    
    const { data, error } = await query.order('departure_time');
    
    if (error) {
      console.error("Error fetching schedules:", error);
      throw error;
    }
    
    console.log("Fetched schedules:", data);
    return data;
  } catch (err) {
    console.error("Error in fetchSchedules:", err);
    throw err;
  }
};

// Create new schedule
export const createSchedule = async (scheduleData: any) => {
  console.log("Creating new schedule with data:", scheduleData);
  try {
    const { data, error } = await supabase
      .from('schedules' as string)
      .insert(scheduleData)
      .select();
    
    if (error) {
      console.error("Error creating schedule:", error);
      throw error;
    }
    
    console.log("Schedule created successfully:", data);
    return data;
  } catch (err) {
    console.error("Error in createSchedule:", err);
    throw err;
  }
};

// Bookings API
export const fetchBookings = async () => {
  const { data, error } = await supabase
    .from('bookings' as string)
    .select(`
      *,
      schedules (
        id,
        departure_time,
        arrival_time,
        routes (
          id,
          name,
          origin,
          destination
        ),
        buses (
          id,
          registration_number,
          model
        )
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getUserBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from('bookings' as string)
    .select(`
      *,
      schedules (
        id,
        departure_time,
        arrival_time,
        routes (
          id,
          name,
          origin,
          destination
        ),
        buses (
          id,
          registration_number,
          model
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const processBooking = async (bookingData: {
  scheduleId: string;
  userId: string;
  seatNumbers: string[];
  totalFare: number;
  paymentMethod: string;
}) => {
  const { scheduleId, userId, seatNumbers, totalFare, paymentMethod } = bookingData;
  
  try {
    const response = await supabase.functions.invoke('process-booking', {
      body: { scheduleId, userId, seatNumbers, totalFare, paymentMethod }
    });
    
    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    console.error('Error processing booking:', error);
    throw error;
  }
};

// Function to enable realtime for a table
export const enableRealtimeForTable = async (tableName: string) => {
  try {
    // First, make the table replica identity full to get complete data in changes
    const { error: replicaError } = await supabase.rpc(
      'set_replica_identity_full', 
      { table_name: tableName.toString() }
    );
    
    if (replicaError) {
      console.warn(`Error setting replica identity for ${tableName}:`, replicaError);
    }
    
    // Then add the table to the realtime publication
    const { error } = await supabase.rpc(
      'add_table_to_publication', 
      { table_name: tableName.toString() }
    );
    
    if (error) {
      console.warn(`Error adding ${tableName} to realtime publication:`, error);
      return false;
    }
    
    console.log(`Realtime enabled for table: ${tableName}`);
    return true;
  } catch (err) {
    console.error(`Error enabling realtime for ${tableName}:`, err);
    return false;
  }
};

// Enable real-time updates for tables
export const enableRealtimeUpdates = () => {
  return supabase
    .channel('schema-db-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'routes' }, payload => {
      console.log('Routes change received!', payload);
      return payload;
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'buses' }, payload => {
      console.log('Buses change received!', payload);
      return payload;
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'schedules' }, payload => {
      console.log('Schedules change received!', payload);
      return payload;
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, payload => {
      console.log('Bookings change received!', payload);
      return payload;
    })
    .subscribe();
};
