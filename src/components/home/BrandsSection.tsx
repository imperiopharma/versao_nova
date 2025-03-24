
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
  categories: Category[];
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ premium, national, categories }) => {
  return (
    <section className="py-8 bg-white">
      <div className="section-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-imperio-navy">Nossas Marcas</h2>
          <Link 
            to="/marcas" 
            className="text-sm font-medium text-imperio-navy flex items-center underline-animation"
          >
            Ver Todas
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {/* Premium Brands */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-imperio-navy mb-3 border-b pb-1">Marcas Premium</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {premium.map((brand) => (
              <Link 
                key={brand.id} 
                to={`/marca/${brand.id}`}
                className="imperio-card flex items-center justify-center h-20 sm:h-24 hover-lift group"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-12 sm:max-h-16 transition-transform group-hover:scale-105" 
                />
              </Link>
            ))}
          </div>
        </div>
        
        {/* National Brands */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-imperio-navy mb-3 border-b pb-1">Marcas Nacionais</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {national.map((brand) => (
              <Link 
                key={brand.id} 
                to={`/marca/${brand.id}`}
                className="imperio-card flex items-center justify-center h-20 sm:h-24 hover-lift group"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-12 sm:max-h-16 transition-transform group-hover:scale-105" 
                />
              </Link>
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <h3 className="text-md font-medium text-imperio-navy mb-3 border-b pb-1">Categorias</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/categoria/${category.id}`}
                className="imperio-card flex flex-col items-center text-center p-3 sm:p-5 hover-lift h-24 sm:h-28"
              >
                <div className="text-imperio-navy">
                  {category.icon}
                </div>
                <h4 className="text-xs sm:text-sm font-medium">{category.name}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
