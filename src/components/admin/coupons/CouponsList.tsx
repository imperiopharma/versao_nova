
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Edit, Trash, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CouponDialog } from './CouponDialog';
import { CouponType } from './types';
import { DeleteCouponDialog } from './DeleteCouponDialog';
import { CouponStatusBadge } from './CouponStatusBadge';
import { CouponValueDisplay } from './CouponValueDisplay';

export const CouponsList = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setCoupons(data as CouponType[]);
    } catch (error) {
      console.error('Erro ao buscar cupons:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os cupons.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCoupons();
  }, []);
  
  const handleAddCoupon = () => {
    setSelectedCoupon(null);
    setIsDialogOpen(true);
  };
  
  const handleEditCoupon = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
    setIsDialogOpen(true);
  };
  
  const handleDeleteCoupon = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };
  
  const handleCouponSuccess = () => {
    fetchCoupons();
  };
  
  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Cupons Promocionais
          </CardTitle>
          <Button onClick={handleAddCoupon} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Novo Cupom
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-muted-foreground">Carregando cupons...</div>
          ) : coupons.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              Nenhum cupom encontrado. Clique em "Novo Cupom" para adicionar.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium uppercase">{coupon.code}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {coupon.description || '-'}
                      </TableCell>
                      <TableCell>
                        <CouponValueDisplay coupon={coupon} />
                      </TableCell>
                      <TableCell>
                        {coupon.expires_at ? (
                          new Date(coupon.expires_at) > new Date() ? (
                            new Date(coupon.expires_at).toLocaleDateString('pt-BR')
                          ) : (
                            <span className="text-red-500">Expirado</span>
                          )
                        ) : (
                          'Sem validade'
                        )}
                      </TableCell>
                      <TableCell>
                        <CouponStatusBadge isActive={coupon.is_active || false} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditCoupon(coupon)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteCoupon(coupon)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <CouponDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        coupon={selectedCoupon}
        onSuccess={handleCouponSuccess}
      />
      
      <DeleteCouponDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        coupon={selectedCoupon}
        onSuccess={handleCouponSuccess}
      />
    </>
  );
};
