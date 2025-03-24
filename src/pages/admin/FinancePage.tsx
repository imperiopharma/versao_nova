
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Calendar, 
  TrendingUp,
  PieChart,
  CreditCard,
  BarChart2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PieChart as RechartsPie, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export const FinancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  // Dados para visão geral financeira
  const overviewStats = [
    {
      title: "Receita Total",
      value: "R$ 432.560,00",
      change: "+12.5%",
      changeType: "positive",
      period: "vs. mês anterior",
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-green-100",
      iconColor: "text-green-700",
    },
    {
      title: "Despesas",
      value: "R$ 156.320,00",
      change: "-3.2%",
      changeType: "positive",
      period: "vs. mês anterior",
      icon: <ArrowDownRight className="h-6 w-6" />,
      color: "bg-red-100",
      iconColor: "text-red-700",
    },
    {
      title: "Lucro Líquido",
      value: "R$ 276.240,00",
      change: "+18.7%",
      changeType: "positive",
      period: "vs. mês anterior",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      title: "Ticket Médio",
      value: "R$ 347,90",
      change: "+5.3%",
      changeType: "positive",
      period: "vs. mês anterior",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-purple-100",
      iconColor: "text-purple-700",
    },
  ];
  
  // Dados para as despesas
  const expensesData = [
    { name: 'Produtos', value: 120000 },
    { name: 'Marketing', value: 18000 },
    { name: 'Frete', value: 15000 },
    { name: 'Pessoal', value: 35000 },
    { name: 'Operacional', value: 8000 },
  ];
  
  // Cores para o gráfico de pizza
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Dados para gráfico de barras (vendas por categoria)
  const salesByCategoryData = [
    { name: 'Importadas', valor: 185000 },
    { name: 'Premium', valor: 120000 },
    { name: 'Nacionais', valor: 98000 },
    { name: 'Diversos', valor: 29000 },
  ];
  
  // Transações recentes
  const recentTransactions = [
    { id: 'TX001', descricao: 'Venda #12345', tipo: 'receita', valor: 289.90, data: '15/06/2023', metodo: 'PIX' },
    { id: 'TX002', descricao: 'Pagamento Fornecedor', tipo: 'despesa', valor: 3500.00, data: '14/06/2023', metodo: 'Transferência' },
    { id: 'TX003', descricao: 'Venda #12346', tipo: 'receita', valor: 435.50, data: '14/06/2023', metodo: 'PIX' },
    { id: 'TX004', descricao: 'Despesa Marketing', tipo: 'despesa', valor: 1800.00, data: '13/06/2023', metodo: 'Cartão' },
    { id: 'TX005', descricao: 'Venda #12347', tipo: 'receita', valor: 189.99, data: '13/06/2023', metodo: 'PIX' },
    { id: 'TX006', descricao: 'Venda #12348', tipo: 'receita', valor: 649.90, data: '12/06/2023', metodo: 'PIX' },
    { id: 'TX007', descricao: 'Envio de Pedidos', tipo: 'despesa', valor: 350.00, data: '12/06/2023', metodo: 'Cartão' },
  ];
  
  return (
    <AdminLayout>
      <div className="py-4 space-y-4 md:py-6 md:space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Financeiro</h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Calendar size={16} className="mr-2" />
              Jun 2023
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Download size={16} className="mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-md mb-4">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Visão Geral</TabsTrigger>
            <TabsTrigger value="income" className="text-xs md:text-sm">Receitas</TabsTrigger>
            <TabsTrigger value="expenses" className="text-xs md:text-sm">Despesas</TabsTrigger>
            <TabsTrigger value="reports" className="text-xs md:text-sm">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {overviewStats.map((stat) => (
                <Card key={stat.title} className="border-none shadow-md overflow-hidden">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className={`${stat.color} p-2 md:p-3 rounded-full ${stat.iconColor}`}>
                        {stat.icon}
                      </div>
                      <div className={`flex items-center space-x-1 text-xs md:text-sm ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <span>{stat.change}</span>
                        {stat.changeType === 'positive' ? (
                          <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 md:h-4 md:w-4" />
                        )}
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4">
                      <h3 className="text-sm md:text-lg font-medium text-gray-500 truncate">{stat.title}</h3>
                      <p className="text-lg md:text-2xl font-bold truncate">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">{stat.period}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="p-4 md:p-6 pb-0">
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <PieChart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Distribuição de Despesas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="h-64 md:h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie data={expensesData} cx="50%" cy="50%" outerRadius={90}>
                        {expensesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                    {expensesData.map((item, index) => (
                      <div key={item.name} className="flex items-center overflow-hidden">
                        <div
                          className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <div className="flex justify-between w-full min-w-0">
                          <span className="text-xs md:text-sm truncate">{item.name}</span>
                          <span className="text-xs md:text-sm font-medium ml-1">{formatCurrency(item.value)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="p-4 md:p-6 pb-0">
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <BarChart2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Vendas por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="h-64 md:h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={salesByCategoryData} 
                        margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis 
                          type="number" 
                          tickFormatter={(value) => `${value / 1000}k`} 
                          fontSize={12}
                        />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={70} 
                          fontSize={12}
                        />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Bar dataKey="valor" fill="#001f3f" barSize={20} radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Transações Recentes */}
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="p-4 md:p-6 pb-2">
                <CardTitle className="text-base md:text-lg">Transações Recentes</CardTitle>
                <CardDescription>Últimas movimentações financeiras</CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-1 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[70px]">ID</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="w-[100px]">Data</TableHead>
                      <TableHead className="w-[100px] hidden sm:table-cell">Método</TableHead>
                      <TableHead className="text-right w-[120px]">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell className="truncate max-w-[150px] sm:max-w-none">{transaction.descricao}</TableCell>
                        <TableCell>{transaction.data}</TableCell>
                        <TableCell className="hidden sm:table-cell">{transaction.metodo}</TableCell>
                        <TableCell className={`text-right ${transaction.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.tipo === 'receita' ? '+' : '-'} {formatCurrency(transaction.valor)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-end p-4">
                <Button variant="ghost" size="sm">Ver Todas as Transações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="income" className="space-y-4 md:space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader>
                <CardTitle>Receitas</CardTitle>
                <CardDescription>Detalhamento de receitas do período</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-10 md:py-20 text-gray-500">
                  Conteúdo da aba Receitas será implementado aqui
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses" className="space-y-4 md:space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader>
                <CardTitle>Despesas</CardTitle>
                <CardDescription>Detalhamento de despesas do período</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-10 md:py-20 text-gray-500">
                  Conteúdo da aba Despesas será implementado aqui
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4 md:space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader>
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>Relatórios financeiros disponíveis para download</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-10 md:py-20 text-gray-500">
                  Relatórios serão listados aqui
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
