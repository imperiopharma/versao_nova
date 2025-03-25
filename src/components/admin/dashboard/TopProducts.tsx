
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface TopProductsProps {
  className?: string;
  loading?: boolean;
}

export const TopProducts: React.FC<TopProductsProps> = ({ className, loading = false }) => {
  // Dados de exemplo para demonstração
  const products = [
    { id: 1, name: 'Whey Protein Concentrado 900g', sales: 187, percentage: 23 },
    { id: 2, name: 'Creatina Monohidratada 300g', sales: 124, percentage: 18 },
    { id: 3, name: 'BCAA 2:1:1 90 caps', sales: 96, percentage: 12 },
    { id: 4, name: 'Pré-treino Extreme 300g', sales: 78, percentage: 9 },
    { id: 5, name: 'Whey Protein Isolado 900g', sales: 65, percentage: 7 },
  ];

  if (loading) {
    return (
      <Card className={`border-none shadow-md ${className || ''}`}>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-none shadow-md ${className || ''}`}>
      <CardHeader>
        <CardTitle className="text-lg">Produtos Mais Vendidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} vendas</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium">{product.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
