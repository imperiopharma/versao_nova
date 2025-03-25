
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  url
}) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      brand,
      price,
      originalPrice,
      quantity: 1,
      image
    });
    
    toast({
      title: 'Produto Adicionado!',
      description: `${name} foi adicionado ao carrinho.`,
      duration: 3000,
    });
  };
  
  return (
    <Link 
      to={url}
      className="group transition-all duration-300 flex flex-col h-full"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="bg-white rounded-lg shadow-subtle overflow-hidden h-full flex flex-col hover:shadow-elevation transition-shadow duration-300">
        {/* Imagem do produto com overlay hover */}
        <div className="relative aspect-square overflow-hidden">
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-imperio-red text-white text-xs font-bold py-1 px-2 rounded-full z-10">
              -{discountPercentage}%
            </div>
          )}
          
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay de ação no hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              onClick={handleAddToCart}
              size="sm"
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white text-xs sm:text-sm"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </div>
        </div>
        
        {/* Informações do produto */}
        <div className="p-3 sm:p-4 flex-grow flex flex-col">
          <div className="mb-1 text-xs text-gray-500">{brand}</div>
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-1 group-hover:text-imperio-navy transition-colors">{name}</h3>
          
          <div className="mt-auto flex items-baseline">
            {hasDiscount && (
              <span className="text-gray-500 line-through text-xs mr-2">
                {originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            )}
            <span className="text-imperio-navy font-semibold text-base">
              {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
