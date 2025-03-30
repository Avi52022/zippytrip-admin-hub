
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  DollarSign, 
  Edit, 
  MapPin, 
  MoreHorizontal, 
  Printer, 
  Route as RouteIcon,
  Bus,
  Users,
  CheckCircle2,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock route data
const routeData = {
  id: "R001",
  name: "Delhi to Mumbai Express",
  source: "Delhi",
  destination: "Mumbai",
  distance: "1400 km",
  duration: "16h 30m",
  stops: [
    {
      name: "Delhi Bus Terminal",
      arrivalTime: "N/A",
      departureTime: "10:30 PM",
      distanceFromStart: "0 km",
      dayOffset: 0,
    },
    {
      name: "Jaipur Central",
      arrivalTime: "02:00 AM",
      departureTime: "02:15 AM",
      distanceFromStart: "280 km",
      dayOffset: 0,
    },
    {
      name: "Ahmedabad Junction",
      arrivalTime: "09:45 AM",
      departureTime: "10:00 AM",
      distanceFromStart: "750 km",
      dayOffset: 0,
    },
    {
      name: "Surat Bus Stop",
      arrivalTime: "01:30 PM",
      departureTime: "01:45 PM",
      distanceFromStart: "1050 km",
      dayOffset: 0,
    },
    {
      name: "Mumbai Central",
      arrivalTime: "03:00 PM",
      departureTime: "N/A",
      distanceFromStart: "1400 km",
      dayOffset: 0,
    },
  ],
  fare: "$25.99",
  status: "active",
  busType: "Luxury",
  amenities: ["Wi-Fi", "AC", "USB Charging", "Snacks", "Water Bottle", "TV"],
  assignedBus: "Bus #001 - Luxury (48 seats)",
  description: "Express luxury bus service from Delhi to Mumbai with limited stops for faster travel time. Comfortable seating with ample legroom and modern amenities.",
  nextDeparture: "Today, 10:30 PM",
  schedule: [
    { day: "Monday", departureTime: "10:30 PM", arrivalTime: "03:00 PM (+1)" },
    { day: "Wednesday", departureTime: "10:30 PM", arrivalTime: "03:00 PM (+1)" },
    { day: "Friday", departureTime: "10:30 PM", arrivalTime: "03:00 PM (+1)" },
    { day: "Sunday", departureTime: "09:00 PM", arrivalTime: "01:30 PM (+1)" },
  ],
  performance: {
    avgOccupancy: "87%",
    avgRevenue: "$1,245 per trip",
    monthlyPassengers: "1,560",
    monthlyRevenue: "$40,500",
    popularStop: "Ahmedabad Junction",
  },
};

