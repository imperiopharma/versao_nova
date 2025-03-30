
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
}
