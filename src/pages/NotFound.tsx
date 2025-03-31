
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {location.pathname.includes('onboarding') || 
           location.pathname.includes('templates') || 
           location.pathname.includes('customize') ||
           location.pathname.includes('pricing') ||
           location.pathname.includes('features')
            ? "This page is coming soon!" 
            : "Oops! Page not found"}
        </p>
        <Link to="/">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
