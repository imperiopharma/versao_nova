
import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { CouponsList } from '@/components/admin/coupons/CouponsList';

export const CouponsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-imperio-navy">Gerenciamento de Cupons</h1>
          <p className="text-muted-foreground mt-1">
            Crie e gerencie cupons de desconto para suas campanhas promocionais.
          </p>
        </div>
        
        <CouponsList />
      </div>
    </AdminLayout>
  );
};
