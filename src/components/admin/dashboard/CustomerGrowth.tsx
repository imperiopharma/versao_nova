
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface CustomerGrowthProps {
  className?: string;
  loading?: boolean;
}

export const CustomerGrowth: React.FC<CustomerGrowthProps> = ({ className, loading = false }) => {
  // Dados de exemplo para o gráfico
  const data = [
    { name: 'Jan', clientes: 20 },
    { name: 'Fev', clientes: 35 },
    { name: 'Mar', clientes: 45 },
    { name: 'Abr', clientes: 40 },
    { name: 'Mai', clientes: 55 },
    { name: 'Jun', clientes: 65 },
  ];

  return (
    <Card className={`border-none shadow-md ${className || ''}`}>
      <CardHeader>
        <CardTitle className="text-lg">Crescimento de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md">
              <Skeleton className="h-full w-full rounded-md" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                  width={30}
                />
                <Tooltip formatter={(value) => [`${value} clientes`, 'Total']} />
                <Bar 
                  dataKey="clientes" 
                  fill="#7dd3fc" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30} 
                  name="Clientes"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
