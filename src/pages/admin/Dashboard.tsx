
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { RecentOrdersTable } from '@/components/admin/dashboard/RecentOrdersTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ChartBars, LineChart } from '@/components/admin/dashboard/Charts';
import { GrowthMetric } from '@/components/admin/dashboard/GrowthMetric';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    newCustomers: 0,
    revenue: 0,
    salesGrowth: 0,
    customersGrowth: 0,
    ordersGrowth: 0,
    revenueGrowth: 0,
    recentOrders: [],
    monthlySales: [],
    weeklyBalance: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Buscar produtos
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*');

        if (productsError) throw productsError;

        // Buscar clientes
        const { data: customers, error: customersError } = await supabase
          .from('customers')
          .select('*');

        if (customersError) throw customersError;

        // Buscar pedidos
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            customers (*)
          `);

        if (ordersError) throw ordersError;

        // Calcular métricas com base nos dados reais
        const totalProducts = products?.length || 0;
        const totalSales = orders 
          ? orders.reduce((acc, order) => acc + (order.total || 0), 0) 
          : 0;
        
        const revenue = totalSales;
        const totalOrders = orders?.length || 0;
        const newCustomers = customers?.length || 0;
        
        // Dados de gráficos com base nos dados reais
        const monthlySales = generateMonthlySalesData(orders || []);
        const weeklyBalance = generateWeeklyBalanceData(orders || []);
        
        setDashboardData({
          totalSales,
          totalOrders,
          newCustomers,
          revenue,
          salesGrowth: 0, // Em um sistema real, compararia com períodos anteriores
          customersGrowth: 0,
          ordersGrowth: 0,
          revenueGrowth: 0,
          recentOrders: formatOrders(orders || []),
          monthlySales,
          weeklyBalance
        });
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados do dashboard.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  // Formatar pedidos para a tabela de pedidos recentes
  const formatOrders = (orders) => {
    return orders.map(order => ({
      id: order.id,
      orderNumber: order.order_number,
      date: order.created_at,
      customer: {
        name: order.customers?.name || 'Cliente não encontrado',
        email: order.customers?.email || 'N/A'
      },
      subtotal: order.subtotal || 0,
      shipping: order.shipping || 0,
      discount: order.discount || 0,
      total: order.total || 0,
      paymentMethod: order.payment_method || 'N/A',
      status: order.status || 'pending'
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  };

  // Gera dados de vendas mensais com base em pedidos reais
  const generateMonthlySalesData = (orders) => {
    const months = Array(12).fill(0).map((_, index) => getMonthName(index));
    const monthlyData = months.map(month => ({ name: month, value: 0 }));
    
    // Agrupar vendas por mês
    orders.forEach(order => {
      if (order.created_at) {
        const date = new Date(order.created_at);
        const month = date.getMonth();
        monthlyData[month].value += order.total || 0;
      }
    });
    
    return monthlyData;
  };

  // Função auxiliar para obter nome do mês
  const getMonthName = (index: number) => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months[index];
  };

  // Gera dados de balanço semanal com base em pedidos reais
  const generateWeeklyBalanceData = (orders) => {
    const days = Array(7).fill(0).map((_, index) => getDayName(index));
    const weeklyData = days.map(day => ({ name: day, receita: 0, despesa: 0 }));
    
    // Suponhamos que 40% das receitas são despesas
    orders.forEach(order => {
      if (order.created_at) {
        const date = new Date(order.created_at);
        const day = date.getDay();
        const dayIndex = day === 0 ? 6 : day - 1; // Ajustar para começar em segunda (0) até domingo (6)
        
        const value = order.total || 0;
        weeklyData[dayIndex].receita += value;
        weeklyData[dayIndex].despesa += value * 0.4; // 40% das receitas
      }
    });
    
    return weeklyData;
  };

  // Função auxiliar para obter nome do dia
  const getDayName = (index: number) => {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    return days[index];
  };

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <DashboardStats 
          totalSales={dashboardData.totalSales}
          salesGrowth={dashboardData.salesGrowth}
          newCustomers={dashboardData.newCustomers}
          customersGrowth={dashboardData.customersGrowth}
          totalOrders={dashboardData.totalOrders}
          ordersGrowth={dashboardData.ordersGrowth}
          revenue={dashboardData.revenue}
          revenueGrowth={dashboardData.revenueGrowth}
          loading={loading}
        />
        
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Vendas Anuais</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={dashboardData.monthlySales} loading={loading} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Balanço Semanal</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartBars data={dashboardData.weeklyBalance} loading={loading} />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentOrdersTable orders={dashboardData.recentOrders} loading={loading} />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Crescimento de Clientes</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <GrowthMetric 
                value={dashboardData.newCustomers} 
                growth={dashboardData.customersGrowth} 
                loading={loading} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
