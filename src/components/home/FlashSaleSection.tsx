
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

interface FlashSaleItem {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  salePrice: number;
  image: string;
}

interface FlashSaleSectionProps {
  items: FlashSaleItem[];
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ items }) => {
  // Format price as Brazilian Real
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Calculate discount percentage
  const calculateDiscount = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="section-container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Tag className="text-imperio-red mr-2" size={20} />
            <h2 className="text-lg font-bold text-imperio-navy">COMBOS</h2>
          </div>
          <Link 
            to="/ofertas" 
            className="text-sm font-medium text-imperio-navy flex items-center underline-animation"
          >
            Ver tudo
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link 
              key={item.id}
              to={`/produto/${item.id}`}
              className="imperio-card hover-lift overflow-hidden bg-white"
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-36 object-cover"
                />
                <div className="absolute top-2 right-2 bg-imperio-red text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{calculateDiscount(item.originalPrice, item.salePrice)}%
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500">{item.brand}</p>
                <h3 className="font-medium text-sm line-clamp-2 h-10">{item.name}</h3>
                <div className="mt-2">
                  <span className="text-xs line-through text-gray-500">
                    {formatPrice(item.originalPrice)}
                  </span>
                  <p className="text-imperio-red font-bold">
                    {formatPrice(item.salePrice)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
