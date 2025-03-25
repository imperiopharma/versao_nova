
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
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full shrink-0" style={{ backgroundColor: stat.bgColor }}>
                {stat.icon}
              </div>
              <div className="flex flex-col ml-4 space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                {loading ? (
                  <Skeleton className="h-7 w-full" />
                ) : (
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <span className={`text-xs font-medium ${stat.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.growth > 0 ? '+' : ''}{stat.growth}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
