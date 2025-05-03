
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-pharos-primary/20 mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl font-bold text-pharos-primary">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="gradient-bg">Go Home</Button>
          </Link>
          <Link to="/join-quiz">
            <Button variant="outline">Join a Quiz</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
