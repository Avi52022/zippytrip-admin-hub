
import { Clock, Bus, User, Edit, Trash2, MoreVertical, RefreshCw, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatNPR } from "@/utils/formatters";
import { getStatusBadge, getOccupancyPercentage, getOccupancyColor } from "./scheduleUtils";
import { useState } from "react";
import { cancelSchedule } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface Schedule {
  id: string;
  route: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  bus: string;
  driver: string;
  status: string;
  bookedSeats: number;
  totalSeats: number;
  fare: number;
  cancellationReason?: string | null;
}

interface ScheduleTableProps {
  loading: boolean;
  schedules: Schedule[];
  onRefresh: () => void;
}

export const ScheduleTable = ({ loading, schedules, onRefresh }: ScheduleTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [processingCancellation, setProcessingCancellation] = useState(false);
  const { toast } = useToast();

  const handleCancelTrip = async () => {
    if (!selectedScheduleId || !cancellationReason.trim()) return;
    
    setProcessingCancellation(true);
    try {
      await cancelSchedule(selectedScheduleId, cancellationReason);
      toast({
        title: "Trip Cancelled",
        description: "The trip has been cancelled successfully.",
        variant: "default",
      });
      onRefresh(); // Refresh the schedule list
    } catch (error) {
      console.error("Error cancelling trip:", error);
      toast({
        title: "Error",
        description: "Failed to cancel the trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingCancellation(false);
      setIsDialogOpen(false);
      setCancellationReason("");
      setSelectedScheduleId(null);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 bg-zippy-gray">
        <div className="flex-1"></div>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-zippy-darkGray border-zippy-gray"
          onClick={onRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <Table>
        <TableHeader className="bg-zippy-gray">
          <TableRow>
            <TableHead>Schedule ID</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Bus className="h-4 w-4" />
                Bus
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Driver
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                  Loading schedules...
                </div>
              </TableCell>
            </TableRow>
          ) : schedules.length > 0 ? (
            schedules.map((schedule) => (
              <TableRow key={schedule.id} className="border-b border-zippy-gray">
                <TableCell className="font-medium">{schedule.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{schedule.route}</span>
                    <span className="text-xs text-muted-foreground">{schedule.routeId}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="flex items-center">
                      <span className="w-14">Dep:</span>
                      <span>{schedule.departureTime}</span>
                    </span>
                    <span className="flex items-center">
                      <span className="w-14">Arr:</span>
                      <span>{schedule.arrivalTime}</span>
                    </span>
                  </div>
                </TableCell>
                <TableCell>{schedule.bus}</TableCell>
                <TableCell>{schedule.driver}</TableCell>
                <TableCell>
                  {getStatusBadge(schedule.status)}
                  {schedule.status === "cancelled" && schedule.cancellationReason && (
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                      Reason: {schedule.cancellationReason}
                    </div>
                  )}
                </TableCell>
                <TableCell>{formatNPR(schedule.fare)}</TableCell>
                <TableCell>
                  {schedule.status !== "cancelled" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-zippy-gray rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${getOccupancyColor(getOccupancyPercentage(schedule.bookedSeats, schedule.totalSeats))}`}
                          style={{ width: `${getOccupancyPercentage(schedule.bookedSeats, schedule.totalSeats)}%` }}
                        />
                      </div>
                      <span className={`text-xs ${getOccupancyColor(getOccupancyPercentage(schedule.bookedSeats, schedule.totalSeats))}`}>
                        {schedule.bookedSeats}/{schedule.totalSeats} 
                        ({getOccupancyPercentage(schedule.bookedSeats, schedule.totalSeats)}%)
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">N/A</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zippy-darkGray border-zippy-gray">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer focus:bg-zippy-gray focus:text-white">
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Schedule</span>
                      </DropdownMenuItem>
                      {schedule.status === "scheduled" && (
                        <DropdownMenuItem className="cursor-pointer focus:bg-zippy-gray focus:text-white">
                          <Bus className="mr-2 h-4 w-4" />
                          <span>Change Bus</span>
                        </DropdownMenuItem>
                      )}
                      {schedule.status === "scheduled" && (
                        <DropdownMenuItem className="cursor-pointer focus:bg-zippy-gray focus:text-white">
                          <User className="mr-2 h-4 w-4" />
                          <span>Change Driver</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      {schedule.status === "scheduled" && (
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                          onClick={() => {
                            setSelectedScheduleId(schedule.id);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Cancel Trip</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No schedules found for the selected criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-zippy-darkGray border-zippy-gray">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Trip</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this trip? This action cannot be undone.
              All passengers with bookings will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <label htmlFor="reason" className="block text-sm font-medium mb-2">
              Cancellation Reason (required)
            </label>
            <Input
              id="reason"
              placeholder="e.g., Technical issues, Weather conditions"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              className="bg-zippy-gray border-zippy-gray"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-zippy-gray border-zippy-gray hover:bg-zippy-darkGray"
              disabled={processingCancellation}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleCancelTrip}
              disabled={processingCancellation || !cancellationReason.trim()}
            >
              {processingCancellation ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Confirm Cancellation"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
