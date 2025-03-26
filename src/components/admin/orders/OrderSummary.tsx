
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, getStatusConfig } from '@/lib/formatters';
import { Order } from '@/types/orders';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <div className="text-sm">Data do Pedido:</div>
          <div className="font-medium">{formatDate(order.date)}</div>
        </div>
        
        <Badge 
          variant="outline" 
          className={`${getStatusConfig(order.status).color} border-none mt-2 sm:mt-0`}
        >
          {getStatusConfig(order.status).label}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-1 p-3 border rounded-md">
          <div className="font-medium">Informações do Cliente</div>
          <div>{order.customer.name}</div>
          <div className="text-sm text-muted-foreground break-words">{order.customer.email}</div>
        </div>
        
        <div className="space-y-1 p-3 border rounded-md">
          <div className="font-medium">Informações de Pagamento</div>
          <div>Método: {order.paymentMethod}</div>
          <div className="text-sm text-muted-foreground">
            Status: {getStatusConfig(order.status).label}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="font-medium mb-2">Itens do Pedido</div>
        <div className="border rounded-md overflow-hidden">
          <ScrollArea className="w-full max-w-full">
            <div className="min-w-full w-max md:w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%] md:w-auto">Produto</TableHead>
                    <TableHead className="text-right w-[15%]">Preço</TableHead>
                    <TableHead className="text-center w-[15%]">Qtd</TableHead>
                    <TableHead className="text-right w-[20%]">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-[150px] md:max-w-none truncate">{item.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </div>
      </div>
      
      <div className="space-y-2 p-3 border rounded-md mb-4">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Frete</span>
          <span>{formatCurrency(order.shipping)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Desconto</span>
            <span>-{formatCurrency(order.discount)}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between items-center font-bold">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>
    </>
  );
};
