
import { useState } from 'react';
import { Order, OrderFilters, OrderStatus } from '@/types/orders';

export const useOrders = (activeFilters: OrderFilters) => {
  // Estado inicial vazio para pedidos
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // View order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  // Delete order
  const handleDeleteOrder = (orderId: string) => {
    // Em uma implementação real, isso seria uma chamada de API
    setOrders(orders.filter(order => order.id !== orderId));
  };
  
  // Change order status
  const handleChangeOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // Em uma implementação real, isso seria uma chamada de API
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    ));
  };
  
  // Filter orders by status
  const filteredOrders = orders.filter(order => {
    if (activeFilters.status === 'all') return true;
    return order.status === activeFilters.status;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentOrders,
    filteredOrders,
    selectedOrder,
    isOrderDetailsOpen,
    currentPage,
    totalPages,
    handleViewOrder,
    handleDeleteOrder,
    handleChangeOrderStatus,
    handlePageChange,
    setIsOrderDetailsOpen,
    setSelectedOrder
  };
};
