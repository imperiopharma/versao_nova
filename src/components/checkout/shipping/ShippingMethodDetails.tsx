
import React from 'react';
import { Truck, Timer, BadgeCheck } from 'lucide-react';

interface ShippingMethodDetailsProps {
  selectedMethod: string;
  shippingCost: number;
  calculatingShipping: boolean;
}

export const ShippingMethodDetails: React.FC<ShippingMethodDetailsProps> = ({
  selectedMethod,
  shippingCost,
  calculatingShipping
}) => {
  const getDeliveryEstimate = (method: string) => {
    switch (method) {
      case 'sedex': return '1-2 dias úteis';
      case 'pac': return '3-7 dias úteis';
      case 'transportadora': return '3-5 dias úteis';
      default: return '';
    }
  };

  return (
    <div className="mt-4 p-5 bg-gradient-to-r from-imperio-extra-light-navy/70 to-imperio-extra-light-navy/30 rounded-xl border border-imperio-navy/20 shadow-md backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] animate-[shimmer_3s_infinite] pointer-events-none"></div>
      
      <div className="flex items-center mb-3">
        <BadgeCheck size={20} className="text-imperio-navy mr-2" />
        <h3 className="font-medium text-imperio-navy">Detalhes do Envio</h3>
      </div>
      
      {calculatingShipping ? (
        <div className="flex items-center justify-center py-3">
          <div className="w-5 h-5 border-t-2 border-b-2 border-imperio-navy rounded-full animate-spin mr-2"></div>
          <span className="text-imperio-navy/70">Calculando...</span>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-imperio-navy/10">
            <div className="flex items-center">
              <Truck size={16} className="mr-2 text-imperio-navy/70" />
              <span className="text-imperio-navy/80">Método:</span>
            </div>
            <span className="font-medium text-imperio-navy">
              {selectedMethod === 'sedex' ? 'Sedex' : 
              selectedMethod === 'pac' ? 'PAC' : 'Transportadora'}
            </span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-imperio-navy/10">
            <div className="flex items-center">
              <Timer size={16} className="mr-2 text-imperio-navy/70" />
              <span className="text-imperio-navy/80">Prazo estimado:</span>
            </div>
            <span className="font-medium text-imperio-navy">
              {getDeliveryEstimate(selectedMethod)}
            </span>
          </div>
          
          <div className="flex justify-between items-center pt-1">
            <span className="text-imperio-navy font-medium">Total do frete:</span>
            <span className="font-bold text-imperio-navy text-lg">
              {shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
