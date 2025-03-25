
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';

interface GrowthMetricProps {
  value: number;
  growth: number;
  loading: boolean;
}

export const GrowthMetric: React.FC<GrowthMetricProps> = ({ value, growth, loading }) => {
  if (loading) {
    return <Skeleton className="w-4/5 h-36" />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="p-4 bg-green-50 rounded-full mb-4">
        <TrendingUp className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="text-5xl font-bold mb-2">{value}</h3>
      <p className="text-lg text-gray-600 mb-1">Novos clientes neste mês</p>
      <p className="text-sm text-green-600 font-medium">+{growth}% em relação ao mês anterior</p>
    </div>
  );
};
