
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface BrandsSectionProps {
  premium: Brand[];
  national: Brand[];
  imported: Brand[];
  various: Brand[];
  categories: Category[];
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ premium, national, imported, various, categories }) => {
  // Marcas conforme a imagem de exemplo
  const brandsData = {
    imported: [
      { id: 'universal', name: 'Universal', logo: '/lovable-uploads/416a2e5d-6d33-4904-9792-2d94c332c8c0.png' },
      { id: 'lifepronutrition', name: 'Life Pro Nutrition', logo: 'https://via.placeholder.com/150x80?text=Life+Pro+Nutrition' },
      { id: 'vitalabs', name: 'Vita Labs', logo: 'https://via.placeholder.com/150x80?text=Vita+Labs' },
      { id: 'blackskull', name: 'Black Skull', logo: 'https://via.placeholder.com/150x80?text=Black+Skull' }
    ],
    premium: [
      { id: 'alpha', name: 'Alpha Pharma', logo: 'https://via.placeholder.com/150x80?text=Alpha+Pharma' },
      { id: 'canada', name: 'Canadá Pharma', logo: 'https://via.placeholder.com/150x80?text=Canada+Pharma' },
      { id: 'cooper', name: 'Cooper', logo: 'https://via.placeholder.com/150x80?text=Cooper' },
      { id: 'oxygen', name: 'Oxygen', logo: 'https://via.placeholder.com/150x80?text=Oxygen' },
      { id: 'farmacom', name: 'Farmacom', logo: 'https://via.placeholder.com/150x80?text=Farmacom' },
      { id: 'zdhc', name: 'ZDHC', logo: 'https://via.placeholder.com/150x80?text=ZDHC' }
    ],
    national: [
      { id: 'growth', name: 'Growth', logo: 'https://via.placeholder.com/150x80?text=Growth' },
      { id: 'rhodia', name: 'Rhodia', logo: 'https://via.placeholder.com/150x80?text=Rhodia' }
    ],
    various: [
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const renderBrandGrid = (brands: Brand[], title: string) => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-6"
    >
      <div className="text-center mb-3">
        <h3 className="text-md font-medium text-imperio-navy">{title}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {brands.map((brand) => (
          <motion.div key={brand.id} variants={itemVariants}>
            <Link 
              to={`/marca/${brand.id}`}
              className="border border-gray-200 rounded-lg flex items-center justify-center h-16 bg-white hover:shadow-sm transition-all"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-h-10 max-w-[80%] object-contain" 
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section className="py-8 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-imperio-navy">Nossas Marcas</h2>
          <p className="text-sm text-gray-600 mt-1">Selecione uma das marcas abaixo para ver os produtos</p>
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
