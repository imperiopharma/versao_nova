
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CouponForm } from './CouponForm';
import { CouponType } from './types';
import { supabase } from '@/integrations/supabase/client';

interface CouponDialogProps {
  isOpen: boolean;
  onClose: () => void;
  coupon?: CouponType | null;
  onSuccess: () => void;
}

export const CouponDialog: React.FC<CouponDialogProps> = ({
  isOpen,
  onClose,
  coupon,
  onSuccess
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CouponType>>({
    code: '',
    description: '',
    type: 'percentage',
    value: 0,
    min_value: 0,
    is_active: true
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        id: coupon.id,
        code: coupon.code,
        description: coupon.description || '',
        type: coupon.type,
        value: coupon.value,
        min_value: coupon.min_value || 0,
        max_uses: coupon.max_uses || undefined,
        used_count: coupon.used_count,
        expires_at: coupon.expires_at ? new Date(coupon.expires_at) : undefined,
        is_active: coupon.is_active
      });
    } else {
      // Reset form data when adding a new coupon
      setFormData({
        code: '',
        description: '',
        type: 'percentage',
        value: 0,
        min_value: 0,
        is_active: true
      });
    }
  }, [coupon, isOpen]);

  const handleFormChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Form validation
      if (!formData.code) {
        toast({
          title: "Erro de validação",
          description: "O código do cupom é obrigatório",
          variant: "destructive",
        });
        return;
      }

      if (formData.value <= 0) {
        toast({
          title: "Erro de validação",
          description: "O valor do cupom deve ser maior que zero",
          variant: "destructive",
        });
        return;
      }

      // Format data for Supabase
      const couponData = {
        ...formData,
        code: formData.code?.toUpperCase(),
      };

      let response;

      if (coupon?.id) {
        // Update existing coupon
        response = await supabase
          .from('coupons')
          .update(couponData)
          .eq('id', coupon.id);
      } else {
        // Create new coupon
        response = await supabase
          .from('coupons')
          .insert([couponData]);
      }

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: coupon ? "Cupom atualizado" : "Cupom criado",
        description: `O cupom ${formData.code} foi ${coupon ? "atualizado" : "criado"} com sucesso.`,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar cupom:', error);
      toast({
        title: "Erro ao salvar",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao salvar o cupom.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{coupon ? 'Editar Cupom' : 'Adicionar Novo Cupom'}</DialogTitle>
        </DialogHeader>

        <CouponForm 
          formData={formData} 
          onFormChange={handleFormChange} 
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : coupon ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
