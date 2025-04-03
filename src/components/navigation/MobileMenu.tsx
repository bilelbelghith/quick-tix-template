
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

type DropdownItem = {
  name: string;
  href: string;
};

type MenuItem = {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
};

interface MobileMenuProps {
  menuItems: MenuItem[];
  onInteraction: (item: string, isDropdown: boolean, device: 'mobile' | 'desktop') => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems, onInteraction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleDropdown = (name: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleNavItemClick = (item: MenuItem | DropdownItem, isDropdownItem: boolean = false) => {
    onInteraction(item.name, isDropdownItem, 'mobile');
    if (!isDropdownItem) {
      setIsOpen(false);
    }
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="text-foreground"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t z-50"
          >
            <div className="container mx-auto py-4">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 pb-2">
                    {item.dropdown ? (
                      <>
                        <button 
                          onClick={() => handleToggleDropdown(item.name)}
                          className="flex w-full justify-between items-center text-left p-2 hover:bg-purple-50 rounded-md"
                        >
                          <span>{item.name}</span>
                          <motion.span
                            animate={{ rotate: expandedItems[item.name] ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12">
                              <path 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                d="M2 4L6 8L10 4"
                              />
                            </svg>
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {expandedItems[item.name] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mt-2 space-y-1"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="block p-2 text-sm hover:bg-purple-50 rounded-md"
                                  onClick={() => handleNavItemClick(subItem, true)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href || "#"}
                        className="block p-2 hover:bg-purple-50 rounded-md"
                        onClick={() => handleNavItemClick(item)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-2">
                  <Link to="/resources" className="block p-2 hover:bg-purple-50 rounded-md" onClick={() => handleNavItemClick({name: "Resources", href: "/resources"})}>
                    Resources
                  </Link>
                </div>
                <div className="pt-2">
                  <Link to="/onboarding">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleNavItemClick({name: "Get Started", href: "/onboarding"})}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
