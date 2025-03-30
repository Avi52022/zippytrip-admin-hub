
import { useState } from "react";
import { 
  Bell, 
  Check, 
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form validation schema
const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  bio: z.string().optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUploading, setIsUploading] = useState(false);

  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    jobTitle: user?.jobTitle || "Fleet Manager",
    bio: user?.bio || ""
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues
  });

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, you would save this to your backend
    console.log("Form submitted", data);
    
    // Show success message
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleImageUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Image uploaded",
        description: "Your profile picture has been updated successfully.",
      });
    }, 1500);
  };

  const handleImageRemove = () => {
    toast({
      title: "Image removed",
      description: "Your profile picture has been removed.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            className="bg-zippy-purple hover:bg-zippy-darkPurple"
            onClick={form.handleSubmit(onSubmit)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="profile" 
        className="space-y-6"
        value={activeTab}
        onValueChange={setActiveTab}
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
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20 border-2 border-zippy-gray">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-zippy-purple text-white text-xl">
                          {form.getValues("firstName")?.[0]}{form.getValues("lastName")?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            className="bg-zippy-gray border-zippy-lightGray"
                            onClick={handleImageUpload}
                            disabled={isUploading}
                            type="button"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {isUploading ? "Uploading..." : "Upload"}
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-destructive bg-zippy-gray border-zippy-lightGray hover:bg-destructive hover:text-destructive-foreground"
                            onClick={handleImageRemove}
                            type="button"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="John" 
                                className="bg-zippy-darkGray border-zippy-gray" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Doe" 
                                className="bg-zippy-darkGray border-zippy-gray" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="john.doe@example.com" 
                              className="bg-zippy-darkGray border-zippy-gray" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="tel" 
                              placeholder="+1 (555) 000-0000" 
                              className="bg-zippy-darkGray border-zippy-gray" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job title</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Fleet Manager" 
                              className="bg-zippy-darkGray border-zippy-gray" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field}
                              placeholder="I manage the fleet operations and route scheduling for ZippyTrip" 
                              className="min-h-32 bg-zippy-darkGray border-zippy-gray"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
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
                  <div className="font-medium">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Last Login</div>
                  <div className="font-medium">Today, {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                </div>
                
                <Separator className="bg-zippy-gray" />
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Actions</div>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      className="justify-start bg-zippy-gray border-zippy-lightGray"
                      onClick={() => setActiveTab("security")}
                      type="button"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start bg-zippy-gray border-zippy-lightGray"
                      onClick={() => setActiveTab("security")}
                      type="button"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Two-Factor Authentication
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start text-destructive bg-zippy-gray border-zippy-lightGray hover:bg-destructive hover:text-destructive-foreground"
                      type="button"
                      onClick={() => {
                        toast({
                          variant: "destructive",
                          title: "Are you sure?",
                          description: "This action cannot be undone."
                        });
                      }}
                    >
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
                  <Input id="username" placeholder="johndoe" className="bg-zippy-darkGray border-zippy-gray" />
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
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <Input type="password" id="current-password" className="bg-zippy-darkGray border-zippy-gray" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input type="password" id="new-password" className="bg-zippy-darkGray border-zippy-gray" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <Input type="password" id="confirm-password" className="bg-zippy-darkGray border-zippy-gray" />
                </div>
                
                <div>
                  <Button className="bg-zippy-purple hover:bg-zippy-darkPurple">
                    <Key className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
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
        
        {/* Additional tabs content omitted for brevity */}
      </Tabs>
    </div>
  );
};

export default Settings;
