
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Coupon } from '@/types/coupon';
import { useToast } from '@/hooks/use-toast';

export const useCoupons = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchCoupons = async (): Promise<Coupon[]> => {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar cupons:', error);
      throw new Error(error.message);
    }

    return data as Coupon[];
  };

  const createCoupon = async (coupon: Omit<Coupon, 'id' | 'created_at' | 'updated_at' | 'used_count'>): Promise<Coupon> => {
    const { data, error } = await supabase
      .from('coupons')
      .insert([{ ...coupon, used_count: 0 }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar cupom:', error);
      throw new Error(error.message);
    }

    return data as Coupon;
  };

  const updateCoupon = async (coupon: Partial<Coupon> & { id: string }): Promise<Coupon> => {
    const { data, error } = await supabase
      .from('coupons')
      .update(coupon)
      .eq('id', coupon.id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar cupom:', error);
      throw new Error(error.message);
    }

    return data as Coupon;
  };

  const deleteCoupon = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir cupom:', error);
      throw new Error(error.message);
    }
  };

  const toggleCouponStatus = async (id: string, isActive: boolean): Promise<void> => {
    const { error } = await supabase
      .from('coupons')
      .update({ is_active: isActive })
      .eq('id', id);

    if (error) {
      console.error('Erro ao alterar status do cupom:', error);
      throw new Error(error.message);
    }
  };

  const { data: coupons, isLoading, error } = useQuery({
    queryKey: ['coupons'],
    queryFn: fetchCoupons,
  });

  const createMutation = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: "Cupom criado",
        description: "O cupom foi criado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar cupom",
        description: error.message,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: "Cupom atualizado",
        description: "O cupom foi atualizado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar cupom",
        description: error.message,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: "Cupom excluído",
        description: "O cupom foi excluído com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao excluir cupom",
        description: error.message,
      });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string, isActive: boolean }) => 
      toggleCouponStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: "Status alterado",
        description: "O status do cupom foi alterado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao alterar status",
        description: error.message,
      });
    },
  });

  return {
    coupons,
    isLoading,
    error,
    createCoupon: createMutation.mutate,
    updateCoupon: updateMutation.mutate,
    deleteCoupon: deleteMutation.mutate,
    toggleCouponStatus: toggleStatusMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isTogglingStatus: toggleStatusMutation.isPending,
  };
};
