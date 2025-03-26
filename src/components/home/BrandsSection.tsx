
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useBrands } from '@/hooks/useBrands';

interface Brand {
  id: string;
  name: string;
  logo: string;
  logoUrl?: string;
}

export const BrandsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const brands = useBrands();
  
  // Animation variants
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

  // Função para renderizar o grid de marcas
  const renderBrandGrid = (brands: Brand[], title: string, limit: number = 4) => {
    const displayBrands = brands.slice(0, limit);
    
    if (displayBrands.length === 0) return null;
    
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mb-5"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-imperio-navy">{title}</h3>
          <Link 
            to={`/marcas/${title.toLowerCase().replace(' ', '-')}`}
            className="text-xs text-imperio-red font-medium flex items-center"
          >
            Ver mais
            <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {displayBrands.map((brand) => {
            // Selecionar a fonte correta da imagem (logoUrl ou logo)
            const imageUrl = brand.logoUrl || brand.logo;
            
            return (
              <motion.div key={brand.id} variants={itemVariants}>
                <Link 
                  to={`/marca/${brand.id}`}
                  className="border border-gray-200 rounded-lg flex items-center justify-center h-14 sm:h-16 bg-white hover:shadow-sm transition-all"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <img 
                    src={imageUrl} 
                    alt={brand.name} 
                    className="max-h-10 sm:max-h-12 max-w-[85%] object-contain" 
                    onError={(e) => {
                      // Fallback para um placeholder se a imagem não carregar
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/150x100/001f3f/ffffff?text=${brand.name}`;
                    }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // Debug
  console.log('Brands data:', brands);
  console.log('Imported brands:', brands.imported);

  return (
    <section className="py-4 bg-gray-50">
      <div className="section-container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-imperio-navy">Nossas Marcas</h2>
          <Link 
            to="/marcas" 
            className="text-sm text-imperio-red font-medium flex items-center"
          >
            Ver todas
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        {/* Exibir todas as categorias com marcas disponíveis */}
        {brands.imported.length > 0 && renderBrandGrid(brands.imported, "Marcas Importadas", 4)}
        {brands.premium.length > 0 && renderBrandGrid(brands.premium, "Marcas Premium", 4)}
        {brands.national.length > 0 && renderBrandGrid(brands.national, "Marcas Nacionais", 4)}
        {brands.various.length > 0 && renderBrandGrid(brands.various, "Diversos", 4)}
      </div>
    </section>
  );
};
