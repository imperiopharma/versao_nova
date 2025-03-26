
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

interface CouponInputProps {
  inputCoupon: string;
  setInputCoupon: (value: string) => void;
  handleApplyCoupon: () => void;
  isApplying: boolean;
  simpleVersion?: boolean;
}

export const CouponInput: React.FC<CouponInputProps> = ({
  inputCoupon,
  setInputCoupon,
  handleApplyCoupon,
  isApplying,
  simpleVersion = false
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCoupon(e.target.value.toUpperCase());
  };

  if (simpleVersion) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-imperio-navy/60" />
          <Input
            placeholder="Adicionar cupom"
            value={inputCoupon}
            onChange={handleInputChange}
            className="pl-10 border-imperio-navy/20 bg-white"
          />
        </div>
        <Button 
          onClick={handleApplyCoupon}
          disabled={isApplying || !inputCoupon}
          className="bg-imperio-navy hover:bg-imperio-light-navy text-white"
          size="sm"
        >
          {isApplying ? 'Aplicando...' : 'Aplicar'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-imperio-navy/60" />
        <Input
          placeholder="Digite o código do cupom"
          value={inputCoupon}
          onChange={handleInputChange}
          className="pl-10 border-imperio-navy/20 bg-white shadow-sm"
        />
      </div>
      <Button 
        onClick={handleApplyCoupon}
        disabled={isApplying || !inputCoupon}
        className="whitespace-nowrap bg-imperio-navy hover:bg-imperio-light-navy text-white"
      >
        {isApplying ? (
          <>
            <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
            Aplicando...
          </>
        ) : 'Aplicar Cupom'}
      </Button>
    </div>
  );
};
