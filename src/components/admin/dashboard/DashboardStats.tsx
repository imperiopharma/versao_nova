
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, Users, ShoppingBag, LineChart } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  growth: number;
  bgColor: string;
  iconBg: string;
}

interface DashboardStatsProps {
  stats: Stat[];
  loading?: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats,
  loading = false
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <div className={`${stat.bgColor} text-white p-4`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{stat.title}</p>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${stat.iconBg}`}>
                    {stat.icon}
                  </div>
                </div>
                {loading ? (
                  <Skeleton className="h-8 w-3/4 bg-white/20 mt-2" />
                ) : (
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                )}
              </div>
              <div className="bg-white p-3">
                <span className={`text-xs font-medium ${stat.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.growth > 0 ? '+' : ''}{stat.growth}% desde o último mês
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
