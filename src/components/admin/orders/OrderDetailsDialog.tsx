
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { OrderSummary } from './OrderSummary';
import { OrderActions } from './OrderActions';
import { OrderMessage } from './OrderMessage';
import { useOrderMessage } from './useOrderMessage';
import { Order, OrderStatus } from '@/types/orders';
import { ScrollArea } from '@/components/ui/scroll-area';

// Default template - we'll get this from settings in a real implementation
const defaultTemplate = `*PEDIDO {orderNumber}*
*Data:* {date}
*Status:* {status}

*CLIENTE:*
Nome: {customer.name}
Email: {customer.email}

*PRODUTOS:*
{products}

*Método de Pagamento:* {paymentMethod}
*Frete:* {shipping}
*Desconto:* {discount}
*Subtotal:* {subtotal}
*TOTAL:* {total}`;

interface OrderDetailsDialogProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (newStatus: OrderStatus) => void;
}

export const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ 
  order, 
  isOpen, 
  onClose,
  onStatusChange
}) => {
  const [isOrderMessageOpen, setIsOrderMessageOpen] = useState(false);
  const { generateOrderMessage } = useOrderMessage();
  
  // In a real implementation, we would fetch this from an API
  const orderMessageTemplate = defaultTemplate;
  const orderMessage = generateOrderMessage(order, orderMessageTemplate);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 md:p-6">
          <DialogHeader className="p-4 md:p-0">
            <DialogTitle className="flex justify-between items-center">
              <span>Detalhes do Pedido {order.orderNumber}</span>
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(90vh-120px)] px-4 md:px-0">
            <div className="pr-4">
              <OrderSummary order={order} />
            </div>
          </ScrollArea>
          
          <DialogFooter className="p-4 md:p-0 mt-4">
            <OrderActions 
              order={order} 
              onStatusChange={onStatusChange}
              onViewOrderMessage={() => setIsOrderMessageOpen(true)}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <OrderMessage
        isOpen={isOrderMessageOpen}
        onOpenChange={setIsOrderMessageOpen}
        message={orderMessage}
      />
    </>
  );
};
