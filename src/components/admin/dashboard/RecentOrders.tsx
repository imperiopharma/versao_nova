
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentOrdersTable } from './RecentOrdersTable';
import { useOrdersData } from '@/hooks/useOrdersData';
import { Order } from '@/types/orders';

export const RecentOrders: React.FC = () => {
  const { orders, loading, fetchOrders } = useOrdersData();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Buscar pedidos recentes
    fetchOrders();
  }, []);

  useEffect(() => {
    // Limitar a 5 pedidos mais recentes
    setRecentOrders(orders.slice(0, 5));
  }, [orders]);

  return (
    <Card className="col-span-full xl:col-span-8">
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
        <CardDescription>
          Últimos 5 pedidos realizados na loja
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecentOrdersTable orders={recentOrders} loading={loading} />
      </CardContent>
    </Card>
  );
};
