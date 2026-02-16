import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import "../../../styles/NavbarDropdown.css";
interface DropdownItem {
  label: string;
  path: string;
  badge?: string;
}

interface NavbarDropdownProps {
  title: string;
  items: DropdownItem[];
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="navbar-dropdown" ref={dropdownRef}>
      <button
        className={`navbar-item dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown 
          size={16} 
          className={`dropdown-icon ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              {item.badge && (
                <span className="item-badge">{item.badge}</span>
              )}
            </Link>
          ))}
        </div>
      )}

    
    </div>
  );
};

export default NavbarDropdown;