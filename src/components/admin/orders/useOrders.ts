
import { useState, useEffect } from 'react';
import { Order, OrderFilters, OrderStatus } from '@/types/orders';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useOrders = (activeFilters: OrderFilters) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Fetch orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Consulta pedidos e une com os clientes
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            customer:customers(*)
          `);
          
        if (error) throw error;
        
        if (!data || data.length === 0) {
          setOrders([]);
          setLoading(false);
          return;
        }
        
        // Formatar pedidos para usar no componente
        const formattedOrders: Order[] = data.map(order => ({
          id: order.id,
          orderNumber: order.order_number,
          date: order.created_at,
          customer: {
            id: order.customer?.id || '',
            name: order.customer?.name || 'Cliente desconhecido',
            email: order.customer?.email || '',
          },
          subtotal: order.subtotal || 0,
          shipping: order.shipping || 0,
          discount: order.discount || 0,
          total: order.total || 0,
          paymentMethod: order.payment_method || 'PIX',
          status: order.status as OrderStatus,
          items: [], // Na implementação real, buscaria os itens de cada pedido
        }));
        
        setOrders(formattedOrders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os pedidos.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [toast]);
  
  // View order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  // Delete order
  const handleDeleteOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
        
      if (error) throw error;
      
      setOrders(orders.filter(order => order.id !== orderId));
      
      toast({
        title: 'Pedido excluído',
        description: 'O pedido foi excluído com sucesso.'
      });
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o pedido.',
        variant: 'destructive'
      });
    }
  };
  
  // Change order status
  const handleChangeOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
        
      if (error) throw error;
      
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      ));
      
      toast({
        title: 'Status atualizado',
        description: `O pedido foi atualizado para ${newStatus}.`
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do pedido.',
        variant: 'destructive'
      });
    }
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
    loading,
    handleViewOrder,
    handleDeleteOrder,
    handleChangeOrderStatus,
    handlePageChange,
    setIsOrderDetailsOpen,
    setSelectedOrder
  };
};
