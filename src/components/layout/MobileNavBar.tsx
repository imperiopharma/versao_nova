
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TruckIcon, TagsIcon, HomeIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { motion } from 'framer-motion';

export const MobileNavBar: React.FC = () => {
  const location = useLocation();
  const { itemCount } = useCart();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-elevation z-50">
      <div className="grid grid-cols-5 h-16">
        <Link 
          to="/marcas" 
          className={`flex flex-col items-center justify-center space-y-1 px-1 ${
            isActive('/marcas') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <div className="relative">
            {isActive('/marcas') && (
              <motion.div 
                className="absolute -top-1 left-1/2 w-1 h-1 bg-imperio-navy rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId="navIndicator"
              />
            )}
            <TagsIcon size={20} />
          </div>
          <span className="text-xs truncate">Marcas</span>
        </Link>
        
        <Link 
          to="/fretes" 
          className={`flex flex-col items-center justify-center space-y-1 px-1 ${
            isActive('/fretes') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <div className="relative">
            {isActive('/fretes') && (
              <motion.div 
                className="absolute -top-1 left-1/2 w-1 h-1 bg-imperio-navy rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId="navIndicator"
              />
            )}
            <TruckIcon size={20} />
          </div>
          <span className="text-xs truncate">Fretes</span>
        </Link>
        
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center space-y-1 px-1 ${
            isActive('/') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <div className="relative">
            {isActive('/') && (
              <motion.div 
                className="absolute -top-1 left-1/2 w-1 h-1 bg-imperio-navy rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId="navIndicator"
              />
            )}
            <HomeIcon size={20} />
          </div>
          <span className="text-xs truncate">Início</span>
        </Link>
        
        <Link 
          to="/carrinho" 
          className={`flex flex-col items-center justify-center space-y-1 px-1 ${
            isActive('/carrinho') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <div className="relative">
            {isActive('/carrinho') && (
              <motion.div 
                className="absolute -top-1 left-1/2 w-1 h-1 bg-imperio-navy rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId="navIndicator"
              />
            )}
            <ShoppingCartIcon size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-imperio-red text-white text-xs rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-xs truncate">Carrinho</span>
        </Link>
        
        <Link 
          to="/login" 
          className={`flex flex-col items-center justify-center space-y-1 px-1 ${
            (isActive('/login') || isActive('/perfil')) ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <div className="relative">
            {(isActive('/login') || isActive('/perfil')) && (
              <motion.div 
                className="absolute -top-1 left-1/2 w-1 h-1 bg-imperio-navy rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId="navIndicator"
              />
            )}
            <UserIcon size={20} />
          </div>
          <span className="text-xs truncate">Perfil</span>
        </Link>
      </div>
    </div>
  );
};
