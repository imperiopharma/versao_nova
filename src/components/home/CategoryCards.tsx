
import React from 'react';
import { Category } from '@/types/category';
import { Link } from 'react-router-dom';

interface CategoryCardsProps {
  categories: Category[];
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  // Filtra apenas categorias ativas
  const activeCategories = categories.filter(cat => cat.active !== false);
  
  return (
    <section className="py-8 md:py-12 px-4">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Categorias Principais
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {activeCategories.map((category, index) => (
            <Link
              key={category.id || index}
              to={category.link || `/categoria/${category.slug || category.id}`}
              className="group"
            >
              <div 
                className={`rounded-lg p-4 flex flex-col items-center justify-center transition-all 
                           shadow-md hover:shadow-lg text-center h-full
                           ${category.color || 'bg-imperio-navy'} bg-opacity-10 hover:bg-opacity-20`}
              >
                {/* Renderiza o ícone se existir */}
                {category.icon && (
                  <div className="text-imperio-navy mb-3">
                    {typeof category.icon === 'function' ? React.createElement(category.icon) : category.icon}
                  </div>
                )}
                
                <h3 className="font-semibold text-sm md:text-base mb-1">
                  {category.title || category.name}
                </h3>
                
                {category.description && (
                  <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
