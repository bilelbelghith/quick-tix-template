
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
              Tixify
            </span>
          </Link>
        </div>
        
        {/* Right-Aligned Items */}
        <div className="flex items-center space-x-4 ml-auto">
          <Link to="/auth">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
