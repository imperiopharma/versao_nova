
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

interface FlashSaleItem {
  id: string;
  name: string;
  brand: string;
  originalPrice?: number;
  price?: number;
  sellingPrice?: number;
  costPrice?: number;
  image: string;
}

interface FlashSaleSectionProps {
  items: FlashSaleItem[];
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ items }) => {
  // Calcular o preço de venda e o preço original com fallbacks
  const getSalePrice = (item: FlashSaleItem): number => {
    return item.price || item.sellingPrice || 0;
  };

  const getOriginalPrice = (item: FlashSaleItem): number => {
    return item.originalPrice || item.costPrice || getSalePrice(item);
  };

  // Calculate discount percentage
  const calculateDiscount = (original: number, sale: number) => {
    if (!original || !sale || original <= sale) return 0;
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
          {items.map((item) => {
            const salePrice = getSalePrice(item);
            const originalPrice = getOriginalPrice(item);
            const discount = calculateDiscount(originalPrice, salePrice);
            
            return (
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
                  {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-imperio-red text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{discount}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500">{item.brand}</p>
                  <h3 className="font-medium text-sm line-clamp-2 h-10">{item.name}</h3>
                  <div className="mt-2">
                    {discount > 0 && (
                      <span className="text-xs line-through text-gray-500">
                        {formatCurrency(originalPrice)}
                      </span>
                    )}
                    <p className="text-imperio-red font-bold">
                      {formatCurrency(salePrice)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
