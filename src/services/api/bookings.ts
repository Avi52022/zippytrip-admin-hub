import { supabase } from "@/integrations/supabase/client";
import { ValidTableName, asValidTableName, fromSafeTable } from "@/utils/tableTypes";
import { Schedule, ScheduleWithRelations } from "./schedules";

// Type definitions
export type Booking = {
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
};

// Enhanced type with related data
export type BookingWithRelations = Booking & {
  schedules?: ScheduleWithRelations;
};

export type BookingInsert = Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'schedules'>;
export type BookingUpdate = Partial<BookingInsert>;

export const fetchBookings = async (): Promise<BookingWithRelations[]> => {
  const safeTable = fromSafeTable('bookings');
  const { data, error } = await supabase
    .from(safeTable)
    .select(`
      *,
      schedules (
        *,
        routes (
          *
        ),
        buses (
          *
        )
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as BookingWithRelations[];
};

export const getUserBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from(asValidTableName('bookings'))
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

export const getBooking = async (id: string) => {
  const { data, error } = await supabase
    .from(asValidTableName('bookings'))
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
    .eq('id', id)
    .single();
  
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

export const updateBooking = async (id: string, bookingData: BookingUpdate) => {
  const { data, error } = await supabase
    .from(asValidTableName('bookings'))
    .update(bookingData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
};

export const deleteBooking = async (id: string) => {
  const { error } = await supabase
    .from(asValidTableName('bookings'))
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};
