
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/cart';
import { motion } from 'framer-motion';

interface CartItemCardProps {
  cartItem: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ 
  cartItem, 
  updateQuantity, 
  removeItem 
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-subtle p-5 flex flex-col sm:flex-row gap-5 border border-white hover:shadow-md transition-all duration-300 group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <div className="absolute inset-0 bg-gradient-to-r from-imperio-extra-light-navy/0 to-imperio-extra-light-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex-shrink-0 relative">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 shadow-sm">
          <img 
            src={cartItem.image || 'https://via.placeholder.com/100'} 
            alt={cartItem.name}
            className="w-20 h-20 object-cover rounded-md mx-auto"
          />
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-lg">{cartItem.name}</h3>
        <p className="text-sm text-gray-500">{cartItem.brand}</p>
        
        <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
          <div className="flex items-center">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-l-md rounded-r-none border-r-0 border-imperio-navy/20 hover:bg-imperio-extra-light-navy hover:text-imperio-navy"
              onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
              disabled={cartItem.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <div className="h-8 px-3 min-w-[3rem] flex items-center justify-center border border-imperio-navy/20 bg-white text-imperio-navy font-medium">
              {cartItem.quantity}
            </div>
            
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-r-md rounded-l-none border-l-0 border-imperio-navy/20 hover:bg-imperio-extra-light-navy hover:text-imperio-navy"
              onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              {cartItem.originalPrice && cartItem.originalPrice > cartItem.price && (
                <span className="text-sm text-gray-500 line-through block">
                  {cartItem.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              )}
              <span className="font-bold text-lg text-imperio-navy">
                {(cartItem.price * cartItem.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 text-imperio-red hover:bg-imperio-red/10 hover:text-imperio-red border-imperio-red/20 rounded-full transition-all"
              onClick={() => removeItem(cartItem.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
