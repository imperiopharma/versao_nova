
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CouponTypeSelector } from './CouponTypeSelector';
import { CouponExpirationField } from './CouponExpirationField';
import { CouponValueFields } from './CouponValueFields';
import { CouponStatusField } from './CouponStatusField';
import { CouponType } from './types';

interface CouponFormProps {
  formData: Partial<CouponType>;
  onFormChange: (fieldName: string, value: any) => void;
}

export const CouponForm: React.FC<CouponFormProps> = ({ formData, onFormChange }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Código do Cupom *</Label>
          <Input
            id="code"
            value={formData.code || ''}
            onChange={(e) => onFormChange('code', e.target.value.toUpperCase())}
            className="uppercase"
            placeholder="SUMMER2023"
          />
        </div>

        <CouponTypeSelector 
          value={formData.type || 'percentage'} 
          onChange={(value) => onFormChange('type', value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => onFormChange('description', e.target.value)}
          placeholder="Cupom para campanha de verão"
          className="resize-none"
        />
      </div>

      <CouponValueFields 
        type={formData.type || 'percentage'} 
        value={formData.value || 0} 
        minValue={formData.min_value || 0} 
        maxUses={formData.max_uses} 
        onValueChange={(value) => onFormChange('value', value)}
        onMinValueChange={(value) => onFormChange('min_value', value)}
        onMaxUsesChange={(value) => onFormChange('max_uses', value)}
      />
      
      <CouponExpirationField 
        expiryDate={formData.expires_at ? new Date(formData.expires_at) : undefined} 
        onChange={(date) => onFormChange('expires_at', date)} 
      />
      
      <CouponStatusField 
        isActive={formData.is_active || false} 
        usedCount={formData.used_count || 0}
        onChange={(value) => onFormChange('is_active', value)}
      />
    </div>
  );
};
