
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { OrdersList } from '@/components/admin/orders/OrdersList';
import { OrdersFilter } from '@/components/admin/orders/OrdersFilter';
import { CardDescription, CardTitle } from '@/components/ui/card';

export const OrdersPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    period: '30days'
  });

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Pedidos</h1>
          <p className="text-muted-foreground mt-1">
            Visualize, gerencie e atualize o status dos pedidos da loja
          </p>
        </div>
        
        <OrdersFilter activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
        
        <div className="mt-6">
          <OrdersList activeFilters={activeFilters} />
        </div>
      </div>
    </AdminLayout>
  );
};
