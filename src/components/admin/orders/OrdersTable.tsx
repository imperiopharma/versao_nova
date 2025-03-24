
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderTableRow } from './OrderTableRow';
import { Order, OrderStatus } from '@/types/orders';

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onChangeOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onViewOrder,
  onChangeOrderStatus,
  onDeleteOrder
}) => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Nenhum pedido encontrado com os filtros atuais.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <OrderTableRow
                key={order.id}
                order={order}
                onViewOrder={onViewOrder}
                onChangeOrderStatus={onChangeOrderStatus}
                onDeleteOrder={onDeleteOrder}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
