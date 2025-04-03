import { NavLink } from "react-router-dom";
import { BarChart, Bus, Calendar, MapPin, Route, Settings, Users } from "lucide-react";
import { Sidebar as SidebarWrapper, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar";
const Sidebar = () => {
  const menuItems = [{
    id: 1,
    label: "Dashboard",
    icon: <BarChart size={20} />,
    path: "/"
  }, {
    id: 2,
    label: "Routes",
    icon: <Route size={20} />,
    path: "/routes"
  }, {
    id: 3,
    label: "Schedule",
    icon: <Calendar size={20} />,
    path: "/schedule"
  }, {
    id: 4,
    label: "Fleet",
    icon: <Bus size={20} />,
    path: "/fleet"
  }, {
    id: 5,
    label: "Analytics",
    icon: <BarChart size={20} />,
    path: "/analytics"
  }, {
    id: 6,
    label: "Settings",
    icon: <Settings size={20} />,
    path: "/settings"
  }];
  return;
};
export default Sidebar;