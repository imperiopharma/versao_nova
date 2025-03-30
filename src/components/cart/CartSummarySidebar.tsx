
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CouponForm } from '@/components/checkout/CouponForm';

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
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <motion.div 
      className="lg:col-span-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-white rounded-xl shadow-subtle p-6 border border-white relative overflow-hidden">
        <div className="absolute -z-10 w-80 h-80 bg-gradient-to-br from-imperio-navy/5 via-imperio-light-navy/5 to-imperio-extra-light-navy/5 -right-20 -top-20 rounded-full blur-3xl"></div>
        
        <h2 className="text-lg font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent mb-6">
          Resumo do Pedido
        </h2>
        
        <div className="space-y-6">
          {/* Cupom de Desconto */}
          <CouponForm />
          
          {/* Cálculos */}
          <div className="border-t border-b border-imperio-navy/10 py-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span className="flex items-center">
                  Desconto
                </span>
                <span>-{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="flex items-center text-gray-600">
                <Truck size={16} className="mr-1" />
                Frete
              </span>
              <span className="text-gray-500">Calculado no checkout</span>
            </div>
          </div>
          
          {/* Total */}
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent">
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          
          {/* Botão de Checkout */}
          <Button 
            className="w-full bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy hover:brightness-110 text-white h-12 rounded-xl relative overflow-hidden group"
            onClick={() => {
              setIsSubmitting(true);
              setTimeout(() => {
                navigate('/checkout/dados');
              }, 300);
            }}
            disabled={isSubmitting}
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0 -translate-x-full animate-shimmer"></span>
            <span className="flex items-center relative z-10">
              <span>Finalizar Compra</span>
              <ChevronRight size={18} className="ml-2" />
            </span>
          </Button>
          
          {/* Badge de Segurança */}
          <div className="flex items-center justify-center gap-2 bg-imperio-extra-light-navy/50 p-3 rounded-lg">
            <ShieldCheck size={18} className="text-imperio-navy" />
            <span className="text-sm text-imperio-navy">Compra 100% Segura</span>
          </div>
          
          {/* Aviso */}
          <div className="bg-imperio-extra-light-navy p-3 rounded-lg flex gap-2 items-start text-sm">
            <AlertTriangle size={18} className="text-imperio-navy flex-shrink-0 mt-0.5" />
            <p className="text-gray-700">
              Produtos disponíveis conforme estoque. Preços sujeitos a alteração sem aviso prévio.
            </p>
          </div>
          
          <div className="text-center">
            <Link 
              to="/" 
              className="text-imperio-navy text-sm hover:underline flex items-center justify-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowRight size={16} className="mr-1 rotate-180" />
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
