
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  jobTitle?: string;
  bio?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => false,
  logout: () => {},
  updateUserProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored).isAuthenticated : false;
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored).user : null;
  });

  const login = (username: string, password: string): boolean => {
    // For demo purposes - in a real app this would be a proper auth check
    if (username === "admin" && password === "admin") {
      const userData = {
        id: "1",
        username: "admin",
        email: "admin@zippytrip.com",
        firstName: "Admin",
        lastName: "User",
        phone: "+1 (555) 123-4567",
        jobTitle: "Fleet Manager",
        bio: "I manage the fleet operations and route scheduling for ZippyTrip"
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem("auth", JSON.stringify({
        isAuthenticated: true,
        user: userData
      }));
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem("auth", JSON.stringify({
        isAuthenticated,
        user: updatedUser
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
