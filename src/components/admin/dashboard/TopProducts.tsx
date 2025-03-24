
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TopProducts: React.FC = () => {
  // Mock data for top products
  const products = [
    {
      name: "Produto Premium XYZ",
      sales: 89,
      revenue: "R$ 8.900,00",
      image: "https://placehold.co/40x40"
    },
    {
      name: "Produto Especial ABC",
      sales: 67,
      revenue: "R$ 5.360,00",
      image: "https://placehold.co/40x40"
    },
    {
      name: "Kit Completo 123",
      sales: 45,
      revenue: "R$ 4.050,00",
      image: "https://placehold.co/40x40"
    },
    {
      name: "Produto Standard DEF",
      sales: 39,
      revenue: "R$ 1.950,00",
      image: "https://placehold.co/40x40"
    }
  ];

  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader>
        <CardTitle>Produtos Mais Vendidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.map((product, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md" />
              </div>
              <div className="ml-4 flex-grow">
                <h4 className="text-sm font-medium">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.sales} vendas</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{product.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost">Ver Todos os Produtos</Button>
      </CardFooter>
    </Card>
  );
};
