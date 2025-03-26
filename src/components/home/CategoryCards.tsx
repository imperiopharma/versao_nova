
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Category } from '@/types/category';

interface CategoryCardsProps {
  categories: Category[];
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  const isMobile = useIsMobile();
  
  // Filtramos apenas as categorias ativas
  const activeCategories = categories.filter(category => category.active);
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } }
  };
  
  // Função auxiliar para renderizar o ícone
  const renderIcon = (icon: React.ReactNode | (() => React.ReactNode)) => {
    return typeof icon === 'function' ? icon() : icon;
  };
  
  return (
    <section className="py-3 sm:py-4">
      <div className="section-container">
        <h2 className="text-lg sm:text-xl font-bold text-imperio-navy mb-3">Categorias</h2>
        <div className="grid grid-cols-1 gap-2.5">
          {activeCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ 
                y: -2,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              className="w-full"
            >
              <Link 
                to={category.link} 
                className={`${category.color} rounded-lg p-3 flex items-center justify-between w-full border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white`}
              >
                <div className="flex items-center">
                  <div className={`rounded-full ${category.id === 'emagrecedores' ? 'bg-blue-500' : 'bg-red-500'} p-2 mr-3 text-white`}>
                    {renderIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="font-medium text-imperio-navy text-sm sm:text-base">{category.title}</h3>
                    <p className="text-xs text-gray-600">{category.description}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
