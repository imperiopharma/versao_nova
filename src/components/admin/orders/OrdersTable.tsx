
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
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <div className="rounded-md border bg-white overflow-hidden">
      <ScrollArea className="w-full max-w-full">
        <div className="min-w-full w-max md:w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Pedido</TableHead>
                <TableHead className="hidden md:table-cell w-[120px]">Data</TableHead>
                <TableHead className="w-[140px]">Cliente</TableHead>
                <TableHead className="text-right hidden md:table-cell w-[100px]">Total</TableHead>
                <TableHead className="hidden md:table-cell w-[120px]">Pagamento</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="text-center w-[60px]">Ações</TableHead>
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
      </ScrollArea>
    </div>
  );
};
