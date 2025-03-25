
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Eye } from 'lucide-react';

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
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <section className="py-4">
      <div className="section-container">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-imperio-navy">Produtos em Destaque</h2>
          <Link 
            to="/ofertas" 
            className="text-imperio-red hover:underline text-sm font-medium"
          >
            Ver todos →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ 
                y: -2,
                boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
              }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 object-contain p-2"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-imperio-red text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-imperio-navy mb-1 line-clamp-2 text-sm min-h-[2.5rem]">{product.name}</h3>
                
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} className="text-gray-300" fill="currentColor" />
                  <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    {product.discount ? (
                      <>
                        <p className="text-xs text-gray-500 line-through">
                          R$ {((product.price / (1 - product.discount / 100))).toFixed(2)}
                        </p>
                        <p className="text-imperio-red font-bold text-sm">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-imperio-red font-bold text-sm">
                        R$ {product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <Link 
                      to={`/produto/${product.id}`}
                      className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Eye size={14} className="text-imperio-navy" />
                    </Link>
                    <button 
                      className="p-1 bg-imperio-navy rounded-full hover:bg-imperio-light-navy transition-colors"
                    >
                      <ShoppingBag size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
