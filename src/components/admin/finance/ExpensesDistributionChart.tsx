
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

export const ExpensesDistributionChart: React.FC = () => {
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
          <PieChartIcon className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Distribuição de Despesas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="h-64 md:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={expensesData} 
                cx="50%" 
                cy="50%" 
                outerRadius={90} 
                dataKey="value"
              >
                {expensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
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
  );
};
