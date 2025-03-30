
import React, { useState } from 'react';
import { Coupon } from '@/types/coupon';
import { CouponDialog } from './CouponDialog';
import { useCoupons } from '@/hooks/useCoupons';
import { Button } from '@/components/ui/button';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const CouponsList: React.FC = () => {
  const {
    coupons,
    isLoading,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus,
    isCreating,
    isUpdating,
    isDeleting,
    isTogglingStatus,
  } = useCoupons();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | undefined>(undefined);

  const handleAddCoupon = () => {
    setSelectedCoupon(undefined);
    setOpenDialog(true);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setOpenDialog(true);
  };

  const handleDeleteCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setOpenDeleteDialog(true);
  };

  const handleToggleStatus = (coupon: Coupon) => {
    toggleCouponStatus({ id: coupon.id, isActive: !coupon.is_active });
  };

  const handleSubmitCoupon = (values: Omit<Coupon, 'id' | 'created_at' | 'updated_at' | 'used_count'>) => {
    if (selectedCoupon) {
      updateCoupon({ id: selectedCoupon.id, ...values });
    } else {
      createCoupon(values);
    }
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    if (selectedCoupon) {
      deleteCoupon(selectedCoupon.id);
    }
    setOpenDeleteDialog(false);
  };

  // Formatador de datas
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR });
  };

  // Formatador de valores
  const formatValue = (coupon: Coupon) => {
    if (coupon.type === 'percentage') {
      return `${coupon.value}%`;
    } else if (coupon.type === 'fixed') {
      return `R$ ${coupon.value.toFixed(2)}`;
    } else {
      return 'Frete Grátis';
    }
  };

  // Formatador de tipo para exibição
  const formatType = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'Percentual';
      case 'fixed':
        return 'Valor Fixo';
      case 'shipping':
        return 'Frete Grátis';
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-imperio-navy"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-imperio-navy">Cupons de Desconto</h2>
        <Button onClick={handleAddCoupon}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cupom
        </Button>
      </div>

      {coupons && coupons.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Valor Mínimo</TableHead>
                <TableHead>Utilização</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">
                    {coupon.code}
                    {coupon.description && (
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                        {coupon.description}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>{formatType(coupon.type)}</TableCell>
                  <TableCell>{formatValue(coupon)}</TableCell>
                  <TableCell>
                    {coupon.min_value > 0
                      ? `R$ ${coupon.min_value.toFixed(2)}`
                      : 'Sem mínimo'}
                  </TableCell>
                  <TableCell>
                    {coupon.used_count} / {coupon.max_uses ?? '∞'}
                  </TableCell>
                  <TableCell className="text-sm">
                    {coupon.starts_at && (
                      <div className="text-xs">
                        <span className="font-medium">Início:</span> {formatDate(coupon.starts_at)}
                      </div>
                    )}
                    {coupon.expires_at && (
                      <div className="text-xs">
                        <span className="font-medium">Fim:</span> {formatDate(coupon.expires_at)}
                      </div>
                    )}
                    {!coupon.starts_at && !coupon.expires_at && 'Sem prazo definido'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={coupon.is_active}
                        onCheckedChange={() => handleToggleStatus(coupon)}
                        disabled={isTogglingStatus}
                      />
                      <Badge variant={coupon.is_active ? 'default' : 'outline'}>
                        {coupon.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditCoupon(coupon)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteCoupon(coupon)}
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center bg-gray-50 rounded-lg border border-dashed p-8">
          <p className="text-muted-foreground mb-4">
            Nenhum cupom de desconto cadastrado.
          </p>
          <Button onClick={handleAddCoupon}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Primeiro Cupom
          </Button>
        </div>
      )}

      {/* Dialog para adicionar/editar cupom */}
      <CouponDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSubmit={handleSubmitCoupon}
        isSubmitting={isCreating || isUpdating}
        coupon={selectedCoupon}
        title={selectedCoupon ? 'Editar Cupom' : 'Adicionar Cupom'}
      />

      {/* Dialog de confirmação para excluir */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o cupom
              <span className="font-semibold"> {selectedCoupon?.code}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
