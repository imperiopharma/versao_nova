
import React from 'react';
import { CartItemCard } from './CartItemCard';
import { CartItem } from '@/types/cart';
import { motion } from 'framer-motion';

interface CartItemsListProps {
  items: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export const CartItemsList: React.FC<CartItemsListProps> = ({ 
  items, 
  updateQuantity, 
  removeItem 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      className="lg:col-span-2 space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((cartItem) => (
        <CartItemCard 
          key={cartItem.id}
          cartItem={cartItem}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      ))}
    </motion.div>
  );
};
