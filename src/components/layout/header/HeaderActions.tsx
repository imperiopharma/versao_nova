
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

interface HeaderActionsProps {
  itemCount: number;
  menuOpen: boolean;
  toggleMenu: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ 
  itemCount, 
  menuOpen,
  toggleMenu
}) => {
  return (
    <div className="flex items-center space-x-5">
      <button 
        className="hover:text-imperio-navy transition-colors relative group" 
        aria-label="Pesquisar"
      >
        <Search size={20} />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
      </button>
      
      <Link 
        to="/carrinho" 
        className="relative hover:text-imperio-navy transition-colors group" 
        aria-label="Carrinho"
      >
        <ShoppingCart size={20} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-imperio-red text-white text-xs rounded-full animate-pulse-subtle">
            {itemCount}
          </span>
        )}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
      </Link>
      
      <Link 
        to="/login" 
        className="hover:text-imperio-navy transition-colors group relative"
        aria-label="Minha Conta"
      >
        <User size={20} />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
      </Link>
      
      <button 
        className="md:hidden hover:text-imperio-navy transition-colors"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};
