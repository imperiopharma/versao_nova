
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryMenuProps {
  isOpen: boolean;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-elevation z-50 overflow-hidden border border-gray-100"
        >
          <div className="py-3">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-imperio-navy via-blue-500 to-imperio-light-navy"></div>
            
            <Link 
              to="/categoria/injetaveis" 
              className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
              Produtos Injetáveis
            </Link>
            <Link 
              to="/categoria/orais" 
              className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
              Produtos Orais
            </Link>
            <Link 
              to="/categoria/emagrecedores" 
              className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
              Emagrecedores
            </Link>
            <Link 
              to="/categoria/cbd" 
              className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
              CBD
            </Link>
            <Link 
              to="/categoria/farmacia" 
              className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
              Produtos de Farmácia
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
