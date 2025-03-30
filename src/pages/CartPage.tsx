
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { EmptyCartMessage } from '@/components/cart/EmptyCartMessage';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { CartSummarySidebar } from '@/components/cart/CartSummarySidebar';
import { CartPageBackground } from '@/components/cart/CartPageBackground';

export const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    discount, 
    total
  } = useCart();
  
  // Se o carrinho está vazio, mostrar mensagem
  if (items.length === 0) {
    return (
      <Layout>
        <div className="section-container py-16">
          <EmptyCartMessage />
        </div>
      </Layout>
    );
  }
  
  // Renderizar o carrinho com itens
  return (
    <Layout>
      <div className="section-container py-8 md:py-12">
        <CartPageBackground>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy bg-clip-text text-transparent mb-8 relative z-10"
          >
            Carrinho de Compras
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Produtos */}
            <CartItemsList 
              items={items}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
            
            {/* Resumo do Pedido */}
            <CartSummarySidebar 
              subtotal={subtotal}
              discount={discount}
              total={total}
            />
          </div>
        </CartPageBackground>
      </div>
    </Layout>
  );
};
