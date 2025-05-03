
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, Wallet, LogIn, LogOut, UserPlus } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const isMobile = useIsMobile();
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="text-foreground hover:text-pharos-primary transition-colors">
        Home
      </Link>
      <Link to="/how-it-works" className="text-foreground hover:text-pharos-primary transition-colors">
        How It Works
      </Link>
      <Link to="/about" className="text-foreground hover:text-pharos-primary transition-colors">
        About
      </Link>
    </>
  );

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const AuthButtons = () => (
    <div className="flex gap-2">
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Button onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button>
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
        className="border-primary/20"
        disabled
      >
        <Wallet className="h-4 w-4 mr-2 text-green-500" />
        {truncateAddress(walletAddress)}
      </Button>
    ) : (
      <Link to="/wallet-connect">
        <Button 
          variant="outline" 
          className="border-primary/20"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </Link>
    );
  };

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="font-bold text-xl">PharosQuiz</span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                  <div className="mt-4">
                    <WalletButton />
                  </div>
                  <div className="pt-4 mt-4 border-t">
                    <AuthButtons />
                  </div>
                </nav>
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
