
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { MenuItem as MenuItemType } from './menuItems';

interface MenuItemProps {
  item: MenuItemType;
  isMobile?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, isMobile = false }) => {
  const location = useLocation();
  
  // Function to check if a menu item is active
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    if (path !== '/admin' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  // Check if a submenu item is active
  const isSubmenuActive = (submenu: { name: string; path: string }[]) => {
    return submenu.some(item => location.pathname.startsWith(item.path));
  };

  if (item.submenu) {
    return (
      <div className="mb-2">
        <div className={`flex items-center justify-between px-4 py-2 rounded-md ${
          isSubmenuActive(item.submenu) ? 'bg-blue-50 text-imperio-navy' : 'text-gray-700 hover:bg-gray-100'
        }`}>
          <div className="flex items-center">
            {item.icon}
            <span className="ml-3 truncate">{item.name}</span>
          </div>
          <ChevronDown size={16} />
        </div>
        
        <ul className="ml-6 mt-1 space-y-1">
          {item.submenu.map((subItem) => (
            <li key={subItem.name}>
              <Link
                to={subItem.path}
                className={`block px-4 py-2 rounded-md truncate ${
                  location.pathname === subItem.path || location.pathname.startsWith(subItem.path)
                    ? 'bg-blue-50 text-imperio-navy font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`flex items-center px-4 py-2 rounded-md ${
        isActive(item.path) 
          ? 'bg-blue-50 text-imperio-navy font-medium' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {item.icon}
      <span className="ml-3 truncate">{item.name}</span>
    </Link>
  );
};
