
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useOrdersData } from '@/hooks/useOrdersData';
import { Order } from '@/types/orders';

export const useCheckoutSubmit = () => {
  const { customerData, paymentProofFile, resetCustomerData, setCheckoutStep } = useCheckout();
  const { items, total, shipping, clearCart } = useCart();
  const { createOrder } = useOrdersData();
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleCompleteOrder = async () => {
    if (!paymentProofFile) {
      toast({
        title: 'Comprovante necessário',
        description: 'Por favor, anexe o comprovante do PIX para finalizar o pedido.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Iniciando criação do pedido...');
      
      // Preparar dados do pedido
      const orderData: Partial<Order> = {
        customer: {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.whatsapp
        },
        status: 'pending',
        paymentMethod: 'PIX',
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        subtotal: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        shipping: shipping || 0,
        discount: 0,
        total: total
      };
      
      // Criar pedido no Supabase
      const newOrder = await createOrder(orderData);
      
      if (!newOrder) {
        throw new Error('Não foi possível criar o pedido');
      }
      
      // Em um sistema real, aqui você faria o upload do comprovante
      // para o Storage do Supabase e associaria ao pedido
      
      // Marcar pedido como concluído
      setCompletedOrder(true);
      
      // Resetar estados após 5 segundos
      setTimeout(() => {
        clearCart();
        resetCustomerData();
        setCheckoutStep(1);
        navigate('/');
      }, 5000);
      
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      toast({
        title: 'Erro ao processar pedido',
        description: 'Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    handleCompleteOrder,
    loading,
    completedOrder,
    setCompletedOrder
  };
};
