
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useOrdersData } from '@/hooks/useOrdersData';
import { Order } from '@/types/orders';

export const useCheckoutSubmit = () => {
  const { customerData, paymentProofFile, resetCustomerData, setCheckoutStep } = useCheckout();
  const { items, total, shipping, discount, clearCart } = useCart();
  const { createOrder } = useOrdersData();
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Função para calcular os valores do pedido
  const calculateOrderValues = () => {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // Calcular desconto (se houver cupom, isso será aplicado pelo CartContext)
    const finalDiscount = discount || 0;
    
    // Calcular frete
    const finalShipping = shipping || 0;
    
    // Calcular total final
    const finalTotal = subtotal + finalShipping - finalDiscount;
    
    return {
      subtotal,
      discount: finalDiscount,
      shipping: finalShipping,
      total: finalTotal
    };
  };
  
  // Função para fazer upload do comprovante
  const uploadPaymentProof = async (orderId: string, file: File): Promise<string> => {
    try {
      // Simulação: normalmente isso enviaria o arquivo para um servidor
      // Nesse exemplo, só vamos fingir que o upload foi feito e retornar uma URL
      console.log(`Fazendo upload do comprovante para o pedido ${orderId}`);
      
      // Em um cenário real, você faria o upload do arquivo para o servidor
      // e receberia a URL de volta
      
      // URL simulada do comprovante
      const proofUrl = URL.createObjectURL(file);
      
      // Retorna a URL do comprovante
      return proofUrl;
    } catch (error) {
      console.error('Erro ao fazer upload do comprovante:', error);
      throw new Error('Não foi possível fazer o upload do comprovante');
    }
  };
  
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
      
      // Calcular valores do pedido
      const orderValues = calculateOrderValues();
      
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
        subtotal: orderValues.subtotal,
        shipping: orderValues.shipping,
        discount: orderValues.discount,
        total: orderValues.total
      };
      
      // Criar pedido 
      const newOrder = await createOrder(orderData);
      
      if (!newOrder) {
        throw new Error('Não foi possível criar o pedido');
      }
      
      // Fazer upload do comprovante
      if (paymentProofFile) {
        const proofUrl = await uploadPaymentProof(newOrder.id, paymentProofFile);
        
        // Atualizar o pedido com a URL do comprovante
        // Em um sistema real, você atualizaria o registro no banco de dados
        console.log(`Comprovante enviado: ${proofUrl}`);
      }
      
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
