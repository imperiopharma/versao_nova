
import { CartItem, CouponType } from '@/types/cart';
import { AVAILABLE_COUPONS } from './useCartState';

type CartCalculationProps = {
  items: CartItem[];
  couponCode: string | null;
  discountType: CouponType | null;
  shipping: number;
  hasInsurance: boolean;
};

export function useCartCalculations({
  items,
  couponCode,
  discountType,
  shipping,
  hasInsurance
}: CartCalculationProps) {
  // Calcular quantidade total de itens
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calcular subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calcular o desconto com base no tipo de cupom aplicado
  const calculateDiscount = (): number => {
    if (!couponCode) return 0;
    
    const coupon = AVAILABLE_COUPONS.find(c => c.code === couponCode);
    if (!coupon) return 0;
    
    if (coupon.type === 'percentage') {
      return subtotal * (coupon.value / 100);
    } else if (coupon.type === 'fixed') {
      return Math.min(subtotal, coupon.value); // Não aplicar desconto maior que o subtotal
    } else if (coupon.type === 'shipping') {
      return Math.min(shipping, coupon.value); // Aplicar desconto no frete, limitado ao valor do frete
    }
    
    return 0;
  };
  
  const discount = calculateDiscount();
  
  const calculateTotal = (): number => {
    let total = subtotal - discount;
    
    // Se o cupom for de frete grátis, não adicionar o valor do frete
    if (discountType === 'shipping') {
      total += Math.max(0, shipping - discount);
    } else {
      total += shipping;
    }
    
    if (hasInsurance) {
      total += total * 0.2; // Add 20% for insurance
    }
    
    return total;
  };
  
  return {
    itemCount,
    subtotal,
    discount,
    total: calculateTotal()
  };
}
