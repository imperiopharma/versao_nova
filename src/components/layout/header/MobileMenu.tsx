
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductStore } from '@/hooks/useProductStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { categories } = useProductStore();
  const [activeCategories, setActiveCategories] = useState<any[]>([]);

  useEffect(() => {
    // Filtrar apenas categorias ativas
    if (categories && categories.length > 0) {
      const filtered = categories
        .filter(cat => cat.status === 'active')
        .slice(0, 5); // Limitar a 5 categorias no menu
      setActiveCategories(filtered);
    }
  }, [categories]);

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
            {activeCategories.length > 0 ? (
              activeCategories.map(category => (
                <Link 
                  key={category.id}
                  to={`/categoria/${category.slug || category.id}`} 
                  className="block py-1 hover:text-imperio-navy transition-colors"
                  onClick={() => {
                    onClose();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {category.name}
                </Link>
              ))
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </nav>
    </motion.div>
  );
};
