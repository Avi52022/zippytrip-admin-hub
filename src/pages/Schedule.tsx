
import { useState, useEffect } from "react";
import { Filter, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { format } from "date-fns";
import { fetchSchedules } from "@/services/api";
import { useRealtime } from "@/hooks/useRealtime";
import AddScheduleModal from "@/components/AddScheduleModal";
import { ScheduleStats } from "@/components/schedule/ScheduleStats";
import { ScheduleFilters } from "@/components/schedule/ScheduleFilters";
import { ScheduleTable } from "@/components/schedule/ScheduleTable";
import { useToast } from "@/hooks/use-toast";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [manualRefreshTrigger, setManualRefreshTrigger] = useState(0);
  const { toast } = useToast();
  
  const formattedDate = date ? format(date, "yyyy-MM-dd") : undefined;
  
  const fetchSchedulesForDate = async () => {
    try {
      const result = await fetchSchedules(formattedDate);
      console.log("Fetched schedules:", result);
      return result;
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast({
        title: "Error",
        description: "Failed to fetch schedules. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };
  
  const { data: scheduleData, loading, refetch } = useRealtime(
    'schedules',
    [manualRefreshTrigger, formattedDate],
    ['*'],
    fetchSchedulesForDate
  );
  
  console.log("scheduleData:", scheduleData, "loading:", loading);

  const schedules = scheduleData.map(schedule => {
    const departureTime = new Date(schedule.departure_time);
    const arrivalTime = new Date(schedule.arrival_time);
    
    let status = "scheduled";
    if (schedule.cancelled_at) {
      status = "cancelled";
    } else if (departureTime <= new Date() && arrivalTime >= new Date()) {
      status = "in-transit";
    } else if (arrivalTime < new Date()) {
      status = "completed";
    }
    
    const route = schedule.routes;
    const bus = schedule.buses;
    
    return {
      id: schedule.id,
      route: route ? route.name : "Unknown Route",
      routeId: route ? route.id : "Unknown",
      departureTime: format(departureTime, "hh:mm a"),
      arrivalTime: format(arrivalTime, "hh:mm a"),
      date: format(departureTime, "yyyy-MM-dd"),
      bus: bus ? `Bus #${bus.registration_number} - ${bus.model} (${bus.capacity} seats)` : "Unknown Bus",
      driver: "Assigned Driver",
      status,
      bookedSeats: bus ? (bus.capacity - schedule.available_seats) : 0,
      totalSeats: bus ? bus.capacity : 0,
      fare: schedule.fare,
      cancellationReason: schedule.cancellation_reason
    };
  });

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesDate = date 
      ? schedule.date === format(date, "yyyy-MM-dd") 
      : true;
    
    const matchesSearch = schedule.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.bus.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" 
      ? true 
      : schedule.status === statusFilter;
    
    return matchesDate && matchesSearch && matchesStatus;
  });

  const todaySchedules = schedules.filter(s => s.date === format(new Date(), "yyyy-MM-dd")).length;
  const scheduledCount = schedules.filter(s => s.status === "scheduled").length;
  const inTransitCount = schedules.filter(s => s.status === "in-transit").length;
  const completedCount = schedules.filter(s => s.status === "completed").length;
  
  // Handle successful schedule addition
  const handleScheduleAdded = () => {
    toast({
      title: "Success",
      description: "New schedule has been added successfully",
      variant: "default",
    });
    setManualRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule Management</h1>
          <p className="text-muted-foreground mt-1">Manage your bus trips and schedules</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-zippy-darkGray border-zippy-gray">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button 
            className="bg-zippy-purple hover:bg-zippy-darkPurple"
            onClick={() => setIsAddModalOpen(true)}
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            Add Schedule
          </Button>
        </div>
      </div>

      <ScheduleStats
        todaySchedules={todaySchedules}
        scheduledCount={scheduledCount}
        inTransitCount={inTransitCount}
        completedCount={completedCount}
      />

      <ScheduleFilters
        date={date}
        setDate={setDate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <Card className="bg-zippy-darkGray border-zippy-gray overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <ScheduleTable 
              loading={loading} 
              schedules={filteredSchedules} 
              onRefresh={() => setManualRefreshTrigger(prev => prev + 1)}
            />
          </div>
        </CardContent>
      </Card>

      <AddScheduleModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={handleScheduleAdded} 
      />
    </div>
  );
};

export default Schedule;
