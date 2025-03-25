
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/formatters';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'canceled';
}

interface RecentOrdersTableProps {
  orders: Order[];
  loading: boolean;
}

export const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders, loading }) => {
  const getStatusBadge = (status: Order['status']) => {
    const statusMap: Record<Order['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Aguardando Pagamento', variant: 'outline' },
      paid: { label: 'Pago', variant: 'secondary' },
      preparing: { label: 'Em Preparação', variant: 'secondary' },
      shipped: { label: 'Enviado', variant: 'default' },
      delivered: { label: 'Entregue', variant: 'default' },
      canceled: { label: 'Cancelado', variant: 'destructive' }
    };

    const { label, variant } = statusMap[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        Nenhum pedido recente encontrado.
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <Link to={`/admin/pedidos?id=${order.id}`} className="hover:underline text-imperio-navy">
                  {order.orderNumber}
                </Link>
              </TableCell>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="text-right">
                {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </TableCell>
              <TableCell className="text-center">
                {getStatusBadge(order.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
