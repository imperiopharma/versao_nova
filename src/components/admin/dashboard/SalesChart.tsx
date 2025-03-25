
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

interface SalesChartProps {
  className?: string;
  loading?: boolean;
}

export const SalesChart: React.FC<SalesChartProps> = ({ className, loading }) => {
  // Dummy data for demonstration
  const data = [
    { name: 'Jan', vendas: 4000 },
    { name: 'Fev', vendas: 3000 },
    { name: 'Mar', vendas: 5000 },
    { name: 'Abr', vendas: 2780 },
    { name: 'Mai', vendas: 1890 },
    { name: 'Jun', vendas: 2390 },
    { name: 'Jul', vendas: 3490 },
    { name: 'Ago', vendas: 3200 },
    { name: 'Set', vendas: 2800 },
    { name: 'Out', vendas: 4300 },
    { name: 'Nov', vendas: 5200 },
    { name: 'Dez', vendas: 6100 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card className={`border-none shadow-md ${className || ""}`}>
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Vendas Anuais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-muted-foreground">Carregando dados...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#001f3f" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#001f3f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `R$ ${value / 1000}k`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="#001f3f" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVendas)" 
                  name="Vendas"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
