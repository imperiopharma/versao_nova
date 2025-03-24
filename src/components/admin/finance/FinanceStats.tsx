
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, CreditCard } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  change: string;
  changeType: string;
  period: string;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
}

export const FinanceStats: React.FC = () => {
  // Dados para visão geral financeira
  const overviewStats: StatItem[] = [
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

  return (
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
  );
};
