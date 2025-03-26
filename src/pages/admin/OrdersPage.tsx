
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { OrdersList } from '@/components/admin/orders/OrdersList';
import { OrdersFilter } from '@/components/admin/orders/OrdersFilter';
import { OrderFilters } from '@/types/orders';
import { useToast } from '@/hooks/use-toast';
import { useOrdersData } from '@/hooks/useOrdersData';

export const OrdersPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<OrderFilters>({
    status: 'all',
    period: '30days'
  });
  
  const { toast } = useToast();
  const { fetchOrders } = useOrdersData();
  
  useEffect(() => {
    // Buscar os pedidos ao montar o componente
    const loadOrders = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os pedidos',
          variant: 'destructive'
        });
      }
    };
    
    loadOrders();
  }, []);

  return (
    <AdminLayout>
      <div className="py-6 max-w-full">
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
