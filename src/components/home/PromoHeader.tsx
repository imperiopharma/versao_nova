
import React from 'react';
import { Truck, CreditCard } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PromoHeaderProps {
  text?: string;
}

export const PromoHeader: React.FC<PromoHeaderProps> = ({ 
  text = "Frete grátis para compras acima de R$ 500,00" 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Banner principal */}
      <div className="bg-imperio-navy text-white p-3 sm:p-4 text-center">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-2">
          <div className="flex items-center">
            <Truck size={16} className="shrink-0 mr-1.5" />
            <p className="text-xs sm:text-sm">{text}</p>
          </div>
          <div className="hidden sm:block mx-2">|</div>
          <div className="flex items-center">
            <CreditCard size={16} className="shrink-0 mr-1.5" />
            <p className="text-xs sm:text-sm">Até 12x sem juros no cartão</p>
          </div>
        </div>
      </div>

      {/* Logo e Título */}
      <div className="section-container py-3 sm:py-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-imperio-navy">
            <span className="text-imperio-navy">Império</span>
            <span className="text-imperio-red">Pharma</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">A sua farmácia online</p>
        </div>
      </div>
    </>
  );
};
