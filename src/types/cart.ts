
/**
 * Tipos de cupom disponíveis
 * - percentage: Desconto percentual
 * - fixed: Desconto de valor fixo
 * - shipping: Frete grátis
 */
export type CouponType = 'percentage' | 'fixed' | 'shipping';

/**
 * Interfaces para o sistema de carrinho
 */

/**
 * Interface que representa um item no carrinho
 */
export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
}

/**
 * Interface que representa um cupom de desconto
 */
export interface Coupon {
  code: string;
  type: CouponType;
  value: number;
  minValue: number;
  expiresAt?: Date; // Adicionado campo de expiração
}

/**
 * Interface do contexto do carrinho
 */
export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  couponCode: string | null;
  discount: number;
  discountType: CouponType | null;
  setCouponCode: (code: string | null) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shippingMethod: string | null;
  shippingCost: number;
  shipping: number;
  setShipping: (cost: number) => void;
  setShippingMethod: (method: string | null) => void;
  hasInsurance: boolean;
  setHasInsurance: (has: boolean) => void;
  total: number;
  availableCoupons: Coupon[];
  validateCoupon: (code: string) => { valid: boolean; message: string };
}
