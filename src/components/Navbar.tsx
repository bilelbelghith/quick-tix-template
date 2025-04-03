
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavItem from './navigation/NavItem';
import MobileMenu from './navigation/MobileMenu';

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Examples", href: "/templates" }, // Formerly "Templates"
  { 
    name: "Use Cases", 
    dropdown: [
      { name: "Music Events", href: "/use-cases/music" },
      { name: "Workshops", href: "/use-cases/workshops" },
      { name: "Sports", href: "/use-cases/sports" }
    ]
  },
  {
    name: "Pricing",
    dropdown: [
      { name: "Plans", href: "/pricing" },
      { name: "Calculator", href: "/pricing-calculator" }
    ]
  }
];

const Navbar: React.FC = () => {
  // Track menu interactions
  const trackNavInteraction = (
    item: string, 
    isDropdown: boolean, 
    device: 'mobile' | 'desktop'
  ) => {
    console.log('nav_click', { item, isDropdown, device });
    // In a real application, you would implement an analytics tracking call here
    // track('nav_click', { item, isDropdown, device });
  };

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
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <NavItem 
              key={item.name}
              name={item.name}
              href={item.href}
              dropdown={item.dropdown}
              onInteraction={trackNavInteraction}
            />
          ))}
        </div>
        
        {/* Right-Aligned Items - Desktop */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <Link to="/resources" className="text-sm font-medium hover:text-primary transition-colors nav-item">
            Resources
          </Link>
          <Link to="/onboarding">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        <MobileMenu menuItems={menuItems} onInteraction={trackNavInteraction} />
      </div>
    </nav>
  );
};

export default Navbar;
