
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Download } from 'lucide-react';

export const FinancePageHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <h1 className="text-xl md:text-2xl font-bold">Financeiro</h1>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Calendar size={16} className="mr-2" />
          Jun 2023
        </Button>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Download size={16} className="mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};
