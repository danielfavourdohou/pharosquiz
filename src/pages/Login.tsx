
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get returnUrl from query params
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(returnUrl);
    }
  }, [isAuthenticated, navigate, returnUrl]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn({ email, password });
      
      if (error) {
        console.error('Login error:', error);
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        return;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      // Navigate to return URL or dashboard
      navigate(returnUrl);
    } catch (error: any) {
      console.error('Unexpected login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error?.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pharos-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-pharos-secondary/20 rounded-full blur-[100px]" />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center text-black font-bold text-xl mx-auto">
              P
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">
            Log in to your account to continue
          </p>
        </div>
        
        <div className="bg-card border rounded-xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-pharos-primary hover:text-pharos-primary/80">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to={`/register${location.search}`} className="text-pharos-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
