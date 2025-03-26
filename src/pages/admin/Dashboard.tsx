
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { SalesChart } from '@/components/admin/dashboard/SalesChart';
import { RecentOrdersTable } from '@/components/admin/dashboard/RecentOrdersTable';
import { TopProducts } from '@/components/admin/dashboard/TopProducts';
import { CustomerGrowth } from '@/components/admin/dashboard/CustomerGrowth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, DollarSign, LineChart, ShoppingBag, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/lib/formatters';

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

  const statsData = [
    {
      title: 'Produtos',
      value: formatCurrency(dashboardData.totalProducts),
      icon: <LineChart className="h-5 w-5 text-white" />,
      growth: 12,
      bgColor: 'bg-blue-600',
      iconBg: 'bg-blue-700'
    },
    {
      title: 'Clientes',
      value: dashboardData.totalCustomers.toString(),
      icon: <Users className="h-5 w-5 text-white" />,
      growth: 18,
      bgColor: 'bg-green-600',
      iconBg: 'bg-green-700'
    },
    {
      title: 'Pedidos',
      value: dashboardData.totalOrders.toString(),
      icon: <ShoppingBag className="h-5 w-5 text-white" />,
      growth: 2.3,
      bgColor: 'bg-amber-600',
      iconBg: 'bg-amber-700'
    },
    {
      title: 'Faturamento',
      value: formatCurrency(dashboardData.totalRevenue),
      icon: <DollarSign className="h-5 w-5 text-white" />,
      growth: 1.2,
      bgColor: 'bg-purple-600',
      iconBg: 'bg-purple-700'
    }
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button className="bg-imperio-navy hover:bg-imperio-light-navy">Download Relatório</Button>
            </div>
          </div>
          
          <DashboardStats 
            stats={statsData}
            loading={loading}
          />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <SalesChart className="lg:col-span-4 shadow-sm border-none rounded-xl overflow-hidden" loading={loading} />
            <CustomerGrowth className="lg:col-span-3 shadow-sm border-none rounded-xl overflow-hidden" loading={loading} />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 shadow-sm border-none rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">Pedidos Recentes</CardTitle>
                <Link to="/admin/pedidos">
                  <Button variant="ghost" className="gap-1 text-imperio-navy hover:bg-gray-100">
                    Ver Todos
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <RecentOrdersTable orders={recentOrders} loading={loading} />
              </CardContent>
            </Card>
            <TopProducts className="lg:col-span-3 shadow-sm border-none rounded-xl overflow-hidden" loading={loading} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
