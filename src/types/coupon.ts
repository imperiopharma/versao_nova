
export type CouponType = 'percentage' | 'fixed' | 'shipping';

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  type: CouponType;
  value: number;
  min_value: number;
  max_uses: number | null;
  used_count: number;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
