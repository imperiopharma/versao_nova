
import React from 'react';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  MoreVertical, 
  FileEdit, 
  Send, 
  Printer, 
  Trash2 
} from "lucide-react";
import { formatCurrency, formatDate, getStatusConfig } from '@/lib/formatters';
import { Order, OrderStatus } from '@/types/orders';

interface OrderTableRowProps {
  order: Order;
  onViewOrder: (order: Order) => void;
  onChangeOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
}

export const OrderTableRow: React.FC<OrderTableRowProps> = ({ 
  order, 
  onViewOrder, 
  onChangeOrderStatus, 
  onDeleteOrder 
}) => {
  return (
    <TableRow key={order.id}>
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{order.orderNumber}</span>
          <span className="text-xs text-muted-foreground md:hidden">
            {formatDate(order.date)}
          </span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{formatDate(order.date)}</TableCell>
      <TableCell>
        <div>
          <div className="font-medium truncate max-w-[120px]">{order.customer.name}</div>
          <div className="text-xs text-muted-foreground hidden md:block truncate max-w-[120px]">{order.customer.email}</div>
        </div>
      </TableCell>
      <TableCell className="text-right font-medium hidden md:table-cell">
        {formatCurrency(order.total)}
      </TableCell>
      <TableCell className="hidden md:table-cell">{order.paymentMethod}</TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className={`${getStatusConfig(order.status).color} border-none text-xs whitespace-nowrap`}
        >
          {getStatusConfig(order.status).label}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Ações</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações do Pedido</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewOrder(order)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileEdit className="h-4 w-4 mr-2" />
                Editar Pedido
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Alterar Status</DropdownMenuLabel>
              
              {order.status !== 'paid' && (
                <DropdownMenuItem 
                  onClick={() => onChangeOrderStatus(order.id, 'paid')}
                >
                  <Badge className="bg-blue-100 text-blue-800 border-none mr-2">
                    Pagamento Aprovado
                  </Badge>
                </DropdownMenuItem>
              )}
              
              {order.status !== 'preparing' && (
                <DropdownMenuItem 
                  onClick={() => onChangeOrderStatus(order.id, 'preparing')}
                >
                  <Badge className="bg-purple-100 text-purple-800 border-none mr-2">
                    Em Preparação
                  </Badge>
                </DropdownMenuItem>
              )}
              
              {order.status !== 'shipped' && (
                <DropdownMenuItem 
                  onClick={() => onChangeOrderStatus(order.id, 'shipped')}
                >
                  <Badge className="bg-indigo-100 text-indigo-800 border-none mr-2">
                    Enviado
                  </Badge>
                </DropdownMenuItem>
              )}
              
              {order.status !== 'delivered' && (
                <DropdownMenuItem 
                  onClick={() => onChangeOrderStatus(order.id, 'delivered')}
                >
                  <Badge className="bg-green-100 text-green-800 border-none mr-2">
                    Entregue
                  </Badge>
                </DropdownMenuItem>
              )}
              
              {order.status !== 'canceled' && (
                <DropdownMenuItem 
                  onClick={() => onChangeOrderStatus(order.id, 'canceled')}
                >
                  <Badge className="bg-red-100 text-red-800 border-none mr-2">
                    Cancelado
                  </Badge>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onDeleteOrder(order.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Pedido
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};
