
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { RecentOrdersTable } from '@/components/admin/dashboard/RecentOrdersTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, LineChart } from '@/components/admin/dashboard/Charts';
import { GrowthMetric } from '@/components/admin/dashboard/GrowthMetric';

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
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
        // Buscar produtos para calcular vendas totais
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*');

        if (productsError) throw productsError;

        // Aqui vamos calcular métricas reais com base nos produtos
        const totalProducts = products?.length || 0;
        const totalSales = products.reduce((acc, product) => acc + (product.price || 0), 0);
        
        // Em um sistema real, calcularíamos isso com vendas reais
        // Por enquanto, vamos usar dados calculados dos produtos disponíveis
        const revenue = totalSales * 0.75; // Simulando receita como 75% das vendas
        const totalOrders = Math.round(totalProducts * 1.5); // Simulando pedidos
        const newCustomers = Math.round(totalOrders * 0.4); // Simulando novos clientes
        
        // Criar dados simulados para gráficos baseados em produtos reais
        const monthlySales = generateMonthlySalesData(totalSales);
        const weeklyBalance = generateWeeklyBalanceData(revenue);
        
        setDashboardData({
          totalSales,
          totalOrders,
          newCustomers,
          revenue,
          salesGrowth: 12.5,
          customersGrowth: 8.2,
          ordersGrowth: 5.3,
          revenueGrowth: 14.2,
          recentOrders: generateRecentOrders(products),
          monthlySales,
          weeklyBalance
        });
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Gerar dados de vendas mensais baseados no total de vendas real
  const generateMonthlySalesData = (totalSales: number) => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Distribuir o valor total ao longo dos meses com alguma variação
    const monthlyTotal = totalSales / 12;
    
    return months.map(month => {
      const variationFactor = 0.5 + Math.random();
      const value = Math.round(monthlyTotal * variationFactor);
      
      return {
        name: month,
        value: value
      };
    });
  };

  // Gerar dados de balanço semanal baseados na receita real
  const generateWeeklyBalanceData = (totalRevenue: number) => {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const weeklyRevenue = totalRevenue / 4; // Distribuir pelo mês
    const dailyRevenue = weeklyRevenue / 7;
    
    return days.map(day => {
      const revenueFactor = 0.8 + Math.random() * 0.8;
      const expenseFactor = 0.4 + Math.random() * 0.3;
      
      return {
        name: day,
        receita: Math.round(dailyRevenue * revenueFactor),
        despesa: Math.round(dailyRevenue * expenseFactor)
      };
    });
  };

  // Gerar pedidos recentes baseados em produtos reais
  const generateRecentOrders = (products: any[]) => {
    if (!products || products.length === 0) return [];
    
    const statuses = ['pending', 'paid', 'preparing', 'shipped', 'delivered'];
    const recentDates = [];
    
    // Gerar datas recentes para pedidos
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 7));
      recentDates.push(date.toISOString());
    }
    
    return products.slice(0, 5).map((product, index) => {
      return {
        id: `PED-${1000 + index}`,
        orderNumber: `PED-${1000 + index}`,
        date: recentDates[index],
        customer: {
          name: `Cliente ${index + 1}`,
          email: `cliente${index + 1}@exemplo.com`
        },
        items: [
          { id: product.id, name: product.name, price: product.price || 0, quantity: Math.floor(Math.random() * 3) + 1 }
        ],
        subtotal: product.price || 0,
        shipping: 15.00,
        discount: 0,
        total: (product.price || 0) + 15.00,
        paymentMethod: 'PIX',
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    });
  };

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Stats Cards */}
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
        
        {/* Sales Charts */}
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
              <BarChart data={dashboardData.weeklyBalance} loading={loading} />
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders and Customer Growth */}
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
