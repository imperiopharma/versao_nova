
import React from 'react';
import { Link } from 'react-router-dom';
import { FlashSaleItem } from '@/types/product';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface FlashSaleSectionProps {
  items: FlashSaleItem[];
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ items }) => {
  // Animation configs
  const sectionVariants = {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (!items || items.length === 0) return null;
  
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 text-imperio-navy tracking-tight">COMBOS</h2>
            <p className="text-imperio-light-navy/80 max-w-2xl mx-auto">
              Economize com nossas ofertas exclusivas de combos cuidadosamente selecionados.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 w-full"
          >
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="relative">
                  <img 
                    src={item.image || 'https://via.placeholder.com/300x300'} 
                    alt={item.name} 
                    className="w-full h-40 object-cover"
                  />
                  
                  {item.discountPercentage && item.discountPercentage > 0 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                      {item.discountPercentage}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-sm text-imperio-navy truncate">{item.name}</h3>
                    <div className="flex items-baseline mt-1 space-x-2">
                      <span className="text-sm font-bold text-imperio-navy">
                        R$ {Number(item.price).toFixed(2)}
                      </span>
                      {item.discountPercentage && item.discountPercentage > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          R$ {(Number(item.price) / (1 - item.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    className="mt-3 py-1.5 px-3 bg-imperio-navy text-white rounded-lg text-xs flex items-center justify-center hover:bg-imperio-light-navy transition-colors duration-300"
                  >
                    <ShoppingCart size={14} className="mr-1" />
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-10">
            <Link to="/combos">
              <Button variant="outline" className="group">
                Ver todos os combos
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
