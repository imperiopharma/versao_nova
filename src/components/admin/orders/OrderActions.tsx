
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
    <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Send className="h-4 w-4 mr-1" />
          Enviar E-mail
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Nota Fiscal
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Select 
          value={order.status}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="w-[180px]">
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
          Visualizar Pedido
        </Button>
        
        <DialogClose asChild>
          <Button variant="outline">Fechar</Button>
        </DialogClose>
        
        {order.status === 'paid' && (
          <Button 
            onClick={() => onStatusChange('preparing')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Package className="h-4 w-4 mr-1" />
            Iniciar Preparação
          </Button>
        )}
        
        {order.status === 'preparing' && (
          <Button 
            onClick={() => onStatusChange('shipped')}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Truck className="h-4 w-4 mr-1" />
            Marcar como Enviado
          </Button>
        )}
      </div>
    </div>
  );
};
