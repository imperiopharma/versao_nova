
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Eye, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { formatCurrency } from '@/lib/formatters';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
}

interface FeaturedProductsProps {
  products: Product[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-3 sm:py-4">
      <div className="section-container">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-imperio-navy">Produtos em Destaque</h2>
          <Link 
            to="/ofertas" 
            className="text-imperio-red hover:underline text-xs sm:text-sm font-medium flex items-center"
          >
            Ver todos
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-1">
                <motion.div
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                  }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 h-full"
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-16 sm:h-24 object-contain p-2"
                    />
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-imperio-red text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2">
                    <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
                    <h3 className="font-bold text-imperio-navy mb-0.5 line-clamp-2 text-xs sm:text-sm min-h-[2rem]">{product.name}</h3>
                    
                    <div className="flex items-center text-yellow-400 mb-1">
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} className="text-gray-300" fill="currentColor" />
                      <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        {product.discount ? (
                          <>
                            <p className="text-xs text-gray-500 line-through">
                              {formatCurrency((product.price / (1 - product.discount / 100)))}
                            </p>
                            <p className="text-imperio-red font-bold text-xs sm:text-sm">
                              {formatCurrency(product.price)}
                            </p>
                          </>
                        ) : (
                          <p className="text-imperio-red font-bold text-xs sm:text-sm">
                            {formatCurrency(product.price)}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        <Link 
                          to={`/produto/${product.id}`}
                          className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Eye size={12} className="text-imperio-navy" />
                        </Link>
                        <button 
                          className="p-1 bg-imperio-navy rounded-full hover:bg-imperio-light-navy transition-colors"
                        >
                          <ShoppingBag size={12} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
