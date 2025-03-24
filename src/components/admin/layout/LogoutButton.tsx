
import React from 'react';
import { Link } from 'react-router-dom';
import { logoutItem } from './menuItems';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className = "" }) => {
  return (
    <Link to={logoutItem.path} className={`flex items-center text-red-500 hover:text-red-600 ${className}`}>
      {logoutItem.icon}
      <span className="ml-3 truncate">{logoutItem.name}</span>
    </Link>
  );
};
