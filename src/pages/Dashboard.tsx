
import { AreaChart, BarChart, Bus, DollarSign, MapPin, Route, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart as RechartsBarChart,
  Bar
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
  { name: "Jul", revenue: 7000 },
];

const passengersData = [
  { name: "Mon", passengers: 240 },
  { name: "Tue", passengers: 300 },
  { name: "Wed", passengers: 280 },
  { name: "Thu", passengers: 320 },
  { name: "Fri", passengers: 400 },
  { name: "Sat", passengers: 450 },
  { name: "Sun", passengers: 380 },
];

const routePerformance = [
  { name: "Delhi-Mumbai", revenue: 8500, passengers: 320 },
  { name: "Bangalore-Chennai", revenue: 6200, passengers: 250 },
  { name: "Kolkata-Hyderabad", revenue: 5100, passengers: 180 },
  { name: "Pune-Goa", revenue: 7800, passengers: 290 },
  { name: "Jaipur-Delhi", revenue: 4900, passengers: 210 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zippy-darkGray border-zippy-gray">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 new routes this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fleet Size</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              +3 buses since last year
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              +10.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }} 
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-3">
          <CardHeader>
            <CardTitle>Passenger Traffic</CardTitle>
            <CardDescription>Daily passenger count for this week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={passengersData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }} 
                />
                <Legend />
                <Bar dataKey="passengers" fill="#9B87F5" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-zippy-darkGray border-zippy-gray col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Routes</CardTitle>
            <CardDescription>Revenue and passenger numbers by route</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routePerformance.map((route, i) => (
                <div key={i} className="flex items-center justify-between border-b border-zippy-gray pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-zippy-gray p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-zippy-purple" />
                    </div>
                    <div>
                      <div className="font-medium">{route.name}</div>
                      <div className="text-sm text-muted-foreground">{route.passengers} passengers</div>
                    </div>
                  </div>
                  <div className="font-medium">${route.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zippy-darkGray border-zippy-gray">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-3 border-b border-zippy-gray pb-4">
                  <div className="bg-zippy-gray p-2 rounded-full mt-0.5">
                    {i % 3 === 0 ? (
                      <Bus className="h-4 w-4 text-zippy-purple" />
                    ) : i % 3 === 1 ? (
                      <Route className="h-4 w-4 text-zippy-purple" />
                    ) : (
                      <Users className="h-4 w-4 text-zippy-purple" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {i % 3 === 0
                        ? "Bus BUS-104 scheduled maintenance"
                        : i % 3 === 1
                        ? "New route added: Delhi-Chandigarh"
                        : "User booking completed"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 60)} minutes ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
