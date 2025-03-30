
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/formatters';
import { CouponForm } from './coupon/CouponForm';

interface CartSummarySidebarProps {
  subtotal: number;
  discount: number;
  total: number;
}

export const CartSummarySidebar: React.FC<CartSummarySidebarProps> = ({ 
  subtotal, 
  discount, 
  total 
}) => {
  const [showCouponForm, setShowCouponForm] = useState(false);
  
  return (
    <motion.div 
      className="lg:col-span-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-imperio-navy mb-6">Resumo do Pedido</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-imperio-red">
              <span>Desconto</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}
          
          <div className="flex justify-between border-t border-gray-100 pt-4">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-imperio-navy text-xl">{formatCurrency(total)}</span>
          </div>
        </div>
        
        {showCouponForm ? (
          <div className="mb-6">
            <CouponForm onCancel={() => setShowCouponForm(false)} />
          </div>
        ) : (
          <button 
            onClick={() => setShowCouponForm(true)}
            className="text-imperio-navy hover:text-imperio-light-navy transition-colors text-sm font-medium mb-6 flex items-center"
          >
            Aplicar cupom de desconto
            <ChevronRight size={16} className="ml-1" />
          </button>
        )}
        
        <Button asChild className="w-full bg-imperio-navy hover:bg-imperio-light-navy">
          <Link to="/checkout/dados" className="flex items-center justify-center">
            <CreditCard size={18} className="mr-2" />
            Finalizar Compra
          </Link>
        </Button>
        
        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <Truck size={16} className="mr-2" />
          <Link to="/informacoes-frete" className="hover:underline">
            Ver informações de frete
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
