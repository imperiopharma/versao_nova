
import { useState, useEffect } from 'react';
import { Order, OrderFilters, OrderStatus } from '@/types/orders';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export const useOrdersData = (activeFilters?: OrderFilters) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const API_URL = '/api';
  
  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log('Buscando pedidos da API...');
      const { data: response } = await axios.get(`${API_URL}/pedidos`);
      
      if (!response.data || response.data.length === 0) {
        console.log('Nenhum pedido encontrado');
        setOrders([]);
        setLoading(false);
        return [];
      }
      
      const ordersData = response.data;
      
      // Buscar os itens para cada pedido
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order: any) => {
          try {
            const { data: itemsResponse } = await axios.get(`${API_URL}/pedidos/${order.id}/itens`);
            const itemsData = itemsResponse.data || [];
            
            return {
              ...mapOrderFromAPI(order),
              items: mapOrderItemsFromAPI(itemsData)
            };
          } catch (err) {
            console.error('Erro ao buscar itens do pedido:', err);
            return {
              ...mapOrderFromAPI(order),
              items: []
            };
          }
        })
      );
      
      console.log(`${ordersWithItems.length} pedidos encontrados`);
      setOrders(ordersWithItems);
      setLoading(false);
      return ordersWithItems;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao buscar pedidos:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os pedidos',
        variant: 'destructive'
      });
      setLoading(false);
      return [];
    }
  };
  
  const createOrder = async (orderData: Partial<Order>) => {
    try {
      setLoading(true);
      console.log('Criando novo pedido:', orderData);
      
      // Primeiro, verificar se o cliente existe ou criar um novo
      let customerId = null;
      
      if (orderData.customer) {
        try {
          // Verificar se o cliente existe
          const { data: customerResponse } = await axios.get(`${API_URL}/clientes`, {
            params: { email: orderData.customer.email }
          });
          
          if (customerResponse.data && customerResponse.data.length > 0) {
            customerId = customerResponse.data[0].id;
          } else {
            // Criar novo cliente
            const { data: newCustomerResponse } = await axios.post(`${API_URL}/clientes`, {
              name: orderData.customer.name,
              email: orderData.customer.email,
              phone: orderData.customer.phone || ''
            });
            
            if (newCustomerResponse.data && newCustomerResponse.data.id) {
              customerId = newCustomerResponse.data.id;
            }
          }
        } catch (err) {
          console.error('Erro ao processar cliente:', err);
          throw new Error('Não foi possível processar os dados do cliente');
        }
      }
      
      // Criar pedido
      const orderPayload = {
        customer_id: customerId,
        status: orderData.status || 'pending',
        payment_method: orderData.paymentMethod || 'PIX',
        subtotal: orderData.subtotal || 0,
        shipping: orderData.shipping || 0,
        discount: orderData.discount || 0,
        total: orderData.total || 0
      };
      
      const { data: orderResponse } = await axios.post(`${API_URL}/pedidos`, orderPayload);
      
      if (!orderResponse.data || !orderResponse.data.id) {
        throw new Error('Erro ao criar pedido');
      }
      
      const newOrderId = orderResponse.data.id;
      
      // Adicionar itens do pedido
      if (orderData.items && orderData.items.length > 0) {
        for (const item of orderData.items) {
          await axios.post(`${API_URL}/pedidos/${newOrderId}/itens`, {
            product_id: typeof item.id === 'string' ? item.id : null,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
          });
        }
      }
      
      toast({
        title: 'Pedido criado',
        description: `Pedido #${newOrderId} criado com sucesso!`
      });
      
      await fetchOrders();
      setLoading(false);
      
      return orderResponse.data;
    } catch (err) {
      console.error('Erro ao criar pedido:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o pedido',
        variant: 'destructive'
      });
      setLoading(false);
      return null;
    }
  };
  
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setLoading(true);
      console.log(`Atualizando status do pedido ${orderId} para ${newStatus}`);
      
      const { data: response } = await axios.put(`${API_URL}/pedidos/${orderId}`, {
        status: newStatus
      });
      
      if (response.success) {
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
        
        setLoading(false);
        return true;
      } else {
        throw new Error(response.error || 'Erro ao atualizar status');
      }
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do pedido',
        variant: 'destructive'
      });
      setLoading(false);
      return false;
    }
  };
  
  const deleteOrder = async (orderId: string) => {
    try {
      setLoading(true);
      console.log(`Excluindo pedido ${orderId}`);
      
      // Primeiro excluir os itens do pedido
      await axios.delete(`${API_URL}/pedidos/${orderId}/itens`);
      
      // Depois excluir o pedido
      const { data: response } = await axios.delete(`${API_URL}/pedidos/${orderId}`);
      
      if (response.success) {
        setOrders(prev => prev.filter(order => order.id !== orderId));
        
        toast({
          title: 'Pedido excluído',
          description: 'O pedido foi excluído com sucesso.'
        });
        
        setLoading(false);
        return true;
      } else {
        throw new Error(response.error || 'Erro ao excluir pedido');
      }
    } catch (err) {
      console.error('Erro ao excluir pedido:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o pedido',
        variant: 'destructive'
      });
      setLoading(false);
      return false;
    }
  };
  
  const mapOrderFromAPI = (order: any): Order => ({
    id: order.id,
    orderNumber: order.order_number,
    date: order.created_at,
    customer: {
      name: order.customer_name || 'Cliente desconhecido',
      email: order.customer_email || '',
      phone: order.customer_phone || '',
    },
    items: [],
    subtotal: parseFloat(order.subtotal) || 0,
    shipping: parseFloat(order.shipping) || 0,
    discount: parseFloat(order.discount) || 0,
    total: parseFloat(order.total) || 0,
    paymentMethod: order.payment_method || 'PIX',
    status: order.status as OrderStatus,
  });
  
  const mapOrderItemsFromAPI = (items: any[]) => {
    return items.map(item => ({
      id: item.id,
      name: item.product_name || 'Produto indisponível',
      price: parseFloat(item.price) || 0,
      quantity: parseInt(item.quantity) || 1,
      total: parseFloat(item.total) || 0,
      productId: item.product_id,
    }));
  };
  
  useEffect(() => {
    fetchOrders();
  }, [activeFilters?.status, activeFilters?.period]);
  
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
