
import { useState } from 'react';
import { Order, OrderFilters, OrderStatus } from '@/types/orders';
import { useOrdersData } from '@/hooks/useOrdersData';

export const useOrders = (activeFilters: OrderFilters) => {
  const {
    filteredOrders,
    loading,
    updateOrderStatus,
    deleteOrder
  } = useOrdersData(activeFilters);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // View order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  // Change order status
  const handleChangeOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    
    // Atualiza o pedido selecionado se estiver aberto
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus
      });
    }
  };
  
  // Handle page change
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
    loading,
    handleViewOrder,
    handleDeleteOrder: deleteOrder,
    handleChangeOrderStatus,
    handlePageChange,
    setIsOrderDetailsOpen,
    setSelectedOrder
  };
};
