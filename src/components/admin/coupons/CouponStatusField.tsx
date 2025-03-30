
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CouponStatusFieldProps {
  isActive: boolean;
  usedCount: number;
  onChange: (value: boolean) => void;
}

export const CouponStatusField: React.FC<CouponStatusFieldProps> = ({ isActive, usedCount, onChange }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-0.5">
        <Label htmlFor="is_active" className="text-base">Cupom Ativo</Label>
        <p className="text-sm text-muted-foreground">
          {isActive ? 'O cupom está ativo e pode ser utilizado' : 'O cupom está desativado'}
        </p>
        {usedCount > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Este cupom já foi utilizado {usedCount} {usedCount === 1 ? 'vez' : 'vezes'}.
          </p>
        )}
      </div>
      <Switch
        id="is_active"
        checked={isActive}
        onCheckedChange={onChange}
      />
    </div>
  );
};
