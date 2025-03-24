
import React from 'react';
import { OrdersTable } from './OrdersTable';
import { OrdersPagination } from './OrdersPagination';
import { OrderDetailsDialog } from './OrderDetailsDialog';
import { useOrders } from './useOrders';
import { OrderFilters } from '@/types/orders';

interface OrdersListProps {
  activeFilters: OrderFilters;
}

export const OrdersList: React.FC<OrdersListProps> = ({ activeFilters }) => {
  const {
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
  } = useOrders(activeFilters);

  return (
    <div className="space-y-4">
      <OrdersTable
        orders={currentOrders}
        onViewOrder={handleViewOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
        onDeleteOrder={handleDeleteOrder}
      />

      {filteredOrders.length > 0 && totalPages > 1 && (
        <OrdersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      
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
