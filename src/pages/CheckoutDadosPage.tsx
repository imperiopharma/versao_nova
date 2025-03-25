
import React, { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCheckoutForm } from '../hooks/useCheckoutForm';
import { CustomerInfoForm } from '../components/checkout/CustomerInfoForm';
import { AddressForm } from '../components/checkout/AddressForm';
import { HowFoundUsForm } from '../components/checkout/HowFoundUsForm';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { useToast } from '@/hooks/use-toast';
import { CheckoutPageHeader } from '@/components/checkout/CheckoutPageHeader';
import { CartSummary } from '@/components/checkout/CartSummary';
import { CheckoutNavigation } from '@/components/checkout/CheckoutNavigation';
import { useCheckout } from '@/contexts/CheckoutContext';

export const CheckoutDadosPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, itemCount, total } = useCart();
  const { toast } = useToast();
  const { customerData } = useCheckout();
  const { 
    formErrors, 
    handleChangeInput, 
    handleSubmit 
  } = useCheckoutForm();

  useEffect(() => {
    // Redirecionar para o carrinho se estiver vazio
    if (items.length === 0) {
      navigate('/carrinho');
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho para continuar com a compra.",
      });
    }
  }, [items, navigate]);

  const handleContinue = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <Layout>
      <div className="section-container py-10">
        <CheckoutPageHeader 
          title="Informações de Entrega" 
          subtitle="Preencha seus dados para enviarmos seu pedido corretamente"
        />
        
        <CartSummary 
          itemsCount={itemCount}
          total={total}
          currentStep={1}
          totalSteps={3}
        />
        
        <CheckoutSteps currentStep={1} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <CustomerInfoForm 
              customerData={customerData}
              handleChangeInput={handleChangeInput}
              formErrors={formErrors}
            />
            
            <AddressForm 
              customerData={customerData}
              handleChangeInput={handleChangeInput}
              formErrors={formErrors}
            />
            
            <HowFoundUsForm 
              customerData={customerData}
              handleChangeInput={handleChangeInput}
            />
            
            <CheckoutNavigation 
              onContinue={handleContinue}
              backLink="/carrinho"
              backText="Voltar para o Carrinho"
              continueText="Continuar para Pagamento"
            />
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-imperio-navy">Resumo do Pedido</h3>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-white rounded border overflow-hidden flex-shrink-0">
                      {item.image && (
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                      <p className="text-sm text-imperio-navy font-medium">
                        {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Frete:</span>
                    <span>Calculado no próximo passo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
