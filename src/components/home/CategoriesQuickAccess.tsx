
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CategoriesQuickAccessProps {
  categories: Category[];
}

export const CategoriesQuickAccess: React.FC<CategoriesQuickAccessProps> = ({ categories }) => {
  return (
    <section className="py-8 bg-imperio-gray">
      <div className="section-container">
        <h2 className="text-xl font-semibold text-imperio-navy mb-4">Categorias Populares</h2>
        
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex space-x-4" style={{ minWidth: 'fit-content' }}>
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/categoria/${category.id}`}
                className="imperio-card flex flex-col items-center text-center p-5 hover-lift w-[140px] h-[140px]"
              >
                <div className="text-imperio-navy">
                  {category.icon}
                </div>
                <h4 className="text-sm font-medium">{category.name}</h4>
              </Link>
            ))}
            <Link 
              to="/categorias" 
              className="imperio-card flex flex-col items-center justify-center text-center p-5 hover-lift w-[140px] h-[140px]"
            >
              <div className="text-imperio-navy">
                <ArrowRight className="w-10 h-10 mb-3" />
              </div>
              <h4 className="text-sm font-medium">Ver Todas</h4>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
