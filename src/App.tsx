
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Routes from "./pages/Routes";
import Schedule from "./pages/Schedule";
import Fleet from "./pages/Fleet";
import Analytics from "./pages/Analytics";
import RouteDetail from "./pages/RouteDetail";
import AddRoute from "./pages/AddRoute";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="routes" element={<Routes />} />
            <Route path="routes/add" element={<AddRoute />} />
            <Route path="routes/:id" element={<RouteDetail />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
