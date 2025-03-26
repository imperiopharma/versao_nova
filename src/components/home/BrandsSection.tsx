
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

  // Vamos exibir apenas as marcas importadas e premium para manter a página limpa
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
          {displayBrands.map((brand) => (
            <motion.div key={brand.id} variants={itemVariants}>
              <Link 
                to={`/marca/${brand.id}`}
                className="border border-gray-200 rounded-lg flex items-center justify-center h-14 sm:h-16 bg-white hover:shadow-sm transition-all"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-8 sm:max-h-10 max-w-[80%] object-contain" 
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

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
        
        {/* Exibir apenas marcas importadas e premium */}
        {renderBrandGrid(brands.imported, "Marcas Importadas", 4)}
        {renderBrandGrid(brands.premium, "Marcas Premium", 4)}
      </div>
    </section>
  );
};
