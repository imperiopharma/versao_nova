
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Category } from '@/types/category';

interface CategoryCardsProps {
  categories: Category[];
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  // Apenas renderizar categorias ativas
  const activeCategories = categories.filter(cat => cat.active !== false);
  
  // Se não houver categorias ativas, não renderiza nada
  if (activeCategories.length === 0) return null;
  
  // Variáveis de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-4 md:py-8">
      <div className="section-container px-3 md:px-6">
        <motion.div 
          className="grid grid-cols-2 gap-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activeCategories.map((category) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              className="relative"
            >
              <Link 
                to={category.link} 
                className="block bg-blue-50 rounded-xl p-4 text-center h-full"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full ${category.color || 'bg-imperio-navy'} text-white mb-3`}>
                    {category.icon && category.icon()}
                  </div>
                  <h3 className="text-sm font-bold mb-1 md:text-base">{category.title}</h3>
                  <p className="text-xs text-gray-600 hidden md:block">{category.description}</p>
                  <div className="mt-3">
                    <span className="bg-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm">
                      Ver produtos
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
