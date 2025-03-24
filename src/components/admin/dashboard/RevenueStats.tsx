
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from 'recharts';

export const RevenueStats: React.FC = () => {
  // Dummy data for demonstration
  const data = [
    { name: 'Seg', receita: 1200, despesa: 850 },
    { name: 'Ter', receita: 1800, despesa: 1050 },
    { name: 'Qua', receita: 2200, despesa: 1300 },
    { name: 'Qui', receita: 1900, despesa: 1100 },
    { name: 'Sex', receita: 2800, despesa: 1500 },
    { name: 'Sáb', receita: 3200, despesa: 1700 },
    { name: 'Dom', receita: 2100, despesa: 1200 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Balanço Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
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
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Dia: ${label}`}
              />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Bar dataKey="receita" name="Receita" fill="#001f3f" radius={[4, 4, 0, 0]} />
              <Bar dataKey="despesa" name="Despesa" fill="#e53e3e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
