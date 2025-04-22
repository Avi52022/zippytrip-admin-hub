
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useTheme } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import BookingNotifications from "@/components/BookingNotifications";

const Layout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen w-full flex ${theme === "dark" ? "dark" : "light"}`}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 p-6 overflow-auto">
              <Outlet />
            </main>
            <footer className="bg-white shadow dark:bg-gray-800 dark:text-gray-200">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                  © {new Date().getFullYear()} ZippyTrip. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </SidebarProvider>
      <Toaster />
      <BookingNotifications />
    </div>
  );
};

export default Layout;
