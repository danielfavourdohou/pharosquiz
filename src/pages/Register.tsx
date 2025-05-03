
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, isAuthenticated } = useAuth();
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
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp({ email, password });
      
      if (error) {
        console.error('Signup error:', error);
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
        return;
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      
      // Navigate to login page with the same returnUrl
      navigate(`/login${location.search}`);
    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      toast({
        variant: "destructive",
        title: "Registration failed",
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground mt-2">
            Sign up to start creating and joining quizzes
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
              <label htmlFor="password" className="block mb-1 text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to={`/login${location.search}`} className="text-pharos-primary hover:underline">
                Sign in
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
