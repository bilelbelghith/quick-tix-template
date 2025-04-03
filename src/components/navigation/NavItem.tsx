
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DropdownItem = {
  name: string;
  href: string;
};

type NavItemProps = {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
  onInteraction?: (item: string, isDropdown: boolean, device: 'mobile' | 'desktop') => void;
};

const NavItem: React.FC<NavItemProps> = ({ name, href, dropdown, onInteraction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = href ? location.pathname === href : false;
  
  const isDesktop = window.innerWidth >= 768;
  
  const handleClick = () => {
    if (href && onInteraction) {
      onInteraction(name, false, isDesktop ? 'desktop' : 'mobile');
    }
  };
  
  const handleDropdownClick = (item: DropdownItem) => {
    if (onInteraction) {
      onInteraction(item.name, true, isDesktop ? 'desktop' : 'mobile');
    }
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, scaleY: 0, height: 0 },
    visible: { opacity: 1, scaleY: 1, height: 'auto', transition: { duration: 0.3 } }
  };

  return (
    <div className="relative nav-item" ref={dropdownRef}>
      {href ? (
        <Link 
          to={href} 
          className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary font-semibold active' : ''}`}
          onClick={handleClick}
          onMouseEnter={() => dropdown && setIsOpen(true)}
          onMouseLeave={() => dropdown && setIsOpen(false)}
        >
          <div className="flex items-center gap-1">
            {name}
            {dropdown && <ChevronDown className="h-4 w-4" />}
          </div>
        </Link>
      ) : (
        <button 
          className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${isActive ? 'text-primary font-semibold active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => dropdown && setIsOpen(true)}
          onMouseLeave={() => dropdown && setIsOpen(false)}
        >
          {name}
          {dropdown && <ChevronDown className="h-4 w-4" />}
        </button>
      )}

      {dropdown && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 mt-2 z-50 nav-dropdown bg-white rounded-md shadow-lg py-2 border border-gray-100"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              {dropdown.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-sm hover:bg-purple-100 transition-colors"
                  onClick={() => handleDropdownClick(item)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default NavItem;
