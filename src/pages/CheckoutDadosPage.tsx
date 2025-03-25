
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { CustomerInfoForm } from '@/components/checkout/CustomerInfoForm';
import { AddressForm } from '@/components/checkout/AddressForm';
import { HowFoundUsForm } from '@/components/checkout/HowFoundUsForm';
import { ShippingMethodForm } from '@/components/checkout/ShippingMethodForm';
import { useCheckoutForm } from '@/hooks/useCheckoutForm';
import { CheckoutPageHeader } from '@/components/checkout/CheckoutPageHeader';
import { CartSummary } from '@/components/checkout/CartSummary';
import { CheckoutNavigation } from '@/components/checkout/CheckoutNavigation';

export const CheckoutDadosPage: React.FC = () => {
  const { customerData } = useCheckout();
  const { setShippingMethod, items, total } = useCart();
  const { formErrors, handleChangeInput, handleSubmit } = useCheckoutForm();
  
  // Rolar para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return (
    <Layout>
      <div className="section-container py-6 md:py-12 animate-fade-in relative overflow-hidden bg-gradient-to-b from-white to-imperio-extra-light-navy/20">
        {/* Elementos decorativos - efeitos de luz e gradientes */}
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-white/10 to-red-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-gradient-to-tl from-blue-500/20 via-white/10 to-red-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
        
        {/* Grid de pontos decorativos */}
        <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>
        
        <div className="mb-8">
          <CheckoutSteps currentStep={2} />
        </div>
        
        <CheckoutPageHeader 
          title="Dados do Cliente e Envio"
          subtitle="Preencha suas informações para finalizar a compra com segurança"
        />
        
        {/* Resumo do carrinho - com efeito de vidro */}
        <CartSummary 
          itemsCount={items.length}
          total={total}
          currentStep={2}
          totalSteps={4}
        />
        
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {/* Formulário de Informações Pessoais */}
          <CustomerInfoForm 
            customerData={customerData}
            handleChangeInput={handleChangeInput}
            formErrors={formErrors}
          />
          
          {/* Formulário de Endereço */}
          <AddressForm 
            customerData={customerData}
            handleChangeInput={handleChangeInput}
            formErrors={formErrors}
          />

          {/* Como nos conheceu? - Movido para depois do endereço */}
          <HowFoundUsForm
            customerData={customerData}
            handleChangeInput={handleChangeInput}
          />
          
          {/* Formulário de Método de Envio */}
          <ShippingMethodForm 
            setShippingMethod={setShippingMethod}
            formErrors={formErrors}
          />
          
          <CheckoutNavigation 
            onContinue={handleSubmit}
            backLink="/carrinho"
            backText="Voltar ao Carrinho"
            continueText="Continuar"
          />
        </form>
      </div>
    </Layout>
  );
};
