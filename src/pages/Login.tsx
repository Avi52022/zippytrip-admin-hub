
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Bus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError("");
    setIsLoading(true);
    
    try {
      // Use the login function from AuthContext and await its result
      const success = await login(email, password);
      
      if (success) {
        // Show success toast
        toast({
          title: "Login successful",
          description: "Welcome to ZippyTrip Admin Dashboard!",
        });
        
        // Redirect to dashboard
        navigate("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zippy-dark p-4">
      <Card className="w-full max-w-md bg-zippy-darkGray border-zippy-gray">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="size-12 bg-zippy-purple rounded-full flex items-center justify-center">
              <Bus className="size-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-gradient">ZippyTrip Admin</CardTitle>
          <CardDescription className="text-muted-foreground">Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-zippy-gray border-zippy-lightGray"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-zippy-gray border-zippy-lightGray"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-zippy-purple hover:bg-zippy-darkPurple text-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
          <p className="w-full">© {new Date().getFullYear()} ZippyTrip. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
