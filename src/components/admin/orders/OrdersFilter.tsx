
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, RefreshCw, Download } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface OrdersFilterProps {
  activeFilters: {
    status: string;
    period: string;
  };
  setActiveFilters: React.Dispatch<React.SetStateAction<{
    status: string;
    period: string;
  }>>;
}

export const OrdersFilter: React.FC<OrdersFilterProps> = ({ 
  activeFilters, 
  setActiveFilters 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex gap-2 items-center flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Buscar por número de pedido, cliente ou e-mail" 
              className="pl-8"
            />
          </div>
          
          <Button variant="outline" size="icon" className="min-w-9 h-9" title="Atualizar">
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="min-w-9 h-9" title="Exportar para Excel">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="flex gap-2 items-center max-w-xs w-full">
            <div className="flex-1">
              <Select 
                value={activeFilters.status}
                onValueChange={(value) => setActiveFilters({...activeFilters, status: value})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status do pedido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="pending">Aguardando Pagamento</SelectItem>
                  <SelectItem value="paid">Pagamento Aprovado</SelectItem>
                  <SelectItem value="preparing">Em Preparação</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select 
                value={activeFilters.period}
                onValueChange={(value) => setActiveFilters({...activeFilters, period: value})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="yesterday">Ontem</SelectItem>
                  <SelectItem value="7days">Últimos 7 dias</SelectItem>
                  <SelectItem value="30days">Últimos 30 dias</SelectItem>
                  <SelectItem value="90days">Últimos 90 dias</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Mais Filtros</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
