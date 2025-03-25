
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartSummaryProps {
  itemsCount: number;
  total: number;
  currentStep: number;
  totalSteps: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  itemsCount,
  total,
  currentStep,
  totalSteps
}) => {
  return (
    <div className="md:hidden bg-gradient-to-r from-imperio-navy/5 to-imperio-light-navy/10 backdrop-blur-md rounded-2xl p-5 mb-8 shadow-lg border border-white/40 relative overflow-hidden">
      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] animate-[shimmer_3s_infinite] pointer-events-none"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-imperio-navy to-imperio-light-navy rounded-full p-3 shadow-md">
            <ShoppingCart size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-imperio-navy/70">Seu carrinho</p>
            <p className="font-bold text-imperio-navy text-lg">{itemsCount} {itemsCount === 1 ? 'item' : 'itens'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-imperio-navy/70">Total</p>
          <p className="text-imperio-navy font-bold text-lg">
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
      
      {/* Indicador de progresso do checkout */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex justify-between text-xs text-imperio-navy/60">
          <span>Progresso</span>
          <span>{currentStep}/{totalSteps} etapas</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-imperio-navy to-imperio-light-navy rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
