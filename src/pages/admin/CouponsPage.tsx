
import React from 'react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { CouponsList } from '../../components/admin/coupons/CouponsList';

export const CouponsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <CouponsList />
      </div>
    </AdminLayout>
  );
};
