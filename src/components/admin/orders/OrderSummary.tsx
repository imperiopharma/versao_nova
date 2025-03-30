
import React from 'react';
import { Order, OrderStatus } from '@/types/orders';
import { formatCurrency } from '@/lib/formatters';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PaymentProofView } from './PaymentProofView';

// Cores para status de pedido
const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500',
  paid: 'bg-green-500',
  preparing: 'bg-purple-500',
  shipped: 'bg-blue-500',
  delivered: 'bg-teal-500',
  canceled: 'bg-red-500',
};

// Nomes em português para status
const statusNames: Record<OrderStatus, string> = {
  pending: 'Aguardando Pagamento',
  paid: 'Pagamento Aprovado',
  preparing: 'Em Preparação',
  shipped: 'Enviado',
  delivered: 'Entregue',
  canceled: 'Cancelado',
};

interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detalhes do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Número do Pedido</p>
              <p className="font-medium">{order.orderNumber}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Data</p>
              <p className="font-medium">
                {format(new Date(order.date), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className={`${statusColors[order.status]} mt-1`}>
                {statusNames[order.status]}
              </Badge>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Cliente</p>
            <div className="space-y-1">
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-sm">{order.customer.email}</p>
              {order.customer.phone && (
                <p className="text-sm">{order.customer.phone}</p>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Método de Pagamento</p>
            <div className="flex justify-between items-center">
              <p className="font-medium">{order.paymentMethod}</p>
              
              {/* Comprovante de Pagamento */}
              {order.paymentMethod === 'PIX' && (
                <PaymentProofView 
                  proofUrl={order.paymentProofUrl} 
                  orderNumber={order.orderNumber} 
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Itens do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.price)} x {item.quantity}
                  </p>
                </div>
                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>{formatCurrency(order.subtotal)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-muted-foreground">Frete</p>
                <p>{formatCurrency(order.shipping)}</p>
              </div>
              
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Desconto</p>
                  <p className="text-green-600">-{formatCurrency(order.discount)}</p>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>{formatCurrency(order.total)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
