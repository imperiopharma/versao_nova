
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { FlashSaleItem } from '@/types/product';

interface FlashSaleSectionProps {
  items: FlashSaleItem[];
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ items }) => {
  // Se não houver itens, não renderizar nada
  if (!items || items.length === 0) return null;
  
  // Animações
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
      transition: { duration: 0.3 }
    }
  };
  
  const formatPrice = (price: number) => {
    return formatCurrency(price);
  };
  
  // Função para calcular o desconto
  const calculateDiscount = (originalPrice: number, salePrice: number) => {
    if (!originalPrice || !salePrice || originalPrice <= salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };
  
  return (
    <section className="py-4 md:py-6 bg-imperio-navy text-white">
      <div className="section-container px-3 md:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Package size={20} className="mr-2" />
            <h2 className="text-xl font-bold">Combos Especiais</h2>
          </div>
          <Link 
            to="/combos" 
            className="text-xs md:text-sm flex items-center bg-white/10 hover:bg-white/20 px-2 py-1 md:px-3 md:py-1.5 rounded transition-colors"
          >
            Ver Combos <span className="ml-1">→</span>
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.slice(0, 4).map((item) => {
            const discount = calculateDiscount(item.originalPrice || 0, item.price || 0);
            
            return (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg text-gray-800"
              >
                <Link to={`/produto/${item.id}`} className="block">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-28 md:h-36 object-contain bg-white p-2"
                    />
                    {discount > 0 && (
                      <div className="absolute top-1 right-1 bg-imperio-red text-white text-xs font-bold px-1 py-0.5 rounded-full">
                        -{discount}%
                      </div>
                    )}
                    {item.isCombo && (
                      <div className="absolute top-1 left-1 bg-imperio-navy text-white text-xs px-1 py-0.5 rounded-full">
                        Combo
                      </div>
                    )}
                  </div>
                  <div className="p-2 md:p-3">
                    <p className="text-[10px] md:text-xs text-gray-500 truncate">{item.brand}</p>
                    <h3 className="font-bold text-xs md:text-sm line-clamp-2 min-h-[2rem]">{item.name}</h3>
                    <div className="mt-2">
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-[10px] md:text-xs line-through text-gray-500 block">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                      <p className="text-imperio-red font-bold text-sm md:text-base">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
