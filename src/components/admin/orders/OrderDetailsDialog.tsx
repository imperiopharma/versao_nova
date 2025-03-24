
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
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Detalhes do Pedido {order.orderNumber}</span>
            </DialogTitle>
          </DialogHeader>
          
          <OrderSummary order={order} />
          
          <DialogFooter>
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
