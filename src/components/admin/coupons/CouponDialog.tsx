
import React from 'react';
import { useForm } from 'react-hook-form';
import { Coupon, CouponType } from '@/types/coupon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

type CouponFormValues = Omit<Coupon, 'id' | 'created_at' | 'updated_at' | 'used_count'>;

interface CouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CouponFormValues) => void;
  isSubmitting: boolean;
  coupon?: Coupon;
  title: string;
}

export const CouponDialog: React.FC<CouponDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  coupon,
  title,
}) => {
  const isEditing = !!coupon;
  
  const form = useForm<CouponFormValues>({
    defaultValues: isEditing
      ? {
          code: coupon.code,
          description: coupon.description || '',
          type: coupon.type,
          value: coupon.value,
          min_value: coupon.min_value,
          max_uses: coupon.max_uses,
          starts_at: coupon.starts_at ? new Date(coupon.starts_at).toISOString().slice(0, 16) : '',
          expires_at: coupon.expires_at ? new Date(coupon.expires_at).toISOString().slice(0, 16) : '',
          is_active: coupon.is_active,
        }
      : {
          code: '',
          description: '',
          type: 'percentage' as CouponType,
          value: 0,
          min_value: 0,
          max_uses: null,
          starts_at: '',
          expires_at: '',
          is_active: true,
        },
  });

  const handleSubmit = (values: CouponFormValues) => {
    onSubmit({
      ...values,
      value: Number(values.value),
      min_value: Number(values.min_value),
      max_uses: values.max_uses ? Number(values.max_uses) : null,
      starts_at: values.starts_at || null,
      expires_at: values.expires_at || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Edite os detalhes do cupom abaixo.'
              : 'Preencha os detalhes do novo cupom abaixo.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código do Cupom</FormLabel>
                    <FormControl>
                      <Input placeholder="DESCONTO10" {...field} />
                    </FormControl>
                    <FormDescription>
                      Código que os clientes vão utilizar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Desconto</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">Percentual (%)</SelectItem>
                        <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                        <SelectItem value="shipping">Frete Grátis</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Como o desconto será aplicado.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do Desconto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step={field.value === 'percentage' ? '1' : '0.01'}
                        placeholder={field.value === 'percentage' ? '10' : '50.00'}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.watch('type') === 'percentage'
                        ? 'Porcentagem de desconto (ex: 10 para 10%)'
                        : form.watch('type') === 'fixed'
                        ? 'Valor em reais (ex: 50.00 para R$50)'
                        : 'Percentual do frete coberto (ex: 100 para 100%)'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="min_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Mínimo do Pedido</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="100.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Valor mínimo do pedido para aplicar o cupom.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="starts_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Quando o cupom começa a valer.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expires_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Expiração</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Quando o cupom deixa de valer.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="max_uses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite de Usos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="100"
                        value={field.value === null ? '' : field.value}
                        onChange={(e) => field.onChange(e.target.value === '' ? null : parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Quantas vezes este cupom pode ser usado (deixe em branco para ilimitado).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Ativo
                      </FormLabel>
                      <FormDescription>
                        O cupom está disponível para uso.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cupom de desconto para a campanha de inverno"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Descrição interna do cupom.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
