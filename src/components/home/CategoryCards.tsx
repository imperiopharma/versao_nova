
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Category } from '@/types/category';
import { ShoppingBag } from 'lucide-react';

interface CategoryCardsProps {
  categories: Category[];
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  const isMobile = useIsMobile();
  
  // Filtramos apenas as categorias ativas usando o campo active
  const activeCategories = categories.filter(category => category.active);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        stiffness: 100,
        damping: 12
      } 
    }
  };
  
  // Função auxiliar para renderizar o ícone
  const renderIcon = (icon: React.ReactNode | (() => React.ReactNode), categoryName: string) => {
    if (typeof icon === 'function') return icon();
    if (icon) return icon;
    
    // Fallback de ícone
    return <ShoppingBag className="h-6 w-6" />;
  };
  
  // Adicionado um console.log para depuração
  console.log("CategoryCards rendering with:", { activeCategories, allCategories: categories });
  
  if (activeCategories.length === 0) {
    console.log("No active categories found");
    return null;
  }
  
  return (
    <section className="py-8 md:py-10 overflow-visible bg-white">
      <div className="section-container">
        <h2 className="text-xl md:text-2xl font-bold text-imperio-navy mb-6 text-center">Nossas Categorias</h2>
        
        <motion.div 
          className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
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
                className={`rounded-xl overflow-hidden shadow-md flex flex-col items-center justify-center w-full h-full text-center transition-all bg-blue-100 py-8 px-3 relative hover:bg-blue-200`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className={`rounded-full ${category.color || 'bg-blue-500'} p-4 mb-3 text-white shadow-md`}>
                  {renderIcon(category.icon, category.name)}
                </div>
                
                <h3 className="font-bold text-imperio-navy text-xl mb-1">{category.title || category.name}</h3>
                
                <p className="text-gray-600 text-sm px-4 mb-4">{category.description}</p>
                
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
