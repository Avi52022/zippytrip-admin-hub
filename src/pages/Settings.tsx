
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  UserCog,
  Lock,
  BellRing,
  Palette,
  Globe,
  HelpCircle,
  ShieldCheck,
  Cog,
  Server,
  UserPlus,
  Mail,
  Send,
  Save,
  Check
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Settings = () => {
  const { toast } = useToast();
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [isPushNotifications, setIsPushNotifications] = useState(true);
  const [isMarketingEmails, setIsMarketingEmails] = useState(false);
  
  const handleSave = () => {
    toast({
      title: "Settings saved successfully",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-zippy-gray">
          <TabsTrigger value="profile">
            <UserCog className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellRing className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="system">
            <Server className="h-4 w-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback className="bg-zippy-purple text-lg">OP</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="bg-zippy-darkGray border-zippy-gray">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    defaultValue="John Operator"
                    className="bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      defaultValue="john@zippytrip.com"
                      className="bg-zippy-gray border-zippy-lightGray"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone number"
                      defaultValue="+1 (555) 123-4567"
                      className="bg-zippy-gray border-zippy-lightGray"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Job Title</Label>
                  <Input
                    id="position"
                    placeholder="Your position"
                    defaultValue="Bus Fleet Manager"
                    className="bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="A brief description about yourself"
                    defaultValue="Experienced bus fleet manager with 10+ years in the transportation industry."
                    className="min-h-[100px] bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                <Button 
                  onClick={handleSave}
                  className="bg-zippy-purple hover:bg-zippy-darkPurple"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card className="bg-zippy-darkGray border-zippy-gray">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Details about your company
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Company name"
                      defaultValue="ZippyTrip Bus Services"
                      className="bg-zippy-gray border-zippy-lightGray"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select defaultValue="transportation">
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="tourism">Tourism</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Your business address"
                      defaultValue="123 Transit Avenue,
New York, NY 10001,
United States"
                      className="min-h-[100px] bg-zippy-gray border-zippy-lightGray"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://www.example.com"
                      defaultValue="https://www.zippytrip.com"
                      className="bg-zippy-gray border-zippy-lightGray"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                  <Button 
                    onClick={handleSave}
                    className="bg-zippy-purple hover:bg-zippy-darkPurple"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-zippy-darkGray border-zippy-gray">
                <CardHeader>
                  <CardTitle>Social Profiles</CardTitle>
                  <CardDescription>
                    Connect your social media accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/username"
                      defaultValue="https://twitter.com/zippytrip"
                      className="bg-zippy-gray border-zippy-lightGray"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      placeholder="https://facebook.com/username"
                      defaultValue="https://facebook.com/zippytrip"
                      className="bg-zippy-gray border-zippy-lightGray"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      defaultValue="https://linkedin.com/company/zippytrip"
                      className="bg-zippy-gray border-zippy-lightGray"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                  <Button 
                    onClick={handleSave}
                    className="bg-zippy-purple hover:bg-zippy-darkPurple"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zippy-gray border-zippy-lightGray"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                <Button 
                  onClick={handleSave}
                  className="bg-zippy-purple hover:bg-zippy-darkPurple"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Secure your account with 2FA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Text Message (SMS)</div>
                    <div className="text-sm text-muted-foreground">
                      Use your phone as a second factor
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Authenticator App</div>
                    <div className="text-sm text-muted-foreground">
                      Use an authenticator app for 2FA codes
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Security Keys</div>
                    <div className="text-sm text-muted-foreground">
                      Use hardware security keys like YubiKey
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start border-t border-zippy-gray pt-5">
                <div className="space-y-2 mb-4 w-full">
                  <div className="font-medium">Recovery Codes</div>
                  <p className="text-sm text-muted-foreground">
                    Generate recovery codes to regain access to your account if you lose your 2FA device.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-zippy-gray border-zippy-lightGray"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Generate Recovery Codes
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-2">
              <CardHeader>
                <CardTitle>Account Access</CardTitle>
                <CardDescription>
                  Manage account permissions and authorized devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium mb-2">Roles and Permissions</div>
                  <div className="flex items-center p-3 bg-zippy-gray rounded-md justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-zippy-purple bg-opacity-20 p-2 rounded-full">
                        <UserCog className="h-5 w-5 text-zippy-purple" />
                      </div>
                      <div>
                        <div className="font-medium">Administrator</div>
                        <div className="text-sm text-muted-foreground">
                          Full access to all settings
                        </div>
                      </div>
                    </div>
                    <div className="text-sm bg-zippy-purple text-white px-2 py-1 rounded-full">
                      Current
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium mb-2">Active Sessions</div>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-zippy-gray rounded-md justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-500 bg-opacity-20 p-2 rounded-full">
                          <Cog className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <div className="font-medium">Mac OSX – Chrome</div>
                          <div className="text-sm text-muted-foreground">
                            New York, USA · Current Session
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        End
                      </Button>
                    </div>
                    
                    <div className="flex items-center p-3 bg-zippy-gray rounded-md justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-amber-500 bg-opacity-20 p-2 rounded-full">
                          <Cog className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-medium">iPhone 12 – Safari</div>
                          <div className="text-sm text-muted-foreground">
                            New York, USA · 2 days ago
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        End
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                <Button variant="destructive">
                  Sign Out All Devices
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="bg-zippy-darkGray border-zippy-gray">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Trip Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Notifications about schedule changes, delays, and cancellations
                      </div>
                    </div>
                    <Switch 
                      checked={isEmailNotifications}
                      onCheckedChange={setIsEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Maintenance Reminders</div>
                      <div className="text-sm text-muted-foreground">
                        Reminders about upcoming bus maintenance
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Revenue Reports</div>
                      <div className="text-sm text-muted-foreground">
                        Daily and weekly revenue reports
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Marketing Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Special offers, new features, and system updates
                      </div>
                    </div>
                    <Switch 
                      checked={isMarketingEmails}
                      onCheckedChange={setIsMarketingEmails}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Push Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Real-time Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Immediate alerts for important issues
                      </div>
                    </div>
                    <Switch 
                      checked={isPushNotifications}
                      onCheckedChange={setIsPushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Booking Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        New bookings and cancellations
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Schedule Changes</div>
                      <div className="text-sm text-muted-foreground">
                        Updates to route schedules and assignments
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Notification Delivery</h3>
                <div className="space-y-2">
                  <Label htmlFor="notificationTime">Daily Digest Time</Label>
                  <Select defaultValue="9am">
                    <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                      <SelectItem value="6am">6:00 AM</SelectItem>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="12pm">12:00 PM</SelectItem>
                      <SelectItem value="3pm">3:00 PM</SelectItem>
                      <SelectItem value="6pm">6:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Daily summary notifications will be sent at this time
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
              <Button 
                onClick={handleSave}
                className="bg-zippy-purple hover:bg-zippy-darkPurple"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-zippy-gray rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">ZippyTrip Business Pro</div>
                    <Badge className="bg-zippy-purple">Current Plan</Badge>
                  </div>
                  <div className="text-2xl font-bold mb-2">$199.99/month</div>
                  <div className="text-sm text-muted-foreground">
                    Billed monthly · Next payment on Nov 28, 2023
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-zippy-purple mr-2" />
                      <span className="text-sm">Unlimited routes</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-zippy-purple mr-2" />
                      <span className="text-sm">Advanced analytics</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-zippy-purple mr-2" />
                      <span className="text-sm">Fleet management tools</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-zippy-purple mr-2" />
                      <span className="text-sm">24/7 premium support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-zippy-purple mr-2" />
                      <span className="text-sm">Route optimization</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="bg-zippy-gray border-zippy-lightGray flex-1">
                    Manage Subscription
                  </Button>
                  <Button className="bg-zippy-purple hover:bg-zippy-darkPurple flex-1">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-zippy-gray rounded-md flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded">
                      <CreditCard className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-muted-foreground">
                        Expires 09/2025
                      </div>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
                
                <div className="p-4 bg-zippy-gray rounded-md flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 p-2 rounded">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Mastercard ending in 8888</div>
                      <div className="text-sm text-muted-foreground">
                        Expires 12/2024
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    Make Default
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full bg-zippy-gray border-zippy-lightGray">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-2">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View your recent invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-zippy-gray p-4 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-medium">Invoice #INV-2023-11</div>
                      <div className="text-sm text-muted-foreground">
                        October 28, 2023
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="font-medium">$199.99</div>
                      <Badge className="bg-green-500">Paid</Badge>
                      <Button variant="outline" size="sm" className="h-8 bg-zippy-darkGray border-zippy-gray">
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-zippy-gray p-4 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-medium">Invoice #INV-2023-10</div>
                      <div className="text-sm text-muted-foreground">
                        September 28, 2023
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="font-medium">$199.99</div>
                      <Badge className="bg-green-500">Paid</Badge>
                      <Button variant="outline" size="sm" className="h-8 bg-zippy-darkGray border-zippy-gray">
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-zippy-gray p-4 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-medium">Invoice #INV-2023-09</div>
                      <div className="text-sm text-muted-foreground">
                        August 28, 2023
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="font-medium">$199.99</div>
                      <Badge className="bg-green-500">Paid</Badge>
                      <Button variant="outline" size="sm" className="h-8 bg-zippy-darkGray border-zippy-gray">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                <Button variant="outline" className="bg-zippy-gray border-zippy-lightGray">
                  View All Invoices
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card className="bg-zippy-darkGray border-zippy-gray">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the app's look and feel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-zippy-purple rounded-md p-4 bg-zippy-dark flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-20 w-full bg-zippy-dark border border-zippy-gray rounded-md"></div>
                    <div className="font-medium">Dark</div>
                    <Badge className="bg-zippy-purple">Current</Badge>
                  </div>
                  
                  <div className="border border-zippy-gray rounded-md p-4 bg-zippy-dark flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-20 w-full bg-white border border-gray-200 rounded-md"></div>
                    <div className="font-medium">Light</div>
                  </div>
                  
                  <div className="border border-zippy-gray rounded-md p-4 bg-zippy-dark flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-20 w-full bg-gradient-to-r from-zippy-dark to-white rounded-md"></div>
                    <div className="font-medium">Auto</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Accent Color</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                  <div className="border border-zippy-purple rounded-md p-2 flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-12 w-12 bg-zippy-purple rounded-full"></div>
                    <div className="text-xs">Purple</div>
                  </div>
                  
                  <div className="border border-zippy-gray rounded-md p-2 flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-12 w-12 bg-blue-500 rounded-full"></div>
                    <div className="text-xs">Blue</div>
                  </div>
                  
                  <div className="border border-zippy-gray rounded-md p-2 flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-12 w-12 bg-green-500 rounded-full"></div>
                    <div className="text-xs">Green</div>
                  </div>
                  
                  <div className="border border-zippy-gray rounded-md p-2 flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-12 w-12 bg-amber-500 rounded-full"></div>
                    <div className="text-xs">Amber</div>
                  </div>
                  
                  <div className="border border-zippy-gray rounded-md p-2 flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-12 w-12 bg-red-500 rounded-full"></div>
                    <div className="text-xs">Red</div>
                  </div>
                  
                  <div className="border border-zippy-gray rounded-md p-2 flex flex-col items-center space-y-2 cursor-pointer">
                    <div className="h-12 w-12 bg-pink-500 rounded-full"></div>
                    <div className="text-xs">Pink</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Sidebar Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Compact Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Use smaller icons and spacing in the sidebar
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Auto-collapse</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically collapse sidebar on small screens
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Dashboard Layout</h3>
                <Select defaultValue="grid">
                  <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                    <SelectItem value="grid">Grid Layout</SelectItem>
                    <SelectItem value="list">List Layout</SelectItem>
                    <SelectItem value="compact">Compact Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
              <Button 
                onClick={handleSave}
                className="bg-zippy-purple hover:bg-zippy-darkPurple"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system behavior and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Time and Date</h3>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america-new-york">
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="america-new-york">America/New_York</SelectItem>
                        <SelectItem value="america-chicago">America/Chicago</SelectItem>
                        <SelectItem value="america-denver">America/Denver</SelectItem>
                        <SelectItem value="america-los-angeles">America/Los_Angeles</SelectItem>
                        <SelectItem value="asia-kolkata">Asia/Kolkata</SelectItem>
                        <SelectItem value="europe-london">Europe/London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Language and Region</h3>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
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
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                <Button 
                  onClick={handleSave}
                  className="bg-zippy-purple hover:bg-zippy-darkPurple"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray">
              <CardHeader>
                <CardTitle>Export & Import</CardTitle>
                <CardDescription>
                  Manage your data backup and restoration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Export Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Export your routes, schedules, and other data in various formats
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" className="bg-zippy-gray border-zippy-lightGray">
                      Export as CSV
                    </Button>
                    <Button variant="outline" className="bg-zippy-gray border-zippy-lightGray">
                      Export as JSON
                    </Button>
                    <Button variant="outline" className="bg-zippy-gray border-zippy-lightGray">
                      Export as PDF
                    </Button>
                    <Button variant="outline" className="bg-zippy-gray border-zippy-lightGray">
                      Export as Excel
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Import Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Import routes, schedules, and other data from supported formats
                  </p>
                  <div className="mt-2">
                    <Button className="bg-zippy-purple hover:bg-zippy-darkPurple w-full">
                      Import Data
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Data Backup</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Automatic Backups</div>
                      <div className="text-sm text-muted-foreground">
                        Create daily backups of your data
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="mt-2">
                    <Select defaultValue="daily">
                      <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                        <SelectValue placeholder="Backup frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                <Button className="bg-zippy-purple hover:bg-zippy-darkPurple">
                  Create Manual Backup
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-zippy-darkGray border-zippy-gray md:col-span-2">
              <CardHeader>
                <CardTitle>Support & Help</CardTitle>
                <CardDescription>
                  Get help and contact support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-zippy-gray p-6 rounded-md flex flex-col items-center text-center">
                    <HelpCircle className="h-10 w-10 text-zippy-purple mb-4" />
                    <h3 className="font-medium mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Access comprehensive guides and tutorials
                    </p>
                    <Button variant="outline" className="w-full bg-zippy-darkGray border-zippy-gray">
                      View Docs
                    </Button>
                  </div>
                  
                  <div className="bg-zippy-gray p-6 rounded-md flex flex-col items-center text-center">
                    <Mail className="h-10 w-10 text-zippy-purple mb-4" />
                    <h3 className="font-medium mb-2">Contact Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get help from our support team
                    </p>
                    <Button variant="outline" className="w-full bg-zippy-darkGray border-zippy-gray">
                      Contact Us
                    </Button>
                  </div>
                  
                  <div className="bg-zippy-gray p-6 rounded-md flex flex-col items-center text-center">
                    <Globe className="h-10 w-10 text-zippy-purple mb-4" />
                    <h3 className="font-medium mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Join our community of operators
                    </p>
                    <Button variant="outline" className="w-full bg-zippy-darkGray border-zippy-gray">
                      Join Forum
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Send Feedback</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="feedbackType">Feedback Type</Label>
                      <Select defaultValue="feature">
                        <SelectTrigger className="bg-zippy-gray border-zippy-lightGray">
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zippy-darkGray border-zippy-gray">
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="suggestion">Suggestion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="feedbackMessage">Your Feedback</Label>
                      <Textarea
                        id="feedbackMessage"
                        placeholder="Describe your feedback, issue, or suggestion..."
                        className="min-h-[100px] bg-zippy-gray border-zippy-lightGray"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-zippy-gray pt-5">
                <Button className="bg-zippy-purple hover:bg-zippy-darkPurple">
                  <Send className="mr-2 h-4 w-4" />
                  Send Feedback
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
