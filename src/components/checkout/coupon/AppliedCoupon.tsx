
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tag, X } from 'lucide-react';
import { CouponType } from '@/contexts/CartContext';

interface AppliedCouponProps {
  couponCode: string;
  discountType: CouponType | null;
  discount: number;
  onRemove: () => void; // Added this property to match what's being passed
  simpleVersion?: boolean;
}

export const AppliedCoupon: React.FC<AppliedCouponProps> = ({
  couponCode,
  discountType,
  discount,
  onRemove,
  simpleVersion = false
}) => {
  // Formatar o tipo de desconto para exibição
  const formatDiscountType = (type: CouponType | null, value: number): string => {
    if (!type) return '';
    
    switch (type) {
      case 'percentage':
        return `${value}% de desconto`;
      case 'fixed':
        return `${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} de desconto`;
      case 'shipping':
        return 'Frete grátis';
      default:
        return '';
    }
  };

  if (simpleVersion) {
    return (
      <div className="flex items-center justify-between p-3 bg-imperio-extra-light-navy rounded-lg">
        <div className="flex items-center">
          <Tag size={16} className="text-imperio-navy mr-2" />
          <div>
            <p className="text-sm font-medium">{couponCode}</p>
            <p className="text-xs text-imperio-navy/70">
              {formatDiscountType(discountType, discount)}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={onRemove}
        >
          <X size={16} className="text-imperio-navy" />
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-imperio-extra-light-navy rounded-lg border border-imperio-navy/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-imperio-navy/10 p-2 rounded-full mr-3">
            <Tag size={18} className="text-imperio-navy" />
          </div>
          <div>
            <p className="font-medium text-imperio-navy">{couponCode}</p>
            <p className="text-sm text-imperio-navy/70">
              {formatDiscountType(discountType, discount)}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 text-imperio-red border-imperio-red/20 hover:bg-imperio-red/10" 
          onClick={onRemove}
        >
          <X size={16} className="mr-1" />
          Remover
        </Button>
      </div>
      
      <div className="mt-3 pt-3 border-t border-imperio-navy/10 flex justify-between text-sm">
        <span>Desconto aplicado:</span>
        <span className="font-medium text-green-600">
          -{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
    </div>
  );
};
