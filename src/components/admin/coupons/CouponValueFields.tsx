
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CouponValueFieldsProps {
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  minValue: number;
  maxUses?: number;
  onValueChange: (value: number) => void;
  onMinValueChange: (value: number) => void;
  onMaxUsesChange: (value: number | undefined) => void;
}

export const CouponValueFields: React.FC<CouponValueFieldsProps> = ({
  type,
  value,
  minValue,
  maxUses,
  onValueChange,
  onMinValueChange,
  onMaxUsesChange
}) => {
  const handleNumericInput = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) || e.target.value === '') {
      setter(e.target.value === '' ? 0 : value);
    }
  };

  const handleMaxUsesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onMaxUsesChange(undefined);
      return;
    }
    
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onMaxUsesChange(value);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="value">
          {type === 'percentage' 
            ? 'Porcentagem de Desconto *' 
            : type === 'fixed' 
              ? 'Valor do Desconto (R$) *' 
              : 'Valor Máximo de Frete (R$) *'}
        </Label>
        <Input
          id="value"
          type="number"
          value={value || ''}
          onChange={handleNumericInput(onValueChange)}
          min={0}
          max={type === 'percentage' ? 100 : undefined}
          step={type === 'percentage' ? 1 : 0.01}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="min_value">Valor Mínimo da Compra (R$)</Label>
        <Input
          id="min_value"
          type="number"
          value={minValue || ''}
          onChange={handleNumericInput(onMinValueChange)}
          min={0}
          step={0.01}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="max_uses">Limite de Usos (opcional)</Label>
        <Input
          id="max_uses"
          type="number"
          value={maxUses === undefined ? '' : maxUses}
          onChange={handleMaxUsesInput}
          min={1}
          step={1}
          placeholder="Ilimitado"
        />
      </div>
    </div>
  );
};
