
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/hooks/useProductStore';
import { HeartIcon, PillIcon } from 'lucide-react';

interface CategoryMenuProps {
  isOpen: boolean;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ isOpen }) => {
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

  // Função para renderizar ícone com base no nome da categoria
  const getCategoryIcon = (name: string) => {
    if (name.toLowerCase().includes('emagrecedores')) {
      return <HeartIcon className="w-4 h-4 text-red-500" />;
    } else if (name.toLowerCase().includes('medicamentos') || name.toLowerCase().includes('farmácia')) {
      return <PillIcon className="w-4 h-4 text-blue-500" />;
    }
    return null;
  };

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
            
            {activeCategories.length > 0 ? (
              activeCategories.map(category => (
                <Link 
                  key={category.id}
                  to={`/categoria/${category.slug || category.id}`} 
                  className="flex items-center px-4 py-3 hover:bg-imperio-extra-light-navy transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span className="mr-3">
                    {getCategoryIcon(category.name)}
                  </span>
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))
            ) : (
              <>
                <Link 
                  to="/categoria/emagrecedores" 
                  className="flex items-center px-4 py-3 hover:bg-imperio-extra-light-navy transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span className="mr-3">
                    <HeartIcon className="w-4 h-4 text-red-500" />
                  </span>
                  <span className="font-medium">Produtos Emagrecedores</span>
                </Link>
                <Link 
                  to="/categoria/medicamentos" 
                  className="flex items-center px-4 py-3 hover:bg-imperio-extra-light-navy transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span className="mr-3">
                    <PillIcon className="w-4 h-4 text-blue-500" />
                  </span>
                  <span className="font-medium">Medicamentos de Farmácia</span>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
