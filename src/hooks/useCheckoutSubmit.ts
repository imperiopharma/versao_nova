
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
    // Calcular o subtotal somando o preço * quantidade de cada item
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // Usar o desconto do contexto do carrinho ou zero se não existir
    const finalDiscount = discount || 0;
    
    // Usar o valor de frete do contexto do carrinho ou zero se não existir
    const finalShipping = shipping || 0;
    
    // Calcular o total final: subtotal + frete - desconto
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
      console.log(`Iniciando upload do comprovante para o pedido ${orderId}`);
      
      // Em um cenário real, aqui seria feito o upload para um servidor
      // Exemplo de implementação com FormData:
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('orderId', orderId);
      // const response = await fetch('/api/upload-proof', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      // return data.fileUrl;
      
      // Simulação: criar URL local do arquivo
      const proofUrl = URL.createObjectURL(file);
      console.log('Upload simulado concluído, URL:', proofUrl);
      
      return proofUrl;
    } catch (error) {
      console.error('Erro ao fazer upload do comprovante:', error);
      throw new Error('Não foi possível fazer o upload do comprovante. Por favor, tente novamente.');
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
      
      console.log('Dados do pedido preparados:', orderData);
      
      // Criar pedido 
      const newOrder = await createOrder(orderData);
      
      if (!newOrder) {
        throw new Error('Não foi possível criar o pedido');
      }
      
      console.log('Pedido criado com sucesso:', newOrder);
      
      // Fazer upload do comprovante
      if (paymentProofFile) {
        try {
          const proofUrl = await uploadPaymentProof(newOrder.id, paymentProofFile);
          console.log('Comprovante enviado:', proofUrl);
          
          // Atualizar o pedido com a URL do comprovante
          // Em um sistema real, você atualizaria o registro no banco de dados
          // await updateOrder(newOrder.id, { paymentProofUrl: proofUrl });
        } catch (uploadError) {
          console.error('Erro ao enviar comprovante:', uploadError);
          toast({
            title: 'Aviso',
            description: 'Pedido criado, mas houve um problema ao enviar o comprovante. Entre em contato com o suporte.',
            variant: 'destructive', // Corrigido: alterado de 'warning' para 'destructive'
          });
        }
      }
      
      // Marcar pedido como concluído
      setCompletedOrder(true);
      
      toast({
        title: 'Pedido realizado com sucesso!',
        description: `Seu pedido #${newOrder.order_number} foi recebido e está sendo processado.`, // Corrigido: alterado de orderNumber para order_number
      });
      
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
