
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface BrandsSectionProps {
  premium?: Brand[];
  national?: Brand[];
  imported?: Brand[];
  various?: Brand[];
  categories?: any[];
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ 
  premium = [],
  national = [],
  imported = [],
  various = [],
  categories = []
}) => {
  const isMobile = useIsMobile();
  
  // Marcas conforme a imagem de exemplo
  const brandsData = {
    imported: imported.length > 0 ? imported : [
      { id: 'universal', name: 'Universal', logo: '/lovable-uploads/416a2e5d-6d33-4904-9792-2d94c332c8c0.png' },
      { id: 'lifepronutrition', name: 'Life Pro Nutrition', logo: 'https://via.placeholder.com/150x80?text=Life+Pro+Nutrition' },
      { id: 'vitalabs', name: 'Vita Labs', logo: 'https://via.placeholder.com/150x80?text=Vita+Labs' },
      { id: 'blackskull', name: 'Black Skull', logo: 'https://via.placeholder.com/150x80?text=Black+Skull' }
    ],
    premium: premium.length > 0 ? premium : [
      { id: 'alpha', name: 'Alpha Pharma', logo: 'https://via.placeholder.com/150x80?text=Alpha+Pharma' },
      { id: 'canada', name: 'Canadá Pharma', logo: 'https://via.placeholder.com/150x80?text=Canada+Pharma' },
      { id: 'cooper', name: 'Cooper', logo: 'https://via.placeholder.com/150x80?text=Cooper' },
      { id: 'oxygen', name: 'Oxygen', logo: 'https://via.placeholder.com/150x80?text=Oxygen' },
      { id: 'farmacom', name: 'Farmacom', logo: 'https://via.placeholder.com/150x80?text=Farmacom' },
      { id: 'zdhc', name: 'ZDHC', logo: 'https://via.placeholder.com/150x80?text=ZDHC' }
    ],
    national: national.length > 0 ? national : [
      { id: 'growth', name: 'Growth', logo: 'https://via.placeholder.com/150x80?text=Growth' },
      { id: 'rhodia', name: 'Rhodia', logo: 'https://via.placeholder.com/150x80?text=Rhodia' }
    ],
    various: various.length > 0 ? various : [
      { id: 'cbd', name: 'CBD Canabidiol', logo: 'https://via.placeholder.com/150x80?text=CBD+Canabidiol' },
      { id: 'produtos', name: 'Produtos Manipulados', logo: 'https://via.placeholder.com/150x80?text=Produtos+Manipulados' },
      { id: 'produtos-farm', name: 'Produtos Farmacêuticos', logo: 'https://via.placeholder.com/150x80?text=Produtos+Farmacêuticos' },
      { id: 'receitas', name: 'Receitas Manipuladas', logo: 'https://via.placeholder.com/150x80?text=Receitas+Manipuladas' },
      { id: 'toxicos', name: 'Produtos Tóxicos', logo: 'https://via.placeholder.com/150x80?text=Produtos+Tóxicos' },
      { id: 'sarmar', name: 'Sarmar', logo: 'https://via.placeholder.com/150x80?text=Sarmar' }
    ]
  };

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

  const renderBrandGrid = (brands: Brand[], title: string) => (
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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {brands.map((brand) => (
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

  return (
    <section className="py-4 sm:py-6 bg-gray-50">
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
        
        {/* Imported Brands */}
        {brandsData.imported.length > 0 && renderBrandGrid(brandsData.imported, "Marcas Importadas")}
        
        {/* Premium Brands */}
        {brandsData.premium.length > 0 && renderBrandGrid(brandsData.premium, "Marcas Premium")}
        
        {/* National Brands */}
        {brandsData.national.length > 0 && renderBrandGrid(brandsData.national, "Marcas Nacionais")}
        
        {/* Various Brands */}
        {brandsData.various.length > 0 && renderBrandGrid(brandsData.various, "Diversos")}
      </div>
    </section>
  );
};
