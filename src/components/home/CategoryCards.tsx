
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Category } from '@/types/category';

interface CategoryCardsProps {
  categories: Category[];
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  const isMobile = useIsMobile();
  
  // Filtramos apenas as categorias ativas usando o campo active
  const activeCategories = categories.filter(category => category.active);
  
  // Limitamos a 3 categorias para que fiquem lado a lado com melhor espaçamento
  const displayCategories = activeCategories.slice(0, 3);
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } }
  };
  
  // Função auxiliar para renderizar o ícone
  const renderIcon = (icon: React.ReactNode | (() => React.ReactNode)) => {
    return typeof icon === 'function' ? icon() : icon;
  };
  
  if (displayCategories.length === 0) {
    return null;
  }
  
  return (
    <section className="py-4">
      <div className="section-container">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {displayCategories.map((category, index) => (
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
                className="bg-white rounded-lg p-3 flex flex-col items-center justify-center w-full border border-gray-100 shadow-sm hover:shadow-md transition-all h-full text-center"
              >
                <div className={`rounded-full ${category.color || 'bg-imperio-navy'} p-2 mb-2 text-white`}>
                  {renderIcon(category.icon)}
                </div>
                <h3 className="font-medium text-imperio-navy text-sm sm:text-base">{category.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
