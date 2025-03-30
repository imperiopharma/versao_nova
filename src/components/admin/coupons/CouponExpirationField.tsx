
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

interface CouponExpirationFieldProps {
  expiryDate?: Date;
  onChange: (date: Date | undefined) => void;
}

export const CouponExpirationField: React.FC<CouponExpirationFieldProps> = ({ expiryDate, onChange }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onChange(new Date(e.target.value));
    } else {
      onChange(undefined);
    }
  };

  // Formato da data para o input de tipo date
  const formatDateForInput = (date?: Date) => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd');
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
