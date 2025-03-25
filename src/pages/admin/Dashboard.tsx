
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { SalesChart } from '@/components/admin/dashboard/SalesChart';
import { RecentOrdersTable } from '@/components/admin/dashboard/RecentOrdersTable';
import { TopProducts } from '@/components/admin/dashboard/TopProducts';
import { CustomerGrowth } from '@/components/admin/dashboard/CustomerGrowth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Buscar estatísticas de produtos, clientes e pedidos
        const [productsResponse, customersResponse, ordersResponse] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('customers').select('*'),
          supabase.from('orders').select('*')
        ]);

        // Verificar erros
        if (productsResponse.error) throw productsResponse.error;
        if (customersResponse.error) throw customersResponse.error;
        if (ordersResponse.error) throw ordersResponse.error;

        // Calcular revenue total dos pedidos
        let totalRevenue = 0;
        if (ordersResponse.data) {
          totalRevenue = ordersResponse.data.reduce((sum, order) => sum + (order.total || 0), 0);
        }

        // Buscar pedidos recentes
        const recentOrdersResponse = await supabase
          .from('orders')
          .select(`
            *,
            customer:customers(*)
          `)
          .order('created_at', { ascending: false })
          .limit(5);

        if (recentOrdersResponse.error) throw recentOrdersResponse.error;

        // Formatar pedidos recentes para o componente RecentOrdersTable
        const formattedOrders = recentOrdersResponse.data.map(order => ({
          id: order.id,
          orderNumber: order.order_number,
          date: order.created_at,
          customer: {
            name: order.customer?.name || 'Cliente desconhecido',
            email: order.customer?.email || '',
          },
          total: order.total || 0,
          status: order.status
        }));

        // Atualizar estado do dashboard
        setDashboardData({
          totalProducts: productsResponse.data?.length || 0,
          totalCustomers: customersResponse.data?.length || 0,
          totalOrders: ordersResponse.data?.length || 0,
          totalRevenue,
        });

        setRecentOrders(formattedOrders);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button>Download Relatório</Button>
            </div>
          </div>
          
          <DashboardStats 
            stats={[
              { title: 'Produtos', value: dashboardData.totalProducts, trend: 'up', change: 12 },
              { title: 'Clientes', value: dashboardData.totalCustomers, trend: 'up', change: 18 },
              { title: 'Pedidos', value: dashboardData.totalOrders, trend: 'up', change: 2.3 },
              { title: 'Faturamento', value: dashboardData.totalRevenue, trend: 'up', change: 1.2, isCurrency: true }
            ]}
          />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <SalesChart className="lg:col-span-4" loading={loading} />
            <CustomerGrowth className="lg:col-span-3" loading={loading} />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pedidos Recentes</CardTitle>
                <Link to="/admin/pedidos">
                  <Button variant="ghost" className="gap-1">
                    Ver Todos
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <RecentOrdersTable orders={recentOrders} loading={loading} />
              </CardContent>
            </Card>
            <TopProducts className="lg:col-span-3" loading={loading} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
