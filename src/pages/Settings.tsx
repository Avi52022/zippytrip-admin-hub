
import { useState } from "react";
import { 
  Bell, 
  CalendarDays, 
  CreditCard, 
  Download, 
  Lock, 
  Mail, 
  MessageSquare, 
  Plus, 
  PlusCircle, 
  Settings as SettingsIcon, 
  Shield, 
  Terminal, 
  UserRound, 
  User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ProfileForm from "@/components/ProfileForm";
import SecurityForm from "@/components/SecurityForm";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="text-base">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="text-base">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-base">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-zippy-darkGray border-zippy-gray text-card-foreground">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information and how others see you on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-zippy-darkGray border-zippy-gray text-card-foreground">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and account security settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-zippy-darkGray border-zippy-gray text-card-foreground">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications and updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="booking-notifications">Booking Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your booking status changes.
                      </p>
                    </div>
                    <Switch id="booking-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="schedule-notifications">Schedule Changes</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when there are changes to your scheduled trips.
                      </p>
                    </div>
                    <Switch id="schedule-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features, promotions, and deals.
                      </p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-bookings">Booking Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications about your booking status changes.
                      </p>
                    </div>
                    <Switch id="push-bookings" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-reminders">Trip Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get push notifications before your scheduled trips.
                      </p>
                    </div>
                    <Switch id="push-reminders" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification-time">Reminder Time</Label>
                    <Select defaultValue="24hours">
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                        <SelectValue placeholder="Select when to receive reminders" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="1hour">1 hour before</SelectItem>
                        <SelectItem value="3hours">3 hours before</SelectItem>
                        <SelectItem value="12hours">12 hours before</SelectItem>
                        <SelectItem value="24hours">24 hours before</SelectItem>
                        <SelectItem value="48hours">48 hours before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-zippy-purple hover:bg-zippy-darkPurple">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
