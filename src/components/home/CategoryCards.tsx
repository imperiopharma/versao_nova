
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Category } from '@/types/category';
import { ShoppingBag, PillIcon, HeartIcon } from 'lucide-react';

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
    hidden: { y: 50, opacity: 0 },
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
    
    // Fallback de ícones baseado no nome da categoria
    switch(categoryName.toLowerCase()) {
      case 'produtos emagrecedores':
      case 'emagrecedores':
        return <HeartIcon className="h-8 w-8" />;
      case 'medicamentos de farmácia':
      case 'medicamentos':
        return <PillIcon className="h-8 w-8" />;
      default:
        return <ShoppingBag className="h-8 w-8" />;
    }
  };
  
  // Função para determinar a cor de fundo e gradiente
  const getCategoryStyles = (category: Category, index: number) => {
    if (category.name.toLowerCase().includes('emagrecedores')) {
      return {
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        iconBg: 'bg-red-500',
        shadowColor: 'shadow-red-200'
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #90caf9 0%, #c5e1fb 100%)',
        iconBg: 'bg-blue-500',
        shadowColor: 'shadow-blue-200'
      };
    }
  };
  
  if (activeCategories.length === 0) {
    return null;
  }
  
  return (
    <section className="py-8 md:py-12 overflow-hidden">
      <div className="section-container">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-imperio-navy">Categorias em Destaque</h2>
          <p className="text-muted-foreground mt-2">Explore nossos produtos por categoria</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {activeCategories.map((category, index) => {
            const styles = getCategoryStyles(category, index);
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="w-full"
              >
                <Link 
                  to={category.link || `/categoria/${category.slug || category.id}`} 
                  style={{ background: styles.background }}
                  className={`rounded-2xl overflow-hidden shadow-lg ${styles.shadowColor} p-6 flex flex-col items-center justify-center w-full h-full text-center transition-all border border-white/30 backdrop-blur-sm min-h-[200px] relative`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00000010_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                  
                  <div className={`rounded-full ${styles.iconBg} p-4 mb-4 text-white shadow-lg z-10 relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff40_1px,transparent_1px)] [background-size:8px_8px]"></div>
                    {renderIcon(category.icon, category.name)}
                  </div>
                  
                  <h3 className="font-bold text-white text-xl md:text-2xl mb-2 text-shadow z-10">{category.title || category.name}</h3>
                  
                  <p className="text-white/90 text-sm md:text-base z-10">{category.description}</p>
                  
                  <div className="mt-4 bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full text-white text-sm font-medium z-10 hover:bg-white/30 transition-colors">
                    Ver produtos
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16 z-0"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mt-8 z-0"></div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
