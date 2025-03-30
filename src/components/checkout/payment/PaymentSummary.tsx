
import React from 'react';
import { PixLogo } from './PixLogo';

interface PaymentSummaryProps {
  total: number;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ total }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <PixLogo />
      <h2 className="text-2xl font-medium mt-3 mb-1">Total a Pagar</h2>
      <p className="text-3xl font-semibold text-imperio-navy">
        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
    </div>
  );
};
