
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex dark bg-zippy-dark">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
          <footer className="p-4 border-t border-zippy-gray text-sm text-gray-500 text-center">
            <p>© {new Date().getFullYear()} ZippyTrip. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
