
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Route, Bus, MapPin } from "lucide-react";

const EditRoute = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    source: "",
    destination: "",
    distance: "",
    duration: "",
    stops: "",
    fare: "",
    status: "active",
    busType: "Standard",
    nextDeparture: "",
    description: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch route data on load
  useEffect(() => {
    const fetchRouteData = () => {
      const savedRoutes = JSON.parse(localStorage.getItem("busRoutes") || "[]");
      const routeData = savedRoutes.find(route => route.id === id);
      
      if (routeData) {
        setFormData({
          ...routeData,
          stops: routeData.stops.toString(),
          description: routeData.description || ""
        });
      } else {
        toast({
          title: "Route not found",
          description: "The route you're trying to edit doesn't exist.",
          variant: "destructive"
        });
        navigate("/routes");
      }
    };
    
    fetchRouteData();
  }, [id, navigate, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate inputs
      if (!formData.name || !formData.source || !formData.destination || !formData.fare) {
        toast({
          title: "Validation error",
          description: "Please fill all required fields.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Get existing routes from localStorage
      const savedRoutes = JSON.parse(localStorage.getItem("busRoutes") || "[]");
      
      // Find and update the route
      const updatedRoutes = savedRoutes.map(route => {
        if (route.id === id) {
          return {
            ...formData,
            stops: parseInt(formData.stops),
          };
        }
        return route;
      });
      
      // Save to localStorage
      localStorage.setItem("busRoutes", JSON.stringify(updatedRoutes));
      
      // Show success toast
      toast({
        title: "Route updated",
        description: "The route has been updated successfully.",
      });
      
      // Redirect to routes page
      navigate("/routes");
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the route.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Route</h1>
        <p className="text-muted-foreground mt-1">Update existing bus route details</p>
      </div>
      
      <Card className="bg-zippy-darkGray border-zippy-gray">
        <CardHeader>
          <CardTitle>Route Information</CardTitle>
          <CardDescription>Update the information for this bus route</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Route Name</Label>
                <div className="relative">
                  <Route className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Delhi to Mumbai Express"
                    className="pl-9 bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="id">Route ID</Label>
                <Input
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="R001"
                  disabled
                  className="bg-zippy-gray border-zippy-lightGray opacity-70"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    placeholder="Delhi"
                    className="pl-9 bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className="pl-9 bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="distance">Distance</Label>
                <Input
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={handleInputChange}
                  placeholder="1400 km"
                  className="bg-zippy-gray border-zippy-lightGray"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="16h 30m"
                  className="bg-zippy-gray border-zippy-lightGray"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stops">Number of Stops</Label>
                <Input
                  id="stops"
                  name="stops"
                  type="number"
                  value={formData.stops}
                  onChange={handleInputChange}
                  placeholder="5"
                  min="0"
                  className="bg-zippy-gray border-zippy-lightGray"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fare">Fare</Label>
                <Input
                  id="fare"
                  name="fare"
                  value={formData.fare}
                  onChange={handleInputChange}
                  placeholder="NPR 2500"
                  className="bg-zippy-gray border-zippy-lightGray"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="busType">Bus Type</Label>
                <div className="relative">
                  <Bus className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Select
                    value={formData.busType}
                    onValueChange={(value) => handleSelectChange("busType", value)}
                  >
                    <SelectTrigger className="pl-9 bg-zippy-gray border-zippy-lightGray">
                      <SelectValue placeholder="Select bus type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                      <SelectItem value="Sleeper">Sleeper</SelectItem>
                      <SelectItem value="Mini">Mini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger className="pl-9 bg-zippy-gray border-zippy-lightGray">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nextDeparture">Next Departure</Label>
                <Input
                  id="nextDeparture"
                  name="nextDeparture"
                  value={formData.nextDeparture}
                  onChange={handleInputChange}
                  placeholder="Today, 10:30 PM"
                  className="bg-zippy-gray border-zippy-lightGray"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Route Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter any additional details about this route..."
                className="min-h-[100px] bg-zippy-gray border-zippy-lightGray"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/routes")}
                className="bg-zippy-darkGray border-zippy-gray"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-zippy-purple hover:bg-zippy-darkPurple"
              >
                {isLoading ? "Updating..." : "Update Route"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditRoute;
