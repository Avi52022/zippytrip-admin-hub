
import { supabase } from "@/integrations/supabase/client";
import { Route } from "./routes";
import { Bus } from "./buses";

// Type definitions
export type Schedule = {
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
  cancelled_at: string | null;
  cancellation_reason: string | null;
};

// Enhanced types that include related data
export type ScheduleWithRelations = Schedule & {
  routes?: Route;
  buses?: Bus;
};

export type ScheduleInsert = Omit<Schedule, 'id' | 'created_at' | 'updated_at' | 'routes' | 'buses' | 'cancelled_at' | 'cancellation_reason'>;
export type ScheduleUpdate = Partial<Omit<Schedule, 'id' | 'created_at' | 'updated_at' | 'routes' | 'buses'>>;

export const fetchSchedules = async (date?: string) => {
  console.log("Fetching schedules for date:", date);
  try {
    let query = supabase
      .from('schedules')
      .select(`
        *,
        routes (*),
        buses (*)
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
    return data as ScheduleWithRelations[];
  } catch (err) {
    console.error("Error in fetchSchedules:", err);
    throw err;
  }
};

export const getSchedule = async (id: string) => {
  const { data, error } = await supabase
    .from('schedules')
    .select(`
      *,
      routes (*),
      buses (*)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createSchedule = async (scheduleData: ScheduleInsert) => {
  console.log("Creating new schedule with data:", scheduleData);
  try {
    const { data, error } = await supabase
      .from('schedules')
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

export const updateSchedule = async (id: string, scheduleData: ScheduleUpdate) => {
  const { data, error } = await supabase
    .from('schedules')
    .update(scheduleData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
};

export const deleteSchedule = async (id: string) => {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

export const cancelSchedule = async (scheduleId: string, reason: string) => {
  try {
    // Update the schedule directly instead of calling an edge function
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('schedules')
      .update({
        is_active: false,
        cancelled_at: now,
        cancellation_reason: reason
      })
      .eq('id', scheduleId)
      .select();

    if (error) throw error;
    
    // Create a notification record for this cancellation
    await supabase
      .from('cancellation_notifications')
      .insert({
        schedule_id: scheduleId,
        notification_type: 'schedule_cancellation',
        status: 'pending'
      });
      
    return data;
  } catch (error) {
    console.error('Error cancelling schedule:', error);
    throw error;
  }
};
