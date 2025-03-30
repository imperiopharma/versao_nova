
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '@/types/category';
import { ShoppingBag, Pill } from 'lucide-react';

interface CategoryCardsProps {
  categories: Category[];
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  const activeCategories = categories.filter(category => category.active);
  
  // Configurações de animação para o container e items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 60,
        damping: 10,
        duration: 0.5
      } 
    }
  };
  
  // Função auxiliar para renderizar o ícone
  const renderIcon = (icon: React.ReactNode | (() => React.ReactNode), categoryName: string) => {
    if (typeof icon === 'function') return icon();
    if (icon) return icon;
    
    // Fallback de ícone com base no nome da categoria
    if (categoryName.toLowerCase().includes('emagreced')) {
      return <Pill className="h-6 w-6" />;
    }
    
    // Fallback padrão
    return <ShoppingBag className="h-6 w-6" />;
  };
  
  // Não renderizar nada se não houver categorias ativas
  if (activeCategories.length === 0) {
    return null;
  }
  
  return (
    <section className="py-8 bg-white">
      <div className="section-container">
        <motion.div 
          className="grid grid-cols-2 gap-4 sm:gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {activeCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="w-full"
            >
              <Link 
                to={category.link || `/categoria/${category.id}`} 
                className="block rounded-xl overflow-hidden shadow-md flex flex-col items-center justify-center w-full h-full text-center transition-all hover:shadow-lg bg-blue-100 py-8 px-3 relative hover:bg-blue-200"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className={`rounded-full ${category.color || 'bg-imperio-navy'} p-4 mb-3 text-white shadow-md`}>
                  {renderIcon(category.icon, category.name)}
                </div>
                
                <h3 className="font-bold text-imperio-navy text-xl mb-4">
                  {category.title || category.name}
                </h3>
                
                <div className="bg-white py-2 px-4 rounded-full text-imperio-navy text-sm font-medium hover:bg-imperio-navy hover:text-white transition-colors">
                  Ver produtos
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
