
import React from 'react';
import { Link } from 'react-router-dom';
import { logoutItem } from './menuItems';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className = "" }) => {
  const handleLogout = () => {
    // O redirecionamento e limpeza de storage será feito pelo componente AdminLogout
    // mas poderíamos adicionar lógica adicional aqui se necessário
  };

  return (
    <Link 
      to={logoutItem.path} 
      className={`flex items-center text-red-500 hover:text-red-600 ${className}`}
      onClick={handleLogout}
    >
      {logoutItem.icon}
      <span className="ml-3 truncate">{logoutItem.name}</span>
    </Link>
  );
};
