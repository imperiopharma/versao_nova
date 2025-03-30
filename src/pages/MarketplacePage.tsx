
import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProductStore } from '@/hooks/useProductStore';
import { getSafeImageUrl } from '@/lib/utils';
import { motion } from 'framer-motion';

export const MarketplacePage: React.FC = () => {
  const { brands } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtrar marcas de acordo com a pesquisa
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const importedBrands = filteredBrands.filter(brand => brand.category === 'imported');
  const premiumBrands = filteredBrands.filter(brand => brand.category === 'premium');
  const nationalBrands = filteredBrands.filter(brand => brand.category === 'national');
  const variousBrands = filteredBrands.filter(brand => brand.category === 'various');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <Layout>
      <div className="section-container py-8">
        <h1 className="text-2xl font-semibold text-imperio-navy mb-6">Marcas</h1>
        
        <div className="relative mb-8 max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={20} />
          </div>
          <Input
            type="search"
            placeholder="Pesquisar marcas..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {importedBrands.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-medium text-imperio-navy mb-4 border-b pb-2">Marcas Importadas</h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {importedBrands.map((brand) => {
                const imageUrl = getSafeImageUrl(
                  brand.logoUrl || brand.logo,
                  `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`,
                  brand.name
                );
                
                return (
                  <motion.div 
                    key={brand.id}
                    variants={itemVariants}
                  >
                    <Link 
                      to={`/marca/${brand.id}`}
                      className="imperio-card flex items-center justify-center h-28 hover-lift group animate-fade-in"
                    >
                      <img 
                        src={imageUrl} 
                        alt={brand.name} 
                        className="max-h-16 transition-transform group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`;
                        }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
        
        {premiumBrands.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-medium text-imperio-navy mb-4 border-b pb-2">Marcas Premium</h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {premiumBrands.map((brand) => {
                const imageUrl = getSafeImageUrl(
                  brand.logoUrl || brand.logo,
                  `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`,
                  brand.name
                );
                
                return (
                  <motion.div 
                    key={brand.id}
                    variants={itemVariants}
                  >
                    <Link 
                      to={`/marca/${brand.id}`}
                      className="imperio-card flex items-center justify-center h-28 hover-lift group animate-fade-in"
                    >
                      <img 
                        src={imageUrl} 
                        alt={brand.name} 
                        className="max-h-16 transition-transform group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`;
                        }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
        
        {nationalBrands.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-medium text-imperio-navy mb-4 border-b pb-2">Marcas Nacionais</h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {nationalBrands.map((brand) => {
                const imageUrl = getSafeImageUrl(
                  brand.logoUrl || brand.logo,
                  `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`,
                  brand.name
                );
                
                return (
                  <motion.div 
                    key={brand.id}
                    variants={itemVariants}
                  >
                    <Link 
                      to={`/marca/${brand.id}`}
                      className="imperio-card flex items-center justify-center h-28 hover-lift group animate-fade-in"
                    >
                      <img 
                        src={imageUrl} 
                        alt={brand.name} 
                        className="max-h-16 transition-transform group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`;
                        }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
        
        {variousBrands.length > 0 && (
          <div>
            <h2 className="text-xl font-medium text-imperio-navy mb-4 border-b pb-2">Diversos</h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {variousBrands.map((brand) => {
                const imageUrl = getSafeImageUrl(
                  brand.logoUrl || brand.logo,
                  `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`,
                  brand.name
                );
                
                return (
                  <motion.div 
                    key={brand.id}
                    variants={itemVariants}
                  >
                    <Link 
                      to={`/marca/${brand.id}`}
                      className="imperio-card flex items-center justify-center h-28 hover-lift group animate-fade-in"
                    >
                      <img 
                        src={imageUrl} 
                        alt={brand.name} 
                        className="max-h-16 transition-transform group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`;
                        }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}

        {filteredBrands.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhuma marca encontrada com o termo "{searchQuery}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
