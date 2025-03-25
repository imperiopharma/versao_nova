
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerInfoForm } from '@/components/checkout/CustomerInfoForm';
import { AddressForm } from '@/components/checkout/AddressForm';
import { HowFoundUsForm } from '@/components/checkout/HowFoundUsForm';
import { ShippingMethodForm } from '@/components/checkout/ShippingMethodForm';
import { useCheckoutForm } from '@/hooks/useCheckoutForm';

export const CheckoutDadosPage: React.FC = () => {
  const { customerData } = useCheckout();
  const { setShippingMethod, cart, total } = useCart();
  const { formErrors, handleChangeInput, handleSubmit } = useCheckoutForm();
  
  // Rolar para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return (
    <Layout>
      <div className="section-container py-6 md:py-12 animate-fade-in">
        <div className="mb-8">
          <CheckoutSteps currentStep={2} />
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent">
            Dados do Cliente e Envio
          </h1>
          <p className="text-sm text-imperio-navy/60 mt-2">
            Preencha com suas informações para finalizar a compra
          </p>
        </div>
        
        {/* Resumo do carrinho - apenas visível em mobile */}
        <div className="md:hidden bg-imperio-extra-light-navy rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-imperio-navy rounded-full p-2">
              <ShoppingCart size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-imperio-navy/70">Seu carrinho</p>
              <p className="font-bold text-imperio-navy">{cart.length} {cart.length === 1 ? 'item' : 'itens'}</p>
            </div>
          </div>
          <p className="text-imperio-navy font-bold">
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
        
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
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <Button
              variant="outline"
              asChild
              className="sm:order-1 border-imperio-navy text-imperio-navy hover:bg-imperio-extra-light-navy transition-all duration-300"
            >
              <Link to="/carrinho">
                <ChevronLeft size={18} className="mr-2" />
                Voltar ao Carrinho
              </Link>
            </Button>
            
            <Button 
              type="submit"
              className="bg-gradient-to-r from-imperio-navy to-imperio-light-navy hover:brightness-110 text-white sm:order-2 font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Continuar
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
