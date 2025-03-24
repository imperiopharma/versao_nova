import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetailsDialog } from './OrderDetailsDialog';
import { OrderTableRow } from './OrderTableRow';
import { Order, OrderFilters } from '@/types/orders';

// Dados de exemplo para desenvolvimento
const mockOrders: Order[] = [
  { 
    id: '12345',
    orderNumber: 'PED-12345',
    date: '2023-06-20T10:30:00',
    customer: {
      name: 'João Silva',
      email: 'joao.silva@email.com'
    },
    items: [
      { id: 1, name: 'Produto A', price: 89.90, quantity: 1 },
      { id: 2, name: 'Produto B', price: 129.90, quantity: 2 }
    ],
    subtotal: 349.70,
    shipping: 15.00,
    discount: 0,
    total: 364.70,
    paymentMethod: 'PIX',
    status: 'paid'
  },
  { 
    id: '12346',
    orderNumber: 'PED-12346',
    date: '2023-06-19T14:25:00',
    customer: {
      name: 'Maria Santos',
      email: 'maria.santos@email.com'
    },
    items: [
      { id: 3, name: 'Produto C', price: 49.90, quantity: 3 }
    ],
    subtotal: 149.70,
    shipping: 0,
    discount: 15.00,
    total: 134.70,
    paymentMethod: 'Cartão de Crédito',
    status: 'preparing'
  },
  { 
    id: '12347',
    orderNumber: 'PED-12347',
    date: '2023-06-18T09:15:00',
    customer: {
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com'
    },
    items: [
      { id: 4, name: 'Produto D', price: 239.90, quantity: 1 }
    ],
    subtotal: 239.90,
    shipping: 25.00,
    discount: 0,
    total: 264.90,
    paymentMethod: 'Boleto',
    status: 'pending'
  },
  { 
    id: '12348',
    orderNumber: 'PED-12348',
    date: '2023-06-15T16:45:00',
    customer: {
      name: 'Ana Souza',
      email: 'ana.souza@email.com'
    },
    items: [
      { id: 5, name: 'Produto E', price: 149.90, quantity: 1 },
      { id: 6, name: 'Produto F', price: 89.90, quantity: 1 }
    ],
    subtotal: 239.80,
    shipping: 18.50,
    discount: 20.00,
    total: 238.30,
    paymentMethod: 'PIX',
    status: 'shipped'
  },
  { 
    id: '12349',
    orderNumber: 'PED-12349',
    date: '2023-06-10T11:20:00',
    customer: {
      name: 'Paulo Mendes',
      email: 'paulo.mendes@email.com'
    },
    items: [
      { id: 7, name: 'Produto G', price: 59.90, quantity: 2 }
    ],
    subtotal: 119.80,
    shipping: 15.00,
    discount: 0,
    total: 134.80,
    paymentMethod: 'Cartão de Crédito',
    status: 'delivered'
  },
  { 
    id: '12350',
    orderNumber: 'PED-12350',
    date: '2023-06-05T13:10:00',
    customer: {
      name: 'Fernanda Lima',
      email: 'fernanda.lima@email.com'
    },
    items: [
      { id: 8, name: 'Produto H', price: 299.90, quantity: 1 }
    ],
    subtotal: 299.90,
    shipping: 0,
    discount: 30.00,
    total: 269.90,
    paymentMethod: 'Boleto',
    status: 'canceled'
  }
];

interface OrdersListProps {
  activeFilters: OrderFilters;
}

export const OrdersList: React.FC<OrdersListProps> = ({ activeFilters }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  const handleDeleteOrder = (orderId: string) => {
    // Na implementação real, aqui seria uma chamada à API
    setOrders(orders.filter(order => order.id !== orderId));
  };
  
  const handleChangeOrderStatus = (orderId: string, newStatus: string) => {
    // Na implementação real, aqui seria uma chamada à API
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    ));
  };
  
  // Filtragem por status
  const filteredOrders = orders.filter(order => {
    if (activeFilters.status === 'all') return true;
    return order.status === activeFilters.status;
  });

  return (
    <div className="space-y-4">
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
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum pedido encontrado com os filtros atuais.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <OrderTableRow
                  key={order.id}
                  order={order}
                  onViewOrder={handleViewOrder}
                  onChangeOrderStatus={handleChangeOrderStatus}
                  onDeleteOrder={handleDeleteOrder}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {isOrderDetailsOpen && selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isOrderDetailsOpen}
          onClose={() => {
            setIsOrderDetailsOpen(false);
            setSelectedOrder(null);
          }}
          onStatusChange={(newStatus) => {
            handleChangeOrderStatus(selectedOrder.id, newStatus);
          }}
        />
      )}
    </div>
  );
};
