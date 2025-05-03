
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, Wallet, LogIn, LogOut, UserPlus, Plus, HomeIcon, TrendingUp, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const NavLinks = () => {
    // Different navigation based on authentication status
    if (isAuthenticated) {
      return (
        <>
          <Link to="/dashboard" className={`text-foreground hover:text-pharos-primary transition-colors ${location.pathname === '/dashboard' ? 'text-pharos-primary font-medium' : ''}`}>
            Dashboard
          </Link>
          <Link to="/my-quizzes" className={`text-foreground hover:text-pharos-primary transition-colors ${location.pathname === '/my-quizzes' ? 'text-pharos-primary font-medium' : ''}`}>
            My Quizzes
          </Link>
          <Link to="/leaderboards" className={`text-foreground hover:text-pharos-primary transition-colors ${location.pathname === '/leaderboards' ? 'text-pharos-primary font-medium' : ''}`}>
            Leaderboards
          </Link>
        </>
      );
    }
    
    return (
      <>
        <Link to="/" className={`text-foreground hover:text-pharos-primary transition-colors ${location.pathname === '/' ? 'text-pharos-primary font-medium' : ''}`}>
          Home
        </Link>
        <Link to="/how-it-works" className={`text-foreground hover:text-pharos-primary transition-colors ${location.pathname === '/how-it-works' ? 'text-pharos-primary font-medium' : ''}`}>
          How It Works
        </Link>
        <Link to="/about" className={`text-foreground hover:text-pharos-primary transition-colors ${location.pathname === '/about' ? 'text-pharos-primary font-medium' : ''}`}>
          About
        </Link>
      </>
    );
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const AuthButtons = () => (
    <div className="flex gap-2">
      {isAuthenticated ? (
        <>
          <Button onClick={() => navigate('/dashboard')} variant="outline" className="hidden sm:flex">
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline" className="border-pharos-primary/20">
              <LogIn className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </Link>
          <Link to="/register">
            <Button className="gradient-bg hidden sm:flex">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  );

  const WalletButton = () => {
    // Check for wallet address in user metadata
    const walletConnected = user?.user_metadata?.wallet_address;
    const walletAddress = user?.user_metadata?.wallet_address || '';
    
    return walletConnected ? (
      <Button 
        variant="outline" 
        className="border-primary/20 bg-gray-800/30 text-pharos-primary"
      >
        <Wallet className="h-4 w-4 mr-2 text-green-500" />
        {truncateAddress(walletAddress)}
      </Button>
    ) : (
      <Link to="/wallet-connect">
        <Button 
          variant="outline" 
          className="border-primary/20 hover:bg-gray-800/30"
        >
          <Wallet className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Connect Wallet</span>
        </Button>
      </Link>
    );
  };

  return (
    <header className={`border-b sticky top-0 bg-background z-40 transition-all duration-200 ${scrolled ? 'backdrop-blur-md bg-background/80 shadow-md' : ''}`}>
      <div className="container mx-auto flex justify-between items-center py-3">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="h-9 w-9 rounded-full gradient-bg flex items-center justify-center text-black font-bold text-lg">
            P
          </div>
          <span className="font-bold text-xl hidden xs:inline-block">PharosQuiz</span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Link to="/create-quiz">
                <Button size="icon" className="bg-pharos-primary hover:bg-pharos-primary/80 text-black">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-6 mt-4">
                    <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-black font-bold text-xl">
                      P
                    </div>
                    <span className="font-bold text-xl">PharosQuiz</span>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {isAuthenticated ? (
                      <>
                        <Link to="/dashboard" className="flex items-center gap-2 py-2 hover:text-pharos-primary transition-colors">
                          <HomeIcon size={16} />
                          Dashboard
                        </Link>
                        <Link to="/my-quizzes" className="flex items-center gap-2 py-2 hover:text-pharos-primary transition-colors">
                          <TrendingUp size={16} />
                          My Quizzes
                        </Link>
                        <Link to="/create-quiz" className="flex items-center gap-2 py-2 text-pharos-primary hover:text-pharos-primary/80 transition-colors">
                          <Plus size={16} />
                          Host a Quiz
                        </Link>
                        <Link to="/join-quiz" className="flex items-center gap-2 py-2 hover:text-pharos-primary transition-colors">
                          <LogIn size={16} />
                          Join a Quiz
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/" className="flex items-center gap-2 py-2 hover:text-pharos-primary transition-colors">
                          <HomeIcon size={16} />
                          Home
                        </Link>
                        <Link to="/how-it-works" className="flex items-center gap-2 py-2 hover:text-pharos-primary transition-colors">
                          <TrendingUp size={16} />
                          How It Works
                        </Link>
                        <Link to="/about" className="flex items-center gap-2 py-2 hover:text-pharos-primary transition-colors">
                          <User size={16} />
                          About
                        </Link>
                      </>
                    )}
                  </nav>
                  
                  <div className="mt-auto">
                    {isAuthenticated && <WalletButton />}
                    <div className="pt-4 mt-4 border-t flex flex-col gap-2">
                      {isAuthenticated ? (
                        <Button onClick={handleLogout} className="w-full justify-start">
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      ) : (
                        <>
                          <Link to="/login" className="w-full">
                            <Button variant="outline" className="w-full justify-start">
                              <LogIn className="h-4 w-4 mr-2" />
                              Login
                            </Button>
                          </Link>
                          <Link to="/register" className="w-full">
                            <Button className="w-full justify-start gradient-bg">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Sign Up
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <nav className="flex space-x-6">
              <NavLinks />
            </nav>
            {isAuthenticated && <WalletButton />}
            <AuthButtons />
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
}
