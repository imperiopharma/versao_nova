
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { CategoryMenu } from './CategoryMenu';

interface DesktopNavProps {
  categoryMenuOpen: boolean;
  setCategoryMenuOpen: (open: boolean) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  categoryMenuOpen,
  setCategoryMenuOpen
}) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/marcas" 
        className="font-medium hover:text-imperio-navy transition-colors relative group"
      >
        <span>Marcas</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
      </Link>
      <Link 
        to="/fretes" 
        className="font-medium hover:text-imperio-navy transition-colors relative group"
      >
        <span>Fretes</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
      </Link>
      <div 
        className="relative group"
        onMouseEnter={() => setCategoryMenuOpen(true)}
        onMouseLeave={() => setCategoryMenuOpen(false)}
      >
        <button className="flex items-center space-x-1 font-medium hover:text-imperio-navy transition-colors">
          <span>Categorias</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${categoryMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <CategoryMenu isOpen={categoryMenuOpen} />
      </div>
    </nav>
  );
};
