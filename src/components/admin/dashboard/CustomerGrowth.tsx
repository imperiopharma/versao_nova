
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

export const CustomerGrowth: React.FC = () => {
  // Dummy data for demonstration
  const data = [
    { month: 'Jan', novos: 120, recorrentes: 80, total: 200 },
    { month: 'Fev', novos: 145, recorrentes: 90, total: 235 },
    { month: 'Mar', novos: 160, recorrentes: 100, total: 260 },
    { month: 'Abr', novos: 190, recorrentes: 110, total: 300 },
    { month: 'Mai', novos: 220, recorrentes: 130, total: 350 },
    { month: 'Jun', novos: 250, recorrentes: 150, total: 400 },
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Crescimento de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip labelFormatter={(label) => `Mês: ${label}`} />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Line 
                type="monotone" 
                dataKey="novos" 
                name="Novos Clientes"
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="recorrentes" 
                name="Clientes Recorrentes"
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                name="Total de Clientes"
                stroke="#001f3f" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
