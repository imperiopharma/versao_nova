
export type CouponType = {
  id: string;
  code: string;
  description: string | null;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  min_value: number | null;
  max_uses: number | null;
  used_count: number | null;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};
