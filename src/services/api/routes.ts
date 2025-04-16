
import { supabase } from "@/integrations/supabase/client";
import { ValidTableName, asValidTableName } from "@/utils/tableTypes";

// Type definitions
export type Route = {
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

export type RouteInsert = Omit<Route, 'id' | 'created_at' | 'updated_at'>;
export type RouteUpdate = Partial<RouteInsert>;

export const fetchRoutes = async () => {
  console.log("Fetching routes...");
  try {
    const { data, error } = await supabase
      .from(asValidTableName('routes'))
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
    .from(asValidTableName('routes'))
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
      .from(asValidTableName('routes'))
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
    .from(asValidTableName('routes'))
    .update(routeData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
};

export const deleteRoute = async (id: string) => {
  const { error } = await supabase
    .from(asValidTableName('routes'))
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};
