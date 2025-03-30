
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useBrands } from '@/hooks/useBrands';
import { getSafeImageUrl } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

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

  // Obtenha 3 marcas principais para exibir
  const getMainBrands = () => {
    const allBrands = [
      ...brands.imported.slice(0, 1),
      ...brands.premium.slice(0, 1),
      ...brands.national.slice(0, 1)
    ];
    
    return allBrands.length > 0 ? allBrands.slice(0, 3) : [];
  };
  
  const mainBrands = getMainBrands();
  
  if (mainBrands.length === 0) return null;

  return (
    <section className="py-6 bg-white">
      <div className="section-container">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-imperio-navy">Nossas Marcas</h2>
        </div>
        
        <motion.div 
          className="flex flex-row justify-between items-center gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {mainBrands.map((brand) => {
            // Usar a função getSafeImageUrl para obter a URL da imagem segura
            const imageUrl = getSafeImageUrl(
              brand.logoUrl || brand.logo,
              `https://placehold.co/220x120/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`,
              brand.name
            );
            
            return (
              <motion.div key={brand.id} variants={itemVariants} className="flex-1">
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
        
        <div className="flex justify-center">
          <Link 
            to="/marcas" 
            className="inline-flex items-center text-imperio-navy hover:text-imperio-gold transition-colors font-medium"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Ver todas as marcas <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
