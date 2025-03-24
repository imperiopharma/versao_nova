
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart2 } from 'lucide-react';

export const SalesByCategoryChart: React.FC = () => {
  // Dados para gráfico de barras (vendas por categoria)
  const salesByCategoryData = [
    { name: 'Importadas', valor: 185000 },
    { name: 'Premium', valor: 120000 },
    { name: 'Nacionais', valor: 98000 },
    { name: 'Diversos', valor: 29000 },
  ];
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
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
  );
};
