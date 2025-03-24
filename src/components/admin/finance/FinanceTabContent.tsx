
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface FinanceTabContentProps {
  title: string;
  description: string;
}

export const FinanceTabContent: React.FC<FinanceTabContentProps> = ({ title, description }) => {
  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-10 md:py-20 text-gray-500">
          Conteúdo da aba {title} será implementado aqui
        </p>
      </CardContent>
    </Card>
  );
};
