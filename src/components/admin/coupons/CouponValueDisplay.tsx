
import React from 'react';
import { CouponType } from './types';
import { PercentIcon, DollarSign, Ticket } from 'lucide-react';

interface CouponValueDisplayProps {
  coupon: CouponType;
}

export const CouponValueDisplay: React.FC<CouponValueDisplayProps> = ({ coupon }) => {
  const getValueDisplay = () => {
    switch (coupon.type) {
      case 'percentage':
        return (
          <div className="flex items-center gap-1">
            <PercentIcon className="h-3 w-3 text-blue-600" />
            <span>{coupon.value}% de desconto</span>
          </div>
        );
      case 'fixed':
        return (
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-green-600" />
            <span>
              {coupon.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })} de desconto
            </span>
          </div>
        );
      case 'shipping':
        return (
          <div className="flex items-center gap-1">
            <Ticket className="h-3 w-3 text-purple-600" />
            <span>Frete grátis</span>
          </div>
        );
      default:
        return 'Desconhecido';
    }
  };

  const getMinValueText = () => {
    if (!coupon.min_value) return null;
    
    return (
      <div className="text-xs text-gray-500 mt-0.5">
        Mínimo: {coupon.min_value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}
      </div>
    );
  };

  return (
    <div>
      {getValueDisplay()}
      {getMinValueText()}
    </div>
  );
};
