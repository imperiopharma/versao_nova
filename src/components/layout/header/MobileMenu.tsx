
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden absolute top-full left-0 right-0 bg-white shadow-elevation z-50 overflow-hidden"
    >
      <nav className="py-6 px-6 flex flex-col space-y-5">
        <Link 
          to="/marcas" 
          className="py-2 font-medium hover:text-imperio-navy transition-colors flex items-center"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
          Marcas
        </Link>
        <Link 
          to="/fretes" 
          className="py-2 font-medium hover:text-imperio-navy transition-colors flex items-center"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
          Fretes
        </Link>
        <div className="py-2 space-y-3">
          <p className="font-medium flex items-center text-imperio-navy">
            <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
            Categorias
          </p>
          <div className="pl-4 space-y-3 text-sm border-l-2 border-imperio-extra-light-navy ml-1">
            <Link 
              to="/categoria/injetaveis" 
              className="block py-1 hover:text-imperio-navy transition-colors"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Produtos Injetáveis
            </Link>
            <Link 
              to="/categoria/orais" 
              className="block py-1 hover:text-imperio-navy transition-colors"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Produtos Orais
            </Link>
            <Link 
              to="/categoria/emagrecedores" 
              className="block py-1 hover:text-imperio-navy transition-colors"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Emagrecedores
            </Link>
            <Link 
              to="/categoria/cbd" 
              className="block py-1 hover:text-imperio-navy transition-colors"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              CBD
            </Link>
            <Link 
              to="/categoria/farmacia" 
              className="block py-1 hover:text-imperio-navy transition-colors"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Produtos de Farmácia
            </Link>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};
