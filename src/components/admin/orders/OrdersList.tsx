
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
  Truck, 
  Trash2, 
  Send, 
  Printer, 
  XCircle 
} from "lucide-react";
import { OrderDetailsDialog } from './OrderDetailsDialog';

// Dados de exemplo para desenvolvimento
const mockOrders = [
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
  activeFilters: {
    status: string;
    period: string;
  };
}

export const OrdersList: React.FC<OrdersListProps> = ({ activeFilters }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  // Formatação de data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleViewOrder = (order: any) => {
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
  
  // Cores e textos para os status dos pedidos
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Aguardando Pagamento' };
      case 'paid':
        return { color: 'bg-blue-100 text-blue-800', text: 'Pagamento Aprovado' };
      case 'preparing':
        return { color: 'bg-purple-100 text-purple-800', text: 'Em Preparação' };
      case 'shipped':
        return { color: 'bg-indigo-100 text-indigo-800', text: 'Enviado' };
      case 'delivered':
        return { color: 'bg-green-100 text-green-800', text: 'Entregue' };
      case 'canceled':
        return { color: 'bg-red-100 text-red-800', text: 'Cancelado' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Desconhecido' };
    }
  };

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
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusConfig(order.status).color} border-none`}
                    >
                      {getStatusConfig(order.status).text}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver pedido</span>
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Mais ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações do Pedido</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileEdit className="h-4 w-4 mr-2" />
                            Editar Pedido
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar E-mail
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="h-4 w-4 mr-2" />
                            Imprimir
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Alterar Status</DropdownMenuLabel>
                          
                          {order.status !== 'paid' && (
                            <DropdownMenuItem 
                              onClick={() => handleChangeOrderStatus(order.id, 'paid')}
                            >
                              <Badge className="bg-blue-100 text-blue-800 border-none mr-2">
                                Pagamento Aprovado
                              </Badge>
                            </DropdownMenuItem>
                          )}
                          
                          {order.status !== 'preparing' && (
                            <DropdownMenuItem 
                              onClick={() => handleChangeOrderStatus(order.id, 'preparing')}
                            >
                              <Badge className="bg-purple-100 text-purple-800 border-none mr-2">
                                Em Preparação
                              </Badge>
                            </DropdownMenuItem>
                          )}
                          
                          {order.status !== 'shipped' && (
                            <DropdownMenuItem 
                              onClick={() => handleChangeOrderStatus(order.id, 'shipped')}
                            >
                              <Badge className="bg-indigo-100 text-indigo-800 border-none mr-2">
                                Enviado
                              </Badge>
                            </DropdownMenuItem>
                          )}
                          
                          {order.status !== 'delivered' && (
                            <DropdownMenuItem 
                              onClick={() => handleChangeOrderStatus(order.id, 'delivered')}
                            >
                              <Badge className="bg-green-100 text-green-800 border-none mr-2">
                                Entregue
                              </Badge>
                            </DropdownMenuItem>
                          )}
                          
                          {order.status !== 'canceled' && (
                            <DropdownMenuItem 
                              onClick={() => handleChangeOrderStatus(order.id, 'canceled')}
                            >
                              <Badge className="bg-red-100 text-red-800 border-none mr-2">
                                Cancelado
                              </Badge>
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir Pedido
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
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
