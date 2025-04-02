
import { useState } from "react";
import { 
  Bell, 
  ChevronDown, 
  Edit, 
  Key, 
  LayoutGrid, 
  Lock, 
  Mail, 
  Plus, 
  Save, 
  Settings as SettingsIcon, 
  Shield, 
  Smartphone, 
  Sun, 
  Trash, 
  Upload, 
  User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ProfileForm from "@/components/ProfileForm";
import SecurityForm from "@/components/SecurityForm";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs 
        defaultValue="profile" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-zippy-gray">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-5">
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-3">
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm initialData={{
                  firstName: 'John',
                  lastName: 'Doe',
                  email: 'john.doe@zippytrip.com',
                  phone: '+1 (555) 000-0000',
                  jobTitle: 'Fleet Manager',
                  bio: 'I manage the fleet operations and route scheduling for ZippyTrip',
                }} />
              </CardContent>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-2">
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>
                  View your current account status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Current Status</div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Active
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Account Type</div>
                  <div className="font-medium">Administrator</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Member Since</div>
                  <div className="font-medium">October 2022</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Last Login</div>
                  <div className="font-medium">Today, 9:42 AM</div>
                </div>
                
                <Separator className="bg-zippy-gray" />
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Actions</div>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      className="justify-start bg-zippy-gray border-zippy-lightGray"
                      onClick={() => setActiveTab("security")}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="justify-start bg-zippy-gray border-zippy-lightGray">
                      <Shield className="mr-2 h-4 w-4" />
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="justify-start text-destructive bg-zippy-gray border-zippy-lightGray hover:bg-destructive hover:text-destructive-foreground">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="grid gap-6 md:grid-cols-5">
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-3">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="flex gap-2">
                    <input id="username" defaultValue="johndoe" className="flex h-10 w-full rounded-md border border-zippy-gray bg-zippy-darkGray px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    <Button className="bg-zippy-purple hover:bg-zippy-darkPurple">
                      Save
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="america-new-york">
                    <SelectTrigger className="bg-zippy-darkGray border-zippy-gray">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                      <SelectItem value="america-new-york">America/New York (UTC-05:00)</SelectItem>
                      <SelectItem value="america-chicago">America/Chicago (UTC-06:00)</SelectItem>
                      <SelectItem value="america-denver">America/Denver (UTC-07:00)</SelectItem>
                      <SelectItem value="america-los-angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                      <SelectItem value="asia-kolkata">Asia/Kolkata (UTC+05:30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="english">
                    <SelectTrigger className="bg-zippy-darkGray border-zippy-gray">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive email notifications for account activity</div>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Marketing Emails</div>
                      <div className="text-sm text-muted-foreground">Receive updates about new features and promotions</div>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-2">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Link your accounts for enhanced features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0A66C2] p-2 rounded-full">
                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Connected
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-zippy-gray border-zippy-lightGray">
                    Disconnect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#1DA1F2] p-2 rounded-full">
                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Twitter</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          Not Connected
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-zippy-gray border-zippy-lightGray">
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#24292F] p-2 rounded-full">
                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 6.7 18 7 18 7c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          Not Connected
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-zippy-gray border-zippy-lightGray">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-1">
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Update your password to ensure account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityForm />
              </CardContent>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-factor authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Disabled
                  </Badge>
                </div>
                
                <Button variant="outline" className="bg-zippy-gray border-zippy-lightGray">
                  <Shield className="mr-2 h-4 w-4" />
                  Setup Two-Factor Authentication
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Login Sessions</CardTitle>
                <CardDescription>
                  Manage your active sessions on different devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-zippy-gray p-2 rounded-full">
                        <Smartphone className="h-5 w-5 text-zippy-purple" />
                      </div>
                      <div>
                        <div className="font-medium">iPhone 13 Pro - Chrome</div>
                        <div className="text-sm text-muted-foreground">New York, USA • Current Session</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-zippy-gray p-2 rounded-full">
                        <LayoutGrid className="h-5 w-5 text-zippy-purple" />
                      </div>
                      <div>
                        <div className="font-medium">MacBook Pro - Safari</div>
                        <div className="text-sm text-muted-foreground">New York, USA • Last active: 2 hours ago</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-zippy-gray p-2 rounded-full">
                        <LayoutGrid className="h-5 w-5 text-zippy-purple" />
                      </div>
                      <div>
                        <div className="font-medium">Windows PC - Firefox</div>
                        <div className="text-sm text-muted-foreground">Chicago, USA • Last active: 5 days ago</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      Inactive
                    </Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="text-destructive bg-zippy-gray border-zippy-lightGray hover:bg-destructive hover:text-destructive-foreground">
                  <Trash className="mr-2 h-4 w-4" />
                  Revoke All Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card className="bg-zippy-darkGray border-zippy-gray">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Theme</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="relative cursor-pointer">
                      <div className="aspect-video rounded-md bg-zinc-950 border border-zippy-gray overflow-hidden">
                        <div className="h-full flex">
                          <div className="w-1/4 bg-zinc-800"></div>
                          <div className="flex-1 bg-zinc-950 p-2">
                            <div className="h-2 w-16 bg-zinc-800 rounded-full mb-2"></div>
                            <div className="h-2 w-12 bg-zinc-800 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-4 w-4 rounded-full border-2 border-zippy-purple bg-zippy-dark"></div>
                          <span className="text-sm">Dark</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative cursor-pointer">
                      <div className="aspect-video rounded-md bg-white border border-gray-200 overflow-hidden">
                        <div className="h-full flex">
                          <div className="w-1/4 bg-gray-100"></div>
                          <div className="flex-1 bg-white p-2">
                            <div className="h-2 w-16 bg-gray-200 rounded-full mb-2"></div>
                            <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                          <span className="text-sm">Light</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative cursor-pointer">
                      <div className="aspect-video rounded-md overflow-hidden border border-zippy-gray">
                        <div className="h-full flex">
                          <div className="w-1/4 bg-zinc-800"></div>
                          <div className="flex-1 bg-zinc-950 p-2">
                            <div className="h-full flex flex-col justify-between">
                              <div>
                                <div className="h-2 w-16 bg-zinc-800 rounded-full mb-2"></div>
                                <div className="h-2 w-12 bg-zinc-800 rounded-full"></div>
                              </div>
                              <div className="h-8 bg-gradient-to-r from-zippy-purple to-purple-600 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                          <span className="text-sm">Zippy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">Color Scheme</div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div className="flex flex-col items-center space-y-1.5">
                      <div className="h-8 w-8 rounded-full bg-purple-600"></div>
                      <span className="text-xs">Purple</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                      <div className="h-8 w-8 rounded-full bg-blue-600"></div>
                      <span className="text-xs">Blue</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                      <div className="h-8 w-8 rounded-full bg-green-600"></div>
                      <span className="text-xs">Green</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                      <div className="h-8 w-8 rounded-full bg-orange-600"></div>
                      <span className="text-xs">Orange</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                      <div className="h-8 w-8 rounded-full bg-red-600"></div>
                      <span className="text-xs">Red</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-zippy-gray" />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Compact Mode</div>
                      <div className="text-sm text-muted-foreground">Reduce spacing and size of UI elements</div>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Reduce Motion</div>
                      <div className="text-sm text-muted-foreground">Decrease the amount of animations</div>
                    </div>
                    <Switch id="reduce-motion" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Show Quick Actions</div>
                      <div className="text-sm text-muted-foreground">Display quick action buttons in cards and tables</div>
                    </div>
                    <Switch id="quick-actions" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="bg-zippy-darkGray border-zippy-gray">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-4">General Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive email notifications for important updates</div>
                      </div>
                      <Switch id="email-notifications-general" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive push notifications in your browser</div>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive text messages for critical alerts</div>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-zippy-gray" />
                
                <div>
                  <h3 className="font-medium text-lg mb-4">System Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">New Bookings</div>
                        <div className="text-sm text-muted-foreground">When a new booking is made</div>
                      </div>
                      <Switch id="new-bookings" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Booking Cancellations</div>
                        <div className="text-sm text-muted-foreground">When a booking is cancelled</div>
                      </div>
                      <Switch id="booking-cancellations" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Schedule Changes</div>
                        <div className="text-sm text-muted-foreground">When a schedule is modified</div>
                      </div>
                      <Switch id="schedule-changes" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">System Updates</div>
                        <div className="text-sm text-muted-foreground">Important system updates and maintenance notices</div>
                      </div>
                      <Switch id="system-updates" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-zippy-gray" />
                
                <div>
                  <h3 className="font-medium text-lg mb-4">Marketing Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Product Updates</div>
                        <div className="text-sm text-muted-foreground">New features and improvements</div>
                      </div>
                      <Switch id="product-updates" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Tips & Tutorials</div>
                        <div className="text-sm text-muted-foreground">Tips on using the platform effectively</div>
                      </div>
                      <Switch id="tips-tutorials" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Promotions & Offers</div>
                        <div className="text-sm text-muted-foreground">Special promotions and limited-time offers</div>
                      </div>
                      <Switch id="promotions-offers" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="company">
          <Card className="bg-zippy-darkGray border-zippy-gray">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Manage your company details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name" 
                    defaultValue="ZippyTrip Inc." 
                    className="bg-zippy-darkGray border-zippy-gray" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input 
                    id="company-website" 
                    defaultValue="https://zippytrip.example.com" 
                    className="bg-zippy-darkGray border-zippy-gray" 
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Contact Email</Label>
                    <Input 
                      id="company-email" 
                      type="email" 
                      defaultValue="contact@zippytrip.example.com" 
                      className="bg-zippy-darkGray border-zippy-gray" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Contact Phone</Label>
                    <Input 
                      id="company-phone" 
                      type="tel" 
                      defaultValue="+1 (555) 000-0000" 
                      className="bg-zippy-darkGray border-zippy-gray" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-address">Business Address</Label>
                  <Textarea 
                    id="company-address" 
                    defaultValue="123 Transport Ave, Suite 456, New York, NY 10001, USA" 
                    className="min-h-20 bg-zippy-darkGray border-zippy-gray"
                  />
                </div>
                
                <Separator className="bg-zippy-gray" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Company Logo</h3>
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-zippy-purple rounded-md flex items-center justify-center">
                        <span className="text-white text-lg font-bold">ZT</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <Button variant="outline" className="bg-zippy-gray border-zippy-lightGray relative">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New Logo
                            <input type="file" className="absolute inset-0 opacity-0" />
                          </Button>
                          <Button variant="outline" className="text-destructive bg-zippy-gray border-zippy-lightGray hover:bg-destructive hover:text-destructive-foreground">
                            <Trash className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Recommended size: 512x512px. PNG or SVG format.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Brand Colors</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex">
                          <div className="h-10 w-10 bg-zippy-purple rounded-l-md"></div>
                          <Input 
                            id="primary-color" 
                            defaultValue="#8B5CF6" 
                            className="rounded-l-none bg-zippy-darkGray border-zippy-gray" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondary-color">Secondary Color</Label>
                        <div className="flex">
                          <div className="h-10 w-10 bg-blue-500 rounded-l-md"></div>
                          <Input 
                            id="secondary-color" 
                            defaultValue="#3B82F6" 
                            className="rounded-l-none bg-zippy-darkGray border-zippy-gray" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <div className="flex">
                          <div className="h-10 w-10 bg-green-500 rounded-l-md"></div>
                          <Input 
                            id="accent-color" 
                            defaultValue="#22C55E" 
                            className="rounded-l-none bg-zippy-darkGray border-zippy-gray" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="text-color">Text Color</Label>
                        <div className="flex">
                          <div className="h-10 w-10 bg-white rounded-l-md"></div>
                          <Input 
                            id="text-color" 
                            defaultValue="#FFFFFF" 
                            className="rounded-l-none bg-zippy-darkGray border-zippy-gray" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-zippy-purple hover:bg-zippy-darkPurple">
                  <Save className="mr-2 h-4 w-4" />
                  Save Company Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
