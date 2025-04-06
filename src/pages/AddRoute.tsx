import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  MapPin, 
  Plus, 
  Save, 
  Bus
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type StopType = {
  id: string;
  name: string;
  arrivalTime: string;
  departureTime: string;
  distanceFromStart: string;
};

interface RouteFormData {
  id: string;
  name: string;
  source: string;
  destination: string;
  distance: string;
  duration: string;
  busType: string;
  description: string;
  stops: StopType[];
  baseFare: string;
  currency: string;
  discount: string;
  tax: string;
  amenities: string[];
  assignedBus: string;
  specialNotes: string;
  status: string;
  nextDeparture: string;
}

const AddRoute = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<RouteFormData>({
    id: "",
    name: "",
    source: "",
    destination: "",
    distance: "",
    duration: "",
    busType: "",
    description: "",
    stops: [
      {
        id: "1",
        name: "",
        arrivalTime: "",
        departureTime: "",
        distanceFromStart: "0",
      },
    ],
    baseFare: "",
    currency: "npr",
    discount: "",
    tax: "",
    amenities: [],
    assignedBus: "",
    specialNotes: "",
    status: "active",
    nextDeparture: "Tomorrow, 08:00 AM",
  });

  const updateFormData = (field: keyof RouteFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateStop = (id: string, field: keyof StopType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.map((stop) =>
        stop.id === id ? { ...stop, [field]: value } : stop
      ),
    }));
  };

  const addStop = () => {
    setFormData((prev) => ({
      ...prev,
      stops: [
        ...prev.stops,
        {
          id: Date.now().toString(),
          name: "",
          arrivalTime: "",
          departureTime: "",
          distanceFromStart: "",
        },
      ],
    }));
  };

  const removeStop = (id: string) => {
    if (formData.stops.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.filter((stop) => stop.id !== id),
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => {
      const amenities = [...prev.amenities];
      if (amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: amenities.filter((a) => a !== amenity),
        };
      } else {
        return {
          ...prev,
          amenities: [...amenities, amenity],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.source || !formData.destination) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before saving.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Convert distance and duration to numbers for database
      const distanceValue = formData.distance ? parseFloat(formData.distance) : null;
      const durationValue = formData.duration ? parseInt(formData.duration.split('h')[0].trim(), 10) * 60 : null;
      
      // Prepare route data for Supabase
      const routeData = {
        name: formData.name,
        origin: formData.source,
        destination: formData.destination,
        distance: distanceValue,
        duration: durationValue,
        is_active: formData.status === 'active'
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('routes')
        .insert(routeData)
        .select();
      
      if (error) {
        console.error("Error creating route:", error);
        throw error;
      }
      
      console.log("Route created successfully:", data);
      
      toast({
        title: "Route created successfully",
        description: "Your new route has been saved to the database and is now active.",
      });
      
      navigate("/routes");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast({
        title: "Error creating route",
        description: "There was a problem saving your route. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => navigate("/routes")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Route</h1>
          <p className="text-muted-foreground mt-1">Create a new bus route with stops and schedule</p>
        </div>
      </div>

      <Tabs 
        defaultValue="details" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-zippy-gray">
          <TabsTrigger value="details">Route Details</TabsTrigger>
          <TabsTrigger value="stops">Stops & Schedule</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Amenities</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="details">
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the general details of your new bus route
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="routeName">Route Name</Label>
                    <Input
                      id="routeName"
                      placeholder="e.g. Delhi to Mumbai Express"
                      className="bg-zippy-gray border-zippy-lightGray"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routeId">Route ID (Optional)</Label>
                    <Input
                      id="routeId"
                      placeholder="Leave blank for auto-generated ID"
                      className="bg-zippy-gray border-zippy-lightGray"
                      value={formData.id}
                      onChange={(e) => updateFormData("id", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source">Source Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="source"
                        placeholder="Starting point"
                        className="bg-zippy-gray border-zippy-lightGray pl-9"
                        value={formData.source}
                        onChange={(e) => updateFormData("source", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="destination"
                        placeholder="End point"
                        className="bg-zippy-gray border-zippy-lightGray pl-9"
                        value={formData.destination}
                        onChange={(e) => updateFormData("destination", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalDistance">Total Distance (km)</Label>
                    <Input
                      id="totalDistance"
                      type="number"
                      placeholder="e.g. 500"
                      className="bg-zippy-gray border-zippy-lightGray"
                      value={formData.distance}
                      onChange={(e) => updateFormData("distance", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedDuration">
                      Estimated Duration
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="estimatedDuration"
                        placeholder="e.g. 8h 30m"
                        className="bg-zippy-gray border-zippy-lightGray pl-9"
                        value={formData.duration}
                        onChange={(e) => updateFormData("duration", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="busType">Bus Type</Label>
                  <Select 
                    value={formData.busType} 
                    onValueChange={(value) => updateFormData("busType", value)}
                  >
                    <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                      <SelectValue placeholder="Select bus type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="sleeper">Sleeper</SelectItem>
                      <SelectItem value="acSleeper">AC Sleeper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Route Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about this route"
                    className="min-h-32 bg-zippy-gray border-zippy-lightGray"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-zippy-gray pt-5">
                <Button
                  variant="outline"
                  onClick={() => navigate("/routes")}
                  className="bg-zippy-gray hover:bg-zippy-lightGray"
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("stops")}
                  className="bg-zippy-purple hover:bg-zippy-darkPurple"
                >
                  Next: Stops & Schedule
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="stops">
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Stops & Schedule</CardTitle>
                <CardDescription>
                  Add all stops along the route with arrival and departure times
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {formData.stops.map((stop, index) => (
                    <div
                      key={stop.id}
                      className="p-4 border border-zippy-gray rounded-md space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">
                          {index === 0
                            ? "Source Point"
                            : index === formData.stops.length - 1
                            ? "Destination Point"
                            : `Stop ${index}`}
                        </h3>
                        {formData.stops.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStop(stop.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100/10"
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`stop-name-${stop.id}`}>
                            Stop Name
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id={`stop-name-${stop.id}`}
                              value={stop.name}
                              onChange={(e) =>
                                updateStop(stop.id, "name", e.target.value)
                              }
                              placeholder="Location name"
                              className="bg-zippy-gray border-zippy-lightGray pl-9"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`arrival-time-${stop.id}`}>
                            Arrival Time
                          </Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id={`arrival-time-${stop.id}`}
                              type="time"
                              value={stop.arrivalTime}
                              onChange={(e) =>
                                updateStop(
                                  stop.id,
                                  "arrivalTime",
                                  e.target.value
                                )
                              }
                              className="bg-zippy-gray border-zippy-lightGray pl-9"
                              required={index !== 0}
                              disabled={index === 0}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`departure-time-${stop.id}`}>
                            Departure Time
                          </Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id={`departure-time-${stop.id}`}
                              type="time"
                              value={stop.departureTime}
                              onChange={(e) =>
                                updateStop(
                                  stop.id,
                                  "departureTime",
                                  e.target.value
                                )
                              }
                              className="bg-zippy-gray border-zippy-lightGray pl-9"
                              required={index !== formData.stops.length - 1}
                              disabled={index === formData.stops.length - 1}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`distance-${stop.id}`}>
                            Distance from Start (km)
                          </Label>
                          <Input
                            id={`distance-${stop.id}`}
                            type="number"
                            value={stop.distanceFromStart}
                            onChange={(e) =>
                              updateStop(
                                stop.id,
                                "distanceFromStart",
                                e.target.value
                              )
                            }
                            placeholder="e.g. 50"
                            className="bg-zippy-gray border-zippy-lightGray"
                            required
                            disabled={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addStop}
                  className="w-full border-dashed border-zippy-lightGray hover:border-zippy-purple hover:bg-zippy-darkPurple/10"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Stop
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-zippy-gray pt-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("details")}
                  className="bg-zippy-gray hover:bg-zippy-lightGray"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("pricing")}
                  className="bg-zippy-purple hover:bg-zippy-darkPurple"
                >
                  Next: Pricing & Amenities
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Pricing & Amenities</CardTitle>
                <CardDescription>
                  Set fare details and available amenities for this route
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="baseFare">Base Fare (NPR)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="baseFare"
                        type="number"
                        placeholder="Base ticket price in NPR"
                        className="bg-zippy-gray border-zippy-lightGray pl-9"
                        value={formData.baseFare}
                        onChange={(e) => updateFormData("baseFare", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currencyType">Currency</Label>
                    <Select 
                      value={formData.currency}
                      onValueChange={(value) => updateFormData("currency", value)}
                    >
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="npr">NPR (रू)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="inr">INR (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountPercentage">Discount (%)</Label>
                    <Input
                      id="discountPercentage"
                      type="number"
                      placeholder="e.g. 10"
                      className="bg-zippy-gray border-zippy-lightGray"
                      value={formData.discount}
                      onChange={(e) => updateFormData("discount", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxPercentage">Tax Rate (%)</Label>
                    <Input
                      id="taxPercentage"
                      type="number"
                      placeholder="e.g. 8"
                      className="bg-zippy-gray border-zippy-lightGray"
                      value={formData.tax}
                      onChange={(e) => updateFormData("tax", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Available Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "Wi-Fi",
                      "AC",
                      "USB Charging",
                      "Snacks",
                      "Water Bottle",
                      "Blanket",
                      "TV",
                      "Restroom",
                    ].map((amenity) => (
                      <div
                        key={amenity}
                        className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${
                          formData.amenities.includes(amenity)
                            ? "border-zippy-purple bg-zippy-purple/10"
                            : "border-zippy-lightGray hover:bg-zippy-lightGray/10 hover:border-zippy-purple"
                        }`}
                        onClick={() => toggleAmenity(amenity)}
                      >
                        <input
                          type="checkbox"
                          id={`amenity-${amenity}`}
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="h-4 w-4 text-zippy-purple rounded"
                        />
                        <Label
                          htmlFor={`amenity-${amenity}`}
                          className="cursor-pointer"
                        >
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedBus">Assign Bus</Label>
                  <div className="relative">
                    <Bus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Select
                      value={formData.assignedBus}
                      onValueChange={(value) => updateFormData("assignedBus", value)}
                    >
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray pl-9">
                        <SelectValue placeholder="Select a bus for this route" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="bus001">Bus #001 - Luxury (48 seats)</SelectItem>
                        <SelectItem value="bus002">Bus #002 - Sleeper (36 berths)</SelectItem>
                        <SelectItem value="bus003">Bus #003 - Standard (56 seats)</SelectItem>
                        <SelectItem value="bus004">Bus #004 - Deluxe (40 seats)</SelectItem>
                        <SelectItem value="bus005">Bus #005 - AC Sleeper (32 berths)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialNotes">Special Notes</Label>
                  <Textarea
                    id="specialNotes"
                    placeholder="Any special information about pricing, amenities, or restrictions"
                    className="min-h-32 bg-zippy-gray border-zippy-lightGray"
                    value={formData.specialNotes}
                    onChange={(e) => updateFormData("specialNotes", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-zippy-gray pt-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("stops")}
                  className="bg-zippy-gray hover:bg-zippy-lightGray"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-zippy-purple hover:bg-zippy-darkPurple"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Route
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
};

export default AddRoute;
