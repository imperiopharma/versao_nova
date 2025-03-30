
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

interface CouponExpirationFieldProps {
  expiryDate?: Date | string;
  onChange: (date: string | undefined) => void;
}

export const CouponExpirationField: React.FC<CouponExpirationFieldProps> = ({ expiryDate, onChange }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onChange(e.target.value); // Passa a string diretamente
    } else {
      onChange(undefined);
    }
  };

  // Formato da data para o input de tipo date
  const formatDateForInput = (date?: Date | string) => {
    if (!date) return '';
    
    // Se for uma string ISO, converte para Date primeiro
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'yyyy-MM-dd');
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="expires_at">Data de Expiração (opcional)</Label>
      <Input
        id="expires_at"
        type="date"
        value={formatDateForInput(expiryDate)}
        onChange={handleDateChange}
      />
    </div>
  );
};
