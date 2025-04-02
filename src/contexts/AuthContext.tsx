
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { enableRealtimeUpdates } from "@/services/api";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [realtimeChannel, setRealtimeChannel] = useState<ReturnType<typeof enableRealtimeUpdates> | null>(null);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      
      // Enable real-time updates when authenticated
      const channel = enableRealtimeUpdates();
      setRealtimeChannel(channel);
    }
    
    return () => {
      // Clean up channel on unmount
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
      }
    };
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === "admin" && password === "zippytrip123") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      
      // Enable real-time updates on login
      const channel = enableRealtimeUpdates();
      setRealtimeChannel(channel);
      
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    
    // Clean up real-time subscription on logout
    if (realtimeChannel) {
      supabase.removeChannel(realtimeChannel);
      setRealtimeChannel(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
