
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: "Vendas Totais",
      value: "R$ 24.780,00",
      change: "+12.5%",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-blue-100",
      iconColor: "text-blue-700"
    },
    {
      title: "Novos Clientes",
      value: "58",
      change: "+8.2%",
      icon: <Users className="h-5 w-5" />,
      color: "bg-green-100",
      iconColor: "text-green-700"
    },
    {
      title: "Pedidos",
      value: "154",
      change: "+5.3%",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "bg-amber-100",
      iconColor: "text-amber-700"
    },
    {
      title: "Receita",
      value: "R$ 18.520,00",
      change: "+14.2%",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-purple-100",
      iconColor: "text-purple-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`${stat.color} p-3 rounded-full ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
