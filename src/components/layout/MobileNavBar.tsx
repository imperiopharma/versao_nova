
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Package, Truck, ShoppingCart } from 'lucide-react';

export const MobileNavBar: React.FC = () => {
  const location = useLocation();
  
  // Verificar se a rota atual está ativa
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 py-1 px-2">
      <div className="grid grid-cols-5 gap-1">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 ${
            isActive('/') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5">Início</span>
        </Link>
        
        <Link
          to="/marcas"
          className={`flex flex-col items-center justify-center py-1 ${
            isActive('/marcas') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <ShoppingBag size={18} />
          <span className="text-[10px] mt-0.5">Marcas</span>
        </Link>
        
        <Link
          to="/combos"
          className={`flex flex-col items-center justify-center py-1 ${
            isActive('/combos') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <Package size={18} />
          <span className="text-[10px] mt-0.5">Combos</span>
        </Link>
        
        <Link
          to="/fretes"
          className={`flex flex-col items-center justify-center py-1 ${
            isActive('/fretes') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <Truck size={18} />
          <span className="text-[10px] mt-0.5">Fretes</span>
        </Link>
        
        <Link
          to="/carrinho"
          className={`flex flex-col items-center justify-center py-1 ${
            isActive('/carrinho') ? 'text-imperio-navy' : 'text-gray-500'
          }`}
        >
          <ShoppingCart size={18} />
          <span className="text-[10px] mt-0.5">Carrinho</span>
        </Link>
      </div>
    </nav>
  );
};
