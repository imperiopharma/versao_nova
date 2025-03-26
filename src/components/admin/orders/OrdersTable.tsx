
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
    <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[100px] py-3">Pedido</TableHead>
              <TableHead className="w-[120px] py-3">Data</TableHead>
              <TableHead className="w-[140px] py-3">Cliente</TableHead>
              <TableHead className="text-right w-[100px] py-3">Total</TableHead>
              <TableHead className="w-[120px] py-3">Pagamento</TableHead>
              <TableHead className="w-[100px] py-3">Status</TableHead>
              <TableHead className="text-center w-[100px] py-3">Ações</TableHead>
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
    </div>
  );
};
