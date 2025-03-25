
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
  
  // Animation variants
  const navVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const iconVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };
  
  // Nav items configuration
  const navItems = [
    { 
      path: '/marcas', 
      icon: <TagsIcon size={20} />, 
      label: 'Marcas' 
    },
    { 
      path: '/fretes', 
      icon: <TruckIcon size={20} />, 
      label: 'Fretes' 
    },
    { 
      path: '/', 
      icon: <HomeIcon size={20} />, 
      label: 'Início' 
    },
    { 
      path: '/carrinho', 
      icon: <ShoppingCartIcon size={20} />, 
      label: 'Carrinho',
      badge: itemCount > 0 ? itemCount : null
    },
    { 
      path: '/login', 
      icon: <UserIcon size={20} />, 
      label: 'Perfil',
      isActive: (isActive('/login') || isActive('/perfil'))
    }
  ];
  
  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-elevation z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`flex flex-col items-center justify-center space-y-1 px-1 ${
              item.isActive ?? isActive(item.path) ? 'text-imperio-navy' : 'text-gray-500'
            }`}
          >
            <motion.div 
              className="relative"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {(item.isActive ?? isActive(item.path)) && (
                <motion.div 
                  className="absolute -top-1 left-1/2 w-2 h-2 bg-imperio-navy rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layoutId="navIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {item.icon}
              
              {item.badge && (
                <motion.span 
                  className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-imperio-red text-white text-xs rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {item.badge}
                </motion.span>
              )}
            </motion.div>
            <span className="text-xs truncate">{item.label}</span>
          </Link>
        ))}
      </div>
      
      {/* Efeito de brilho decorativo na borda superior */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-imperio-navy/10 via-imperio-navy/30 to-imperio-navy/10"></div>
    </motion.div>
  );
};
