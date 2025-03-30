
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, PercentIcon, DollarSign } from 'lucide-react';

interface CouponTypeSelectorProps {
  value: 'percentage' | 'fixed' | 'shipping';
  onChange: (value: 'percentage' | 'fixed' | 'shipping') => void;
}

export const CouponTypeSelector: React.FC<CouponTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="type">Tipo de Cupom *</Label>
      <Select
        value={value}
        onValueChange={(val: 'percentage' | 'fixed' | 'shipping') => onChange(val)}
      >
        <SelectTrigger id="type">
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="percentage" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <PercentIcon className="h-4 w-4" />
              <span>Porcentagem</span>
            </div>
          </SelectItem>
          <SelectItem value="fixed" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Valor fixo</span>
            </div>
          </SelectItem>
          <SelectItem value="shipping" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              <span>Frete grátis</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
