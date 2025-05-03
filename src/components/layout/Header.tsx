
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

export default function Header() {
  const isMobile = useIsMobile();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login/logout for now
  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
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

  const AuthButtons = () => (
    <div className="flex gap-2">
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Button onClick={handleAuth}>Logout</Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  );

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-pharos-primary flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="font-bold text-xl">PharosQuiz</span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <NavLinks />
                <div className="pt-4 mt-4 border-t">
                  <AuthButtons />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-8">
            <nav className="flex space-x-6">
              <NavLinks />
            </nav>
            <AuthButtons />
          </div>
        )}
      </div>
    </header>
  );
}
