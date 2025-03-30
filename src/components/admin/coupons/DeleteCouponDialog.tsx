
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CouponType } from './types';

interface DeleteCouponDialogProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: CouponType | null;
  onSuccess: () => void;
}

export const DeleteCouponDialog: React.FC<DeleteCouponDialogProps> = ({
  isOpen,
  onClose,
  coupon,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!coupon) return;
    
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', coupon.id);
        
      if (error) throw error;
      
      toast({
        title: 'Cupom excluído',
        description: `O cupom ${coupon.code} foi excluído com sucesso.`,
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao excluir cupom:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o cupom.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!coupon) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o cupom <span className="font-bold">{coupon.code}</span>?
            <br />
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting} 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
