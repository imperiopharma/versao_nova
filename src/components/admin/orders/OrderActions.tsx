
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { 
  Send, 
  Download, 
  Package,
  Truck,
  Eye
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Order, OrderStatus } from '@/types/orders';

interface OrderActionsProps {
  order: Order;
  onStatusChange: (newStatus: OrderStatus) => void;
  onViewOrderMessage: () => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({ 
  order, 
  onStatusChange,
  onViewOrderMessage
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:justify-between w-full">
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm">
          <Send className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Enviar E-mail</span>
          <span className="sm:hidden">E-mail</span>
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Nota Fiscal</span>
          <span className="sm:hidden">NF</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap mt-2 sm:mt-0">
        <Select 
          value={order.status}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="w-[180px] max-w-full">
            <SelectValue placeholder="Alterar Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Aguardando Pagamento</SelectItem>
            <SelectItem value="paid">Pagamento Aprovado</SelectItem>
            <SelectItem value="preparing">Em Preparação</SelectItem>
            <SelectItem value="shipped">Enviado</SelectItem>
            <SelectItem value="delivered">Entregue</SelectItem>
            <SelectItem value="canceled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onViewOrderMessage}
        >
          <Eye className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Visualizar Pedido</span>
          <span className="sm:hidden">Ver</span>
        </Button>
        
        <DialogClose asChild>
          <Button variant="outline" size="sm">Fechar</Button>
        </DialogClose>
        
        {order.status === 'paid' && (
          <Button 
            onClick={() => onStatusChange('preparing')}
            className="bg-purple-600 hover:bg-purple-700 mt-2 w-full sm:w-auto sm:mt-0"
            size="sm"
          >
            <Package className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Iniciar Preparação</span>
            <span className="sm:hidden">Preparar</span>
          </Button>
        )}
        
        {order.status === 'preparing' && (
          <Button 
            onClick={() => onStatusChange('shipped')}
            className="bg-indigo-600 hover:bg-indigo-700 mt-2 w-full sm:w-auto sm:mt-0"
            size="sm"
          >
            <Truck className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Marcar como Enviado</span>
            <span className="sm:hidden">Enviar</span>
          </Button>
        )}
      </div>
    </div>
  );
};
