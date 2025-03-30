
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route as RouterRoute, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RoutesPage from "./pages/Routes";
import Schedule from "./pages/Schedule";
import Fleet from "./pages/Fleet";
import Analytics from "./pages/Analytics";
import RouteDetail from "./pages/RouteDetail";
import AddRoute from "./pages/AddRoute";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import EditRoute from "./pages/EditRoute";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <RouterRoute path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Login />
      } />
      
      <RouterRoute path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <RouterRoute index element={<Dashboard />} />
        <RouterRoute path="routes" element={<RoutesPage />} />
        <RouterRoute path="routes/add" element={<AddRoute />} />
        <RouterRoute path="routes/:id" element={<RouteDetail />} />
        <RouterRoute path="routes/edit/:id" element={<EditRoute />} />
        <RouterRoute path="schedule" element={<Schedule />} />
        <RouterRoute path="fleet" element={<Fleet />} />
        <RouterRoute path="analytics" element={<Analytics />} />
        <RouterRoute path="settings" element={<Settings />} />
      </RouterRoute>
      
      <RouterRoute path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
