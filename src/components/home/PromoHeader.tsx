
import React from 'react';
import { Truck, CreditCard } from 'lucide-react';

export const PromoHeader: React.FC = () => {
  return (
    <>
      {/* Banner principal */}
      <div className="bg-imperio-navy text-white p-4 sm:text-center flex justify-center items-center">
        <div className="max-w-screen-xl flex flex-col sm:flex-row justify-center items-center gap-2">
          <Truck size={18} className="shrink-0" />
          <p className="text-sm">Frete grátis para compras acima de R$ 500,00</p>
          <div className="hidden sm:block">|</div>
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="shrink-0" />
            <p className="text-sm">Até 12x sem juros no cartão</p>
          </div>
        </div>
      </div>

      {/* Logo e Título */}
      <div className="section-container py-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-imperio-navy">
            <span className="text-imperio-navy">Império</span>
            <span className="text-imperio-red">Pharma</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">A sua farmácia online</p>
        </div>
      </div>
    </>
  );
};
