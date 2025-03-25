
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Eye, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
}

interface FeaturedProductsProps {
  products: Product[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const isMobile = useIsMobile();
  
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
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <section className="py-3 sm:py-4">
      <div className="section-container">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-imperio-navy">Produtos em Destaque</h2>
          <Link 
            to="/ofertas" 
            className="text-imperio-red hover:underline text-xs sm:text-sm font-medium flex items-center"
          >
            Ver todos
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ 
                y: -2,
                boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
              }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-24 sm:h-32 object-contain p-2"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-imperio-red text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    -{product.discount}%
                  </div>
                )}
              </div>
              
              <div className="p-2 sm:p-3">
                <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
                <h3 className="font-semibold text-imperio-navy mb-0.5 line-clamp-2 text-xs sm:text-sm min-h-[2rem] sm:min-h-[2.5rem]">{product.name}</h3>
                
                <div className="flex items-center text-yellow-400 mb-1 sm:mb-2">
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} className="text-gray-300" fill="currentColor" />
                  <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    {product.discount ? (
                      <>
                        <p className="text-xs text-gray-500 line-through">
                          R$ {((product.price / (1 - product.discount / 100))).toFixed(2)}
                        </p>
                        <p className="text-imperio-red font-bold text-xs sm:text-sm">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-imperio-red font-bold text-xs sm:text-sm">
                        R$ {product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <Link 
                      to={`/produto/${product.id}`}
                      className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Eye size={12} className="text-imperio-navy" />
                    </Link>
                    <button 
                      className="p-1 bg-imperio-navy rounded-full hover:bg-imperio-light-navy transition-colors"
                    >
                      <ShoppingBag size={12} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
