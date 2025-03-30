
import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { CartItem } from '@/types/cart';
import { formatCurrency } from '@/lib/formatters';

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
  const handleIncrement = () => {
    updateQuantity(cartItem.id, cartItem.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (cartItem.quantity > 1) {
      updateQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(cartItem.id);
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      layout
    >
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 text-gray-400 hover:text-imperio-red transition-colors"
        aria-label="Remover item"
      >
        <X size={20} />
      </button>
      
      <div className="flex items-center">
        <div className="w-24 h-24 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
          {cartItem.image ? (
            <img 
              src={cartItem.image} 
              alt={cartItem.name} 
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span>Sem imagem</span>
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-grow">
          <div className="mb-3">
            <p className="text-xs text-gray-500">{cartItem.brand}</p>
            <h3 className="font-semibold text-gray-800">{cartItem.name}</h3>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center rounded-l border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
                disabled={cartItem.quantity <= 1}
                aria-label="Diminuir quantidade"
              >
                <Minus size={16} />
              </button>
              
              <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-200 text-sm">
                {cartItem.quantity}
              </span>
              
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex items-center justify-center rounded-r border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Aumentar quantidade"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-imperio-navy">
                {formatCurrency(cartItem.price * cartItem.quantity)}
              </p>
              {cartItem.originalPrice && cartItem.originalPrice > cartItem.price && (
                <p className="text-xs text-gray-500 line-through">
                  {formatCurrency(cartItem.originalPrice * cartItem.quantity)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
