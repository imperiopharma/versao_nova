
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { getSafeImageUrl } from '@/lib/utils';

interface Brand {
  id: string;
  name: string;
  logo: string;
  logoUrl?: string;
  category?: string;
}

interface BrandsSectionProps {
  brands: {
    imported: Brand[];
    premium: Brand[];
    national: Brand[];
    various: Brand[];
  };
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ brands }) => {
  const isMobile = useIsMobile();
  
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

  // Função para renderizar uma categoria de marcas
  const renderBrandCategory = (title: string, brandsList: Brand[]) => {
    if (brandsList.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-base font-bold text-imperio-navy mb-3 uppercase">{title}</h3>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {brandsList.map((brand) => {
            // Usar a função getSafeImageUrl para obter a URL da imagem segura
            const imageUrl = getSafeImageUrl(
              brand.logoUrl || brand.logo,
              `https://placehold.co/220x120/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`,
              brand.name
            );
            
            return (
              <motion.div key={brand.id} variants={itemVariants}>
                <Link 
                  to={`/marca/${brand.id}`}
                  className="border border-gray-200 rounded-lg flex items-center justify-center h-[50px] w-full bg-white hover:shadow-sm transition-all overflow-hidden"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <img 
                    src={imageUrl} 
                    alt={brand.name} 
                    className="max-h-[40px] object-contain" 
                    onError={(e) => {
                      // Fallback para um placeholder se a imagem não carregar
                      (e.target as HTMLImageElement).src = `https://placehold.co/220x120/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`;
                    }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-6 bg-white">
      <div className="section-container">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-imperio-navy">Nossas Marcas</h2>
        </div>
        
        {/* Marcas Importadas */}
        {renderBrandCategory("Marcas Importadas", brands.imported)}
        
        {/* Marcas Premium */}
        {renderBrandCategory("Marcas Premium", brands.premium)}
        
        {/* Marcas Nacionais */}
        {renderBrandCategory("Marcas Nacionais", brands.national)}
        
        {/* Diversos */}
        {renderBrandCategory("Diversos", brands.various)}
      </div>
    </section>
  );
};
