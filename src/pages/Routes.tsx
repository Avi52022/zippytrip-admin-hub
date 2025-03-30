
import { Link } from "react-router-dom";
import { 
  Bus, 
  Clock, 
  DollarSign, 
  Edit, 
  Eye, 
  FileDown, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  Route, 
  Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for routes
const routesData = [
  {
    id: "R001",
    name: "Delhi to Mumbai Express",
    source: "Delhi",
    destination: "Mumbai",
    distance: "1400 km",
    duration: "16h 30m",
    stops: 5,
    fare: "$25.99",
    status: "active",
    busType: "Luxury",
    nextDeparture: "Today, 10:30 PM",
  },
  {
    id: "R002",
    name: "Bangalore to Chennai",
    source: "Bangalore",
    destination: "Chennai",
    distance: "350 km",
    duration: "6h 15m",
    stops: 2,
    fare: "$15.50",
    status: "active",
    busType: "Standard",
    nextDeparture: "Tomorrow, 08:00 AM",
  },
  {
    id: "R003",
    name: "Pune to Goa Coastal",
    source: "Pune",
    destination: "Goa",
    distance: "450 km",
    duration: "10h 00m",
    stops: 3,
    fare: "$18.75",
    status: "maintenance",
    busType: "Sleeper",
    nextDeparture: "Day after tomorrow, 11:00 PM",
  },
  {
    id: "R004",
    name: "Kolkata to Hyderabad",
    source: "Kolkata",
    destination: "Hyderabad",
    distance: "1600 km",
    duration: "24h 45m",
    stops: 8,
    fare: "$32.99",
    status: "active",
    busType: "Luxury",
    nextDeparture: "Today, 09:00 PM",
  },
  {
    id: "R005",
    name: "Jaipur to Delhi",
    source: "Jaipur",
    destination: "Delhi",
    distance: "280 km",
    duration: "5h 30m",
    stops: 1,
    fare: "$12.25",
    status: "inactive",
    busType: "Standard",
    nextDeparture: "Scheduled maintenance",
  },
];

const Routes = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bus Routes</h1>
          <p className="text-muted-foreground mt-1">Manage all your bus routes and schedules</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" className="bg-zippy-darkGray border-zippy-gray">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link to="/routes/add">
            <Button className="bg-zippy-purple hover:bg-zippy-darkPurple">
              <Plus className="mr-2 h-4 w-4" />
              Add New Route
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="bg-zippy-darkGray border-zippy-gray flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Route className="h-5 w-5 mr-2 text-zippy-purple" />
                Total Routes
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-500" />
                Active Routes
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Bus className="h-5 w-5 mr-2 text-amber-500" />
                Maintenance
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-red-500" />
                Inactive
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Input 
            placeholder="Search routes..." 
            className="bg-zippy-darkGray border-zippy-gray pl-8"
          />
          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <Card className="bg-zippy-darkGray border-zippy-gray overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zippy-gray">
                <TableRow>
                  <TableHead>Route ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Source - Destination</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Fare</TableHead>
                  <TableHead>Bus Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Departure</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routesData.map((route) => (
                  <TableRow key={route.id} className="border-b border-zippy-gray">
                    <TableCell className="font-medium">{route.id}</TableCell>
                    <TableCell>{route.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{route.source}</span>
                        <span>→</span>
                        <span>{route.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>{route.duration}</TableCell>
                    <TableCell>{route.fare}</TableCell>
                    <TableCell>{route.busType}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          route.status === "active" 
                            ? "outline" 
                            : route.status === "maintenance" 
                            ? "secondary" 
                            : "destructive"
                        }
                        className={
                          route.status === "active"
                            ? "border-green-500 text-green-500"
                            : route.status === "maintenance"
                            ? "border-amber-500 text-amber-500"
                            : ""
                        }
                      >
                        {route.status === "active" 
                          ? "Active" 
                          : route.status === "maintenance" 
                          ? "Maintenance" 
                          : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{route.nextDeparture}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zippy-darkGray border-zippy-gray">
                          <DropdownMenuItem className="cursor-pointer focus:bg-zippy-gray focus:text-white">
                            <Link to={`/routes/${route.id}`} className="flex items-center w-full">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer focus:bg-zippy-gray focus:text-white">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Routes;
