
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/formatters';
import { useProducts } from '@/hooks/useProducts';

export const CombosPage: React.FC = () => {
  const { flashSaleItems } = useProducts();
  
  // Animação para os itens
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

  // Calcular o preço de venda e o preço original com fallbacks
  const getSalePrice = (item: any): number => {
    return item.price || item.sellingPrice || 0;
  };

  const getOriginalPrice = (item: any): number => {
    return item.originalPrice || item.costPrice || getSalePrice(item);
  };

  // Calculate discount percentage
  const calculateDiscount = (original: number, sale: number) => {
    if (!original || !sale || original <= sale) return 0;
    return Math.round(((original - sale) / original) * 100);
  };

  return (
    <Layout>
      <div className="section-container py-6">
        <div className="flex items-center mb-6">
          <Tag className="text-imperio-gold mr-2" size={20} />
          <h1 className="text-2xl font-bold text-imperio-navy">Todos os Combos</h1>
        </div>

        {flashSaleItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum combo disponível no momento.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {flashSaleItems.map((item) => {
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
                        className="w-full h-28 sm:h-32 object-contain p-2"
                      />
                      {discount > 0 && (
                        <div className="absolute top-2 right-2 bg-imperio-red text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                          -{discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500">{item.brand}</p>
                      <h3 className="font-bold text-sm line-clamp-2 min-h-[2.5rem]">{item.name}</h3>
                      <div className="mt-2">
                        {discount > 0 && (
                          <span className="text-xs line-through text-gray-500 block">
                            {formatCurrency(originalPrice)}
                          </span>
                        )}
                        <p className="text-imperio-red font-bold text-base">
                          {formatCurrency(salePrice)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default CombosPage;
