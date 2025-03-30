
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrdersData } from '@/hooks/useOrdersData';
import { OrderStatus } from '@/types/orders';

export const FinancialSummary: React.FC = () => {
  const { orders } = useOrdersData();
  
  // Função para calcular métricas financeiras com base nos pedidos
  const calculateFinancialMetrics = useMemo(() => {
    // Inicializar métricas
    const metrics = {
      totalRevenue: 0,
      pendingRevenue: 0,
      confirmedRevenue: 0,
      averageOrderValue: 0,
      canceledValue: 0,
      weeklyRevenue: 0,
      monthlyRevenue: 0
    };
    
    if (!orders.length) return metrics;
    
    // Obter data atual e datas para filtragem
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    
    // Filtrar e calcular métricas
    const completedOrders = orders.filter(order => 
      ['paid', 'shipped', 'delivered'].includes(order.status)
    );
    
    const pendingOrders = orders.filter(order => 
      order.status === 'pending'
    );
    
    const canceledOrders = orders.filter(order => 
      order.status === 'canceled'
    );
    
    // Calcular receita total de pedidos confirmados
    metrics.confirmedRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
    
    // Calcular receita pendente
    metrics.pendingRevenue = pendingOrders.reduce((sum, order) => sum + order.total, 0);
    
    // Calcular receita total (confirmada + pendente)
    metrics.totalRevenue = metrics.confirmedRevenue + metrics.pendingRevenue;
    
    // Calcular valor médio de pedido
    metrics.averageOrderValue = completedOrders.length 
      ? metrics.confirmedRevenue / completedOrders.length 
      : 0;
    
    // Calcular valor cancelado
    metrics.canceledValue = canceledOrders.reduce((sum, order) => sum + order.total, 0);
    
    // Calcular receita semanal
    metrics.weeklyRevenue = completedOrders
      .filter(order => new Date(order.date) >= oneWeekAgo)
      .reduce((sum, order) => sum + order.total, 0);
    
    // Calcular receita mensal
    metrics.monthlyRevenue = completedOrders
      .filter(order => new Date(order.date) >= oneMonthAgo)
      .reduce((sum, order) => sum + order.total, 0);
    
    return metrics;
  }, [orders]);
  
  // Calcular distribuição por status
  const statusDistribution = useMemo(() => {
    const distribution: Record<OrderStatus, number> = {
      pending: 0,
      paid: 0,
      preparing: 0, 
      shipped: 0,
      delivered: 0,
      canceled: 0
    };
    
    orders.forEach(order => {
      distribution[order.status] += order.total;
    });
    
    return distribution;
  }, [orders]);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(calculateFinancialMetrics.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Incluindo pedidos pendentes e confirmados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Confirmada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(calculateFinancialMetrics.confirmedRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Apenas pedidos pagos ou enviados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ticket Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(calculateFinancialMetrics.averageOrderValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Valor médio por pedido confirmado
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Análise Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="period">
            <TabsList className="mb-4">
              <TabsTrigger value="period">Por Período</TabsTrigger>
              <TabsTrigger value="status">Por Status</TabsTrigger>
            </TabsList>
            
            <TabsContent value="period">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
                  <p className="text-xl font-bold mt-1">
                    {formatCurrency(calculateFinancialMetrics.weeklyRevenue)}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
                  <p className="text-xl font-bold mt-1">
                    {formatCurrency(calculateFinancialMetrics.monthlyRevenue)}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Cancelados (total)</p>
                  <p className="text-xl font-bold mt-1 text-red-600">
                    {formatCurrency(calculateFinancialMetrics.canceledValue)}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="status">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-sm text-yellow-700">Aguardando Pagamento</p>
                  <p className="text-xl font-bold mt-1 text-yellow-800">
                    {formatCurrency(statusDistribution.pending)}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-sm text-green-700">Pagos</p>
                  <p className="text-xl font-bold mt-1 text-green-800">
                    {formatCurrency(statusDistribution.paid)}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-md">
                  <p className="text-sm text-purple-700">Em Preparação</p>
                  <p className="text-xl font-bold mt-1 text-purple-800">
                    {formatCurrency(statusDistribution.preparing)}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-700">Enviados</p>
                  <p className="text-xl font-bold mt-1 text-blue-800">
                    {formatCurrency(statusDistribution.shipped)}
                  </p>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-md">
                  <p className="text-sm text-teal-700">Entregues</p>
                  <p className="text-xl font-bold mt-1 text-teal-800">
                    {formatCurrency(statusDistribution.delivered)}
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-sm text-red-700">Cancelados</p>
                  <p className="text-xl font-bold mt-1 text-red-800">
                    {formatCurrency(statusDistribution.canceled)}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