const RouteDetail = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Link to="/routes">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {routeData.name}
              </h1>
              <Badge 
                variant="outline" 
                className="border-green-500 text-green-500"
              >
                Active
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Route ID: {routeData.id} • {routeData.distance} • {routeData.duration}
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button variant="outline" className="bg-zippy-darkGray border-zippy-gray">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button className="bg-zippy-purple hover:bg-zippy-darkPurple">
            <Edit className="mr-2 h-4 w-4" />
            Edit Route
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zippy-darkGray border-zippy-gray">
              <DropdownMenuItem className="cursor-pointer focus:bg-zippy-gray focus:text-white">
                Duplicate Route
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-zippy-gray focus:text-white">
                Transfer Bus
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground">
                Deactivate Route
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-zippy-darkGray border-zippy-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-zippy-purple" />
                Source
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium">{routeData.source}</div>
            <div className="text-sm text-muted-foreground">
              Departure: {routeData.stops[0].departureTime}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-zippy-purple" />
                Destination
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium">{routeData.destination}</div>
            <div className="text-sm text-muted-foreground">
              Arrival: {routeData.stops[routeData.stops.length - 1].arrivalTime}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-zippy-purple" />
                Next Departure
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium">{routeData.nextDeparture}</div>
            <div className="text-sm text-muted-foreground">
              Total journey: {routeData.duration}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-zippy-gray">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="stops">Stops & Map</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-2">
              <CardHeader>
                <CardTitle>Route Details</CardTitle>
                <CardDescription>
                  General information about the route
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-muted-foreground mb-2">Route Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 border-b border-zippy-gray">
                        <span className="text-muted-foreground">Route ID</span>
                        <span>{routeData.id}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-zippy-gray">
                        <span className="text-muted-foreground">Total Distance</span>
                        <span>{routeData.distance}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-zippy-gray">
                        <span className="text-muted-foreground">Journey Duration</span>
                        <span>{routeData.duration}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-zippy-gray">
                        <span className="text-muted-foreground">Number of Stops</span>
                        <span>{routeData.stops.length}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-zippy-gray">
                        <span className="text-muted-foreground">Status</span>
                        <Badge 
                          variant="outline" 
                          className="border-green-500 text-green-500"
                        >
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-muted-foreground mb-2">Bus Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 border-b border-zippy-gray">
                        <span className="text-muted-foreground">Bus Type</span>
                        <span>{routeData.busType}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-zippy-gray">
                        <span className="text-muted-foreground">Assigned Bus</span>
                        <span>{routeData.assignedBus}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-zippy-gray">
                        <span className="text-muted-foreground">Base Fare</span>
                        <span>{routeData.fare}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground mb-2">Route Description</h3>
                  <p>{routeData.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground mb-2">Available Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {routeData.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center px-3 py-1 bg-zippy-gray rounded-full text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-500" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray h-fit">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>
                  Performance highlights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-zippy-gray p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2 text-zippy-purple" />
                    <h3 className="font-medium">Avg. Occupancy</h3>
                  </div>
                  <div className="text-2xl font-bold">{routeData.performance.avgOccupancy}</div>
                </div>
                
                <div className="bg-zippy-gray p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                    <h3 className="font-medium">Avg. Revenue</h3>
                  </div>
                  <div className="text-2xl font-bold">{routeData.performance.avgRevenue}</div>
                </div>
                
                <div className="bg-zippy-gray p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    <h3 className="font-medium">Monthly Revenue</h3>
                  </div>
                  <div className="text-2xl font-bold">{routeData.performance.monthlyRevenue}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card className="bg-zippy-darkGray border-zippy-gray">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                Regular departure and arrival times for this route
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zippy-gray">
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Departure Time</TableHead>
                      <TableHead>Arrival Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Bus</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routeData.schedule.map((schedule, index) => (
                      <TableRow key={index} className="border-b border-zippy-gray">
                        <TableCell className="font-medium">{schedule.day}</TableCell>
                        <TableCell>{schedule.departureTime}</TableCell>
                        <TableCell>{schedule.arrivalTime}</TableCell>
                        <TableCell>{routeData.duration}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className="border-green-500 text-green-500"
                          >
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>{routeData.assignedBus}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stops">
          <div className="grid gap-6 md:grid-cols-5">
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-2">
              <CardHeader>
                <CardTitle>Stops Information</CardTitle>
                <CardDescription>
                  All stops along the route with timings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {routeData.stops.map((stop, index) => (
                    <div key={index} className="relative pl-8 pb-6">
                      {/* Vertical line connecting stops */}
                      {index < routeData.stops.length - 1 && (
                        <div className="absolute left-3.5 top-3 bottom-0 w-0.5 bg-zippy-gray" />
                      )}
                      
                      {/* Stop indicator */}
                      <div className={`absolute left-0 top-0 h-7 w-7 rounded-full flex items-center justify-center ${
                        index === 0 
                          ? "bg-green-500/20 text-green-500" 
                          : index === routeData.stops.length - 1 
                          ? "bg-red-500/20 text-red-500" 
                          : "bg-zippy-purple/20 text-zippy-purple"
                      }`}>
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="font-medium">{stop.name}</div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Distance: </span>
                          {stop.distanceFromStart}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Arrival: </span>
                            {stop.arrivalTime === "N/A" ? "-" : stop.arrivalTime}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Departure: </span>
                            {stop.departureTime === "N/A" ? "-" : stop.departureTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-3">
              <CardHeader>
                <CardTitle>Route Map</CardTitle>
                <CardDescription>
                  Visual representation of the route
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-zippy-gray border border-zippy-lightGray rounded-md flex items-center justify-center relative">
                  <RouteIcon className="h-8 w-8 text-muted-foreground" />
                  <p className="absolute text-muted-foreground">
                    Interactive route map will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-zippy-darkGray border-zippy-gray col-span-3">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators for this route
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-zippy-gray p-4 rounded-md flex flex-col space-y-2">
                    <div className="text-muted-foreground text-sm">Monthly Passengers</div>
                    <div className="text-2xl font-bold">{routeData.performance.monthlyPassengers}</div>
                    <div className="text-xs text-green-500">+12% from last month</div>
                  </div>
                  
                  <div className="bg-zippy-gray p-4 rounded-md flex flex-col space-y-2">
                    <div className="text-muted-foreground text-sm">Average Occupancy</div>
                    <div className="text-2xl font-bold">{routeData.performance.avgOccupancy}</div>
                    <div className="text-xs text-green-500">+5% from last month</div>
                  </div>
                  
                  <div className="bg-zippy-gray p-4 rounded-md flex flex-col space-y-2">
                    <div className="text-muted-foreground text-sm">Monthly Revenue</div>
                    <div className="text-2xl font-bold">{routeData.performance.monthlyRevenue}</div>
                    <div className="text-xs text-green-500">+10% from last month</div>
                  </div>
                  
                  <div className="bg-zippy-gray p-4 rounded-md flex flex-col space-y-2">
                    <div className="text-muted-foreground text-sm">Revenue per Trip</div>
                    <div className="text-2xl font-bold">{routeData.performance.avgRevenue}</div>
                    <div className="text-xs text-green-500">+3% from last month</div>
                  </div>
                </div>
                
                <div className="mt-8 h-80 bg-zippy-gray border border-zippy-lightGray rounded-md flex items-center justify-center relative">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <p className="absolute text-muted-foreground">
                    Performance charts will be displayed here
                  </p>
                </div>
                
                <div className="mt-8 space-y-2">
                  <h3 className="font-medium">Popular Stops</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-zippy-gray">
                        <TableRow>
                          <TableHead>Stop Name</TableHead>
                          <TableHead>Boarding</TableHead>
                          <TableHead>Alighting</TableHead>
                          <TableHead>Revenue Contribution</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {routeData.stops.map((stop, index) => (
                          <TableRow key={index} className="border-b border-zippy-gray">
                            <TableCell className="font-medium">{stop.name}</TableCell>
                            <TableCell>{index === 0 ? "85%" : Math.floor(Math.random() * 40) + "%"}</TableCell>
                            <TableCell>{index === routeData.stops.length - 1 ? "90%" : Math.floor(Math.random() * 40) + "%"}</TableCell>
                            <TableCell>{index === 0 ? "65%" : index === routeData.stops.length - 1 ? "20%" : Math.floor(Math.random() * 15) + "%"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RouteDetail;
