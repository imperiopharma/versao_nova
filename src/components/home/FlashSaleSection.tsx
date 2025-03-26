
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";

interface FlashSaleItem {
  id: string;
  name: string;
  brand: string;
  originalPrice?: number;
  price?: number;
  sellingPrice?: number;
  costPrice?: number;
  image: string;
}

interface FlashSaleSectionProps {
  items: FlashSaleItem[];
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ items }) => {
  const isMobile = useIsMobile();
  
  // Limitamos a 4 itens para manter a página limpa
  const displayItems = items.slice(0, 4);
  
  if (displayItems.length === 0) {
    return null;
  }
  
  // Calcular o preço de venda e o preço original com fallbacks
  const getSalePrice = (item: FlashSaleItem): number => {
    return item.price || item.sellingPrice || 0;
  };

  const getOriginalPrice = (item: FlashSaleItem): number => {
    return item.originalPrice || item.costPrice || getSalePrice(item);
  };

  // Calculate discount percentage
  const calculateDiscount = (original: number, sale: number) => {
    if (!original || !sale || original <= sale) return 0;
    return Math.round(((original - sale) / original) * 100);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  return (
    <section className="py-4">
      <div className="section-container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Tag className="text-imperio-red mr-2" size={16} />
            <h2 className="text-lg sm:text-xl font-bold text-imperio-navy">COMBOS</h2>
          </div>
          <Link 
            to="/ofertas" 
            className="text-xs sm:text-sm font-medium text-imperio-red hover:underline flex items-center"
          >
            Ver tudo
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayItems.map((item) => {
            const salePrice = getSalePrice(item);
            const originalPrice = getOriginalPrice(item);
            const discount = calculateDiscount(originalPrice, salePrice);
            
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                }}
              >
                <Link 
                  to={`/produto/${item.id}`}
                  className="imperio-card hover-lift overflow-hidden bg-white rounded-lg border border-gray-100 shadow-sm block h-full"
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-20 sm:h-28 object-contain p-2"
                    />
                    {discount > 0 && (
                      <div className="absolute top-2 right-2 bg-imperio-red text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        -{discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-2 sm:p-3">
                    <p className="text-xs text-gray-500">{item.brand}</p>
                    <h3 className="font-bold text-xs sm:text-sm line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">{item.name}</h3>
                    <div className="mt-1 sm:mt-2">
                      {discount > 0 && (
                        <span className="text-xs line-through text-gray-500">
                          {formatCurrency(originalPrice)}
                        </span>
                      )}
                      <p className="text-imperio-red font-bold text-xs sm:text-sm">
                        {formatCurrency(salePrice)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Botão "Ver todos combos" */}
        <div className="flex justify-center mt-4">
          <Link to="/combos">
            <Button 
              variant="outline" 
              className="border-imperio-red text-imperio-red hover:bg-imperio-red hover:text-white transition-colors"
            >
              Ver todos combos
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
