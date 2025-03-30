
import React, { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Tag, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/formatters';
import { useProducts } from '@/hooks/useProducts';

export const CombosPage: React.FC = () => {
  const { flashSaleItems, loading } = useProducts();
  
  // Filtrar apenas os itens que são combos (se a API suportar)
  const comboItems = flashSaleItems.filter(item => item.isCombo);
  
  // Usar todos os itens se não houver filtro específico para combos
  const displayItems = comboItems.length > 0 ? comboItems : flashSaleItems;
  
  useEffect(() => {
    // Rolar para o topo quando o componente é montado
    window.scrollTo(0, 0);
  }, []);
  
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

  // Calcular porcentagem de desconto
  const calculateDiscount = (original: number, sale: number) => {
    if (!original || !sale || original <= sale) return 0;
    return Math.round(((original - sale) / original) * 100);
  };

  return (
    <Layout>
      <div className="section-container py-4 md:py-6 px-3 md:px-4">
        <div className="flex items-center mb-4 border-b pb-2">
          <Package className="text-imperio-navy mr-2" size={20} />
          <h1 className="text-xl md:text-2xl font-bold text-imperio-navy">Combos e Kits</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg border border-gray-100 shadow-sm animate-pulse h-48 md:h-64">
                <div className="h-24 md:h-32 bg-gray-200 rounded-t-lg"></div>
                <div className="p-3 space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayItems.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhum combo disponível no momento.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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
                    className="bg-white rounded-lg border border-gray-100 shadow-sm block h-full transition-all hover:shadow-md"
                  >
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-28 md:h-36 object-contain p-2 rounded-t-lg"
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
                      <h3 className="font-bold text-xs md:text-sm line-clamp-2 min-h-[2rem] mb-1">{item.name}</h3>
                      <div className="mt-1">
                        {discount > 0 && (
                          <span className="text-[10px] md:text-xs line-through text-gray-500 block">
                            {formatCurrency(originalPrice)}
                          </span>
                        )}
                        <p className="text-imperio-red font-bold text-sm md:text-base">
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
