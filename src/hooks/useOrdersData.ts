
import { useState, useEffect } from 'react';
import { Order, OrderFilters, OrderStatus } from '@/types/orders';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useOrdersData = (activeFilters?: OrderFilters) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Função para buscar pedidos
  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log('Buscando pedidos do Supabase...');
      // Busca pedidos com dados do cliente
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('Nenhum pedido encontrado');
        setOrders([]);
        setLoading(false);
        return [];
      }
      
      // Buscar itens dos pedidos
      const ordersWithItems = await Promise.all(
        data.map(async (order) => {
          const { data: itemsData, error: itemsError } = await supabase
            .from('order_items')
            .select(`
              *,
              product:products(*)
            `)
            .eq('order_id', order.id);
          
          if (itemsError) {
            console.error('Erro ao buscar itens do pedido:', itemsError);
            return {
              ...mapOrderFromSupabase(order),
              items: []
            };
          }
          
          return {
            ...mapOrderFromSupabase(order),
            items: itemsData ? mapOrderItemsFromSupabase(itemsData) : []
          };
        })
      );
      
      console.log(`${ordersWithItems.length} pedidos encontrados`);
      setOrders(ordersWithItems);
      return ordersWithItems;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os pedidos',
        variant: 'destructive'
      });
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  // Função para criar um novo pedido
  const createOrder = async (orderData: Partial<Order>) => {
    try {
      setLoading(true);
      console.log('Criando novo pedido:', orderData);
      
      // Primeiro, verifica se o cliente existe ou cria um novo
      let customerId = orderData.customer?.id;
      
      if (!customerId && orderData.customer) {
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('id')
          .eq('email', orderData.customer.email)
          .maybeSingle();
        
        if (customerError) throw customerError;
        
        if (customerData) {
          customerId = customerData.id;
        } else {
          const { data: newCustomer, error: newCustomerError } = await supabase
            .from('customers')
            .insert({
              name: orderData.customer.name,
              email: orderData.customer.email,
              phone: orderData.customer.phone || null
            })
            .select('id')
            .single();
          
          if (newCustomerError) throw newCustomerError;
          customerId = newCustomer.id;
        }
      }
      
      // Gera um número de pedido único
      const orderNumber = `PED${Date.now().toString().slice(-6)}`;
      
      // Cria o pedido
      const { data: newOrder, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_id: customerId,
          status: orderData.status || 'pending',
          payment_method: orderData.paymentMethod || 'PIX',
          subtotal: orderData.subtotal || 0,
          shipping: orderData.shipping || 0,
          discount: orderData.discount || 0,
          total: orderData.total || 0
        })
        .select('*')
        .single();
      
      if (orderError) throw orderError;
      
      // Adiciona os itens do pedido, se existirem
      if (orderData.items && orderData.items.length > 0) {
        const orderItems = orderData.items.map(item => ({
          order_id: newOrder.id,
          product_id: typeof item.id === 'string' ? item.id : null,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
        
        if (itemsError) throw itemsError;
      }
      
      toast({
        title: 'Pedido criado',
        description: `Pedido ${orderNumber} criado com sucesso!`
      });
      
      // Atualiza a lista de pedidos
      await fetchOrders();
      
      return newOrder;
    } catch (err) {
      console.error('Erro ao criar pedido:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o pedido',
        variant: 'destructive'
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Função para atualizar um pedido existente
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setLoading(true);
      console.log(`Atualizando status do pedido ${orderId} para ${newStatus}`);
      
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Atualiza o estado local
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus } 
            : order
        )
      );
      
      toast({
        title: 'Status atualizado',
        description: `O pedido foi atualizado para ${newStatus}.`
      });
      
      return true;
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do pedido',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Função para excluir um pedido
  const deleteOrder = async (orderId: string) => {
    try {
      setLoading(true);
      console.log(`Excluindo pedido ${orderId}`);
      
      // Primeiro exclui os itens do pedido
      const { error: itemsError } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', orderId);
      
      if (itemsError) throw itemsError;
      
      // Depois exclui o pedido
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Atualiza o estado local
      setOrders(prev => prev.filter(order => order.id !== orderId));
      
      toast({
        title: 'Pedido excluído',
        description: 'O pedido foi excluído com sucesso.'
      });
      
      return true;
    } catch (err) {
      console.error('Erro ao excluir pedido:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o pedido',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Funções auxiliares para mapear os dados do Supabase para o formato da aplicação
  const mapOrderFromSupabase = (order: any): Order => ({
    id: order.id,
    orderNumber: order.order_number,
    date: order.created_at,
    customer: {
      id: order.customer?.id || '',
      name: order.customer?.name || 'Cliente desconhecido',
      email: order.customer?.email || '',
      phone: order.customer?.phone || '',
    },
    items: [],
    subtotal: order.subtotal || 0,
    shipping: order.shipping || 0,
    discount: order.discount || 0,
    total: order.total || 0,
    paymentMethod: order.payment_method || 'PIX',
    status: order.status as OrderStatus,
  });
  
  const mapOrderItemsFromSupabase = (items: any[]) => {
    return items.map(item => ({
      id: item.id,
      name: item.product?.name || 'Produto indisponível',
      price: item.price || 0,
      quantity: item.quantity || 1,
      total: item.total || 0,
      productId: item.product_id,
    }));
  };
  
  // Carrega os pedidos quando o componente é montado ou os filtros mudam
  useEffect(() => {
    fetchOrders();
  }, [activeFilters?.status, activeFilters?.period]);
  
  // Filtra os pedidos com base nos filtros ativos
  const filteredOrders = activeFilters 
    ? orders.filter(order => {
        if (activeFilters.status === 'all') return true;
        return order.status === activeFilters.status;
      })
    : orders;
  
  return {
    orders,
    filteredOrders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder
  };
};
