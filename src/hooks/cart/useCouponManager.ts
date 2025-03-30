
import { useToast } from '@/hooks/use-toast';
import { CouponType } from '@/types/cart';
import { AVAILABLE_COUPONS } from './useCartState';

type CouponManagerProps = {
  subtotal: number;
  shippingMethod: string | null;
  setCouponCode: (code: string | null) => void;
  setDiscountType: (type: CouponType | null) => void;
};

export function useCouponManager({
  subtotal,
  shippingMethod,
  setCouponCode,
  setDiscountType
}: CouponManagerProps) {
  const { toast } = useToast();
  
  // Verificar se um cupom é válido
  const validateCoupon = (code: string): { valid: boolean; message: string } => {
    // Verificar se o código existe
    const coupon = AVAILABLE_COUPONS.find(c => c.code === code);
    if (!coupon) {
      return { valid: false, message: 'Cupom inválido ou expirado' };
    }
    
    // Verificar valor mínimo necessário para aplicar o cupom
    if (coupon.minValue && subtotal < coupon.minValue) {
      return { 
        valid: false, 
        message: `Este cupom só é válido para compras acima de ${coupon.minValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` 
      };
    }
    
    // Verificar se o cupom ainda é válido (se tiver data de expiração)
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return { valid: false, message: 'Este cupom expirou' };
    }
    
    // Se o cupom for do tipo frete grátis, verificar se já tem um método de frete selecionado
    if (coupon.type === 'shipping' && !shippingMethod) {
      return { valid: false, message: 'Selecione um método de envio antes de aplicar este cupom' };
    }
    
    return { valid: true, message: 'Cupom válido' };
  };
  
  // Aplicar um cupom
  const applyCoupon = (code: string): boolean => {
    const validation = validateCoupon(code);
    
    if (!validation.valid) {
      toast({
        variant: 'destructive',
        title: 'Cupom inválido',
        description: validation.message,
      });
      return false;
    }
    
    const coupon = AVAILABLE_COUPONS.find(c => c.code === code);
    
    if (coupon) {
      setCouponCode(code);
      setDiscountType(coupon.type);
      
      let successMessage = '';
      
      if (coupon.type === 'percentage') {
        successMessage = `Desconto de ${coupon.value}% aplicado com sucesso!`;
      } else if (coupon.type === 'fixed') {
        successMessage = `Desconto de ${coupon.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} aplicado com sucesso!`;
      } else if (coupon.type === 'shipping') {
        successMessage = 'Cupom de frete grátis aplicado com sucesso!';
      }
      
      toast({
        title: 'Cupom aplicado',
        description: successMessage,
      });
      
      return true;
    }
    
    return false;
  };
  
  // Remover um cupom aplicado
  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountType(null);
    
    toast({
      title: 'Cupom removido',
      description: 'O cupom de desconto foi removido do seu pedido.',
    });
  };

  return {
    validateCoupon,
    applyCoupon,
    removeCoupon,
    availableCoupons: AVAILABLE_COUPONS
  };
}
