
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
import { useToast } from "@/components/ui/use-toast";

type StopType = {
  id: string;
  name: string;
  arrivalTime: string;
  departureTime: string;
  distanceFromStart: string;
};

const AddRoute = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stops, setStops] = useState<StopType[]>([
    {
      id: "1",
      name: "",
      arrivalTime: "",
      departureTime: "",
      distanceFromStart: "",
    },
  ]);

  const addStop = () => {
    setStops([
      ...stops,
      {
        id: Date.now().toString(),
        name: "",
        arrivalTime: "",
        departureTime: "",
        distanceFromStart: "",
      },
    ]);
  };

  const removeStop = (id: string) => {
    if (stops.length === 1) return;
    setStops(stops.filter((stop) => stop.id !== id));
  };

  const updateStop = (id: string, field: keyof StopType, value: string) => {
    setStops(
      stops.map((stop) =>
        stop.id === id ? { ...stop, [field]: value } : stop
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Route created successfully",
      description: "Your new route has been created and is now active.",
    });
    
    navigate("/routes");
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

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-zippy-gray">
          <TabsTrigger value="details">Route Details</TabsTrigger>
          <TabsTrigger value="stops">Stops & Schedule</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Amenities</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <form onSubmit={handleSubmit}>
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routeId">Route ID</Label>
                    <Input
                      id="routeId"
                      placeholder="e.g. RT001"
                      className="bg-zippy-gray border-zippy-lightGray"
                      required
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
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="busType">Bus Type</Label>
                  <Select>
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
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-zippy-gray pt-5">
                <Button
                  variant="outline"
                  onClick={() => navigate("/routes")}
                  className="bg-zippy-gray hover:bg-zippy-lightGray"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    document.querySelector('[data-value="stops"]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    );
                  }}
                  className="bg-zippy-purple hover:bg-zippy-darkPurple"
                >
                  Next: Stops & Schedule
                </Button>
              </CardFooter>
            </Card>
          </form>
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
                {stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className="p-4 border border-zippy-gray rounded-md space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">
                        {index === 0
                          ? "Source Point"
                          : index === stops.length - 1
                          ? "Destination Point"
                          : `Stop ${index}`}
                      </h3>
                      {stops.length > 1 && (
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
                            required={index !== stops.length - 1}
                            disabled={index === stops.length - 1}
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
                onClick={() => {
                  document.querySelector('[data-value="details"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
                className="bg-zippy-gray hover:bg-zippy-lightGray"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => {
                  document.querySelector('[data-value="pricing"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
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
                  <Label htmlFor="baseFare">Base Fare</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="baseFare"
                      type="number"
                      placeholder="Base ticket price"
                      className="bg-zippy-gray border-zippy-lightGray pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currencyType">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-zippy-darkGray border-zippy-gray">
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxPercentage">Tax Rate (%)</Label>
                  <Input
                    id="taxPercentage"
                    type="number"
                    placeholder="e.g. 8"
                    className="bg-zippy-gray border-zippy-lightGray"
                    required
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
                      className="flex items-center space-x-2 border border-zippy-lightGray rounded-md p-3 cursor-pointer hover:bg-zippy-lightGray/10 hover:border-zippy-purple transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={`amenity-${amenity}`}
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
                  <Select>
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
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-zippy-gray pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  document.querySelector('[data-value="stops"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
                className="bg-zippy-gray hover:bg-zippy-lightGray"
              >
                Back
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="bg-zippy-purple hover:bg-zippy-darkPurple"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Route
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddRoute;
