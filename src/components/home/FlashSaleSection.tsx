
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FlashSaleItem } from '@/types/product';
import { formatCurrency } from '@/lib/formatters';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlashSaleSectionProps {
  items: FlashSaleItem[];
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ items }) => {
  const isMobile = useIsMobile();
  
  // Animações
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
        stiffness: 50,
        damping: 8
      }
    }
  };

  // Se não houver itens, não renderiza a seção
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="section-container">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-imperio-navy">COMBOS</h2>
          <p className="text-gray-600 mt-2">Combinações especiais com preços imperdíveis</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-32 sm:h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/64748b?text=Combo";
                  }} 
                />
                
                {/* Badge de desconto */}
                {item.discountPercentage > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{item.discountPercentage}%
                  </div>
                )}
              </div>
              
              <div className="p-3 flex-grow flex flex-col">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
                
                <div className="mt-auto pt-2">
                  {item.originalPrice > 0 && (
                    <span className="text-gray-500 line-through text-sm">
                      {formatCurrency(item.originalPrice)}
                    </span>
                  )}
                  <div className="font-bold text-imperio-navy">
                    {formatCurrency(item.price)}
                  </div>
                </div>
              </div>
              
              <Link 
                to={`/produto/${item.id}`}
                className="bg-imperio-navy text-white text-center py-2 block hover:bg-imperio-light-navy transition-colors"
              >
                Ver detalhes
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/combos"
            className="inline-block py-2 px-6 rounded-full border border-imperio-navy text-imperio-navy font-medium hover:bg-imperio-navy hover:text-white transition-colors"
          >
            Ver todos os combos
          </Link>
        </div>
      </div>
    </section>
  );
};
