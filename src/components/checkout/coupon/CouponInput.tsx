
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

interface CouponInputProps {
  inputCode: string; // Changed from inputCoupon to inputCode
  onInputChange: (value: string) => void; // Changed from setInputCoupon
  onApply: () => void; // Changed from handleApplyCoupon
  validationResult: { valid: boolean; message: string } | null;
  simpleVersion?: boolean;
}

export const CouponInput: React.FC<CouponInputProps> = ({
  inputCode, // Changed property name
  onInputChange, // Changed property name
  onApply, // Changed property name
  validationResult,
  simpleVersion = false
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value.toUpperCase());
  };

  if (simpleVersion) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-imperio-navy/60" />
          <Input
            placeholder="Adicionar cupom"
            value={inputCode}
            onChange={handleInputChange}
            className="pl-10 border-imperio-navy/20 bg-white"
          />
        </div>
        <Button 
          onClick={onApply}
          disabled={!inputCode}
          className="bg-imperio-navy hover:bg-imperio-light-navy text-white"
          size="sm"
        >
          Aplicar
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
          value={inputCode}
          onChange={handleInputChange}
          className="pl-10 border-imperio-navy/20 bg-white shadow-sm"
        />
      </div>
      <Button 
        onClick={onApply}
        disabled={!inputCode}
        className="whitespace-nowrap bg-imperio-navy hover:bg-imperio-light-navy text-white"
      >
        Aplicar Cupom
      </Button>
    </div>
  );
};
