
export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
};

export type CouponType = 'percentage' | 'fixed' | 'shipping';

export type Coupon = {
  code: string;
  type: CouponType;
  value: number;
  minValue?: number;
  expiresAt?: Date;
};

export type CartContextType = {
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
  setHasInsurance: (hasInsurance: boolean) => void;
  total: number;
  availableCoupons: Coupon[];
  validateCoupon: (code: string) => { valid: boolean; message: string };
};
