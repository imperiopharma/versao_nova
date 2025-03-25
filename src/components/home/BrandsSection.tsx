
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
      className="mb-8"
    >
      <div className="flex items-center mb-4">
        <div className="h-5 w-1 bg-imperio-navy rounded-full mr-2"></div>
        <h3 className="text-md font-medium text-imperio-navy">{title}</h3>
        <div className="h-px flex-grow bg-gradient-to-r from-imperio-navy/20 to-transparent ml-3"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {brands.map((brand) => (
          <motion.div key={brand.id} variants={itemVariants}>
            <Link 
              to={`/marca/${brand.id}`}
              className="imperio-card flex items-center justify-center h-20 sm:h-24 hover-lift group relative overflow-hidden"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-12 transform -translate-x-full group-hover:translate-x-[400%] transition-all duration-1000 ease-in-out"></div>
              
              <div className="relative z-10">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-12 sm:max-h-16 transition-transform group-hover:scale-110 duration-300" 
                />
              </div>
              
              {/* Indicador de hover */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={14} className="text-imperio-navy" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-imperio-navy/5 via-imperio-navy/10 to-imperio-navy/5"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-imperio-navy/3 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-imperio-navy/3 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <div className="h-8 w-1.5 bg-imperio-navy rounded-full mr-3"></div>
            <h2 className="text-xl font-semibold text-imperio-navy">Nossas Marcas</h2>
          </div>
          <Link 
            to="/marcas" 
            className="text-sm font-medium text-imperio-navy flex items-center underline-animation group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Ver Todas
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
        {/* Imported Brands */}
        {imported.length > 0 && renderBrandGrid(imported, "Marcas Importadas")}
        
        {/* Premium Brands */}
        {premium.length > 0 && renderBrandGrid(premium, "Marcas Premium")}
        
        {/* National Brands */}
        {national.length > 0 && renderBrandGrid(national, "Marcas Nacionais")}
        
        {/* Various Brands */}
        {various.length > 0 && renderBrandGrid(various, "Diversos")}
        
        {/* Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center mb-4">
            <div className="h-5 w-1 bg-imperio-navy rounded-full mr-2"></div>
            <h3 className="text-md font-medium text-imperio-navy">Categorias</h3>
            <div className="h-px flex-grow bg-gradient-to-r from-imperio-navy/20 to-transparent ml-3"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link 
                  to={`/categoria/${category.id}`}
                  className="bg-white border border-gray-100 shadow-subtle rounded-xl flex flex-col items-center text-center p-3 sm:p-5 hover:shadow-elevation transition-all duration-300 h-24 sm:h-28 relative overflow-hidden group"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {/* Efeito de gradiente no hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-imperio-navy/5 to-imperio-navy/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="bg-imperio-navy/5 rounded-full p-2 mb-1 transition-colors group-hover:bg-imperio-navy/10">
                    {category.icon}
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium mt-2 text-imperio-navy">{category.name}</h4>
                  
                  {/* Indicador de hover */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={14} className="text-imperio-navy" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
