
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { ChevronLeft, ChevronRight, ShoppingCart, ShieldCheck } from 'lucide-react';
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
      <div className="section-container py-6 md:py-12 animate-fade-in relative overflow-hidden">
        {/* Elemento decorativo - círculo grande com as cores do Paraguai */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 via-white/5 to-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-tl from-blue-500/10 via-white/5 to-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="mb-8">
          <CheckoutSteps currentStep={2} />
        </div>
        
        <div className="mb-8 text-center relative">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy bg-clip-text text-transparent">
            Dados do Cliente e Envio
          </h1>
          <p className="text-sm text-imperio-navy/60 mt-2 max-w-md mx-auto">
            Preencha suas informações para finalizar a compra com segurança
          </p>
          
          {/* Elemento decorativo - linha horizontal com gradiente */}
          <div className="w-24 h-1 bg-gradient-to-r from-imperio-navy to-imperio-light-navy mx-auto mt-4 rounded-full"></div>
          
          {/* Badge de segurança */}
          <div className="mx-auto mt-4 bg-imperio-extra-light-navy rounded-full px-4 py-1 inline-flex items-center gap-1">
            <ShieldCheck size={14} className="text-imperio-navy" />
            <span className="text-xs text-imperio-navy font-medium">Dados protegidos</span>
          </div>
        </div>
        
        {/* Resumo do carrinho - apenas visível em mobile */}
        <div className="md:hidden bg-gradient-to-r from-imperio-navy/10 to-imperio-light-navy/10 backdrop-blur-sm rounded-2xl p-5 mb-8 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-imperio-navy to-imperio-light-navy rounded-full p-3 shadow-md">
                <ShoppingCart size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-imperio-navy/70">Seu carrinho</p>
                <p className="font-bold text-imperio-navy text-lg">{cart.length} {cart.length === 1 ? 'item' : 'itens'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-imperio-navy/70">Total</p>
              <p className="text-imperio-navy font-bold text-lg">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>
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
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
            <Button
              variant="outline"
              asChild
              className="sm:order-1 border-imperio-navy/30 text-imperio-navy hover:bg-imperio-extra-light-navy transition-all duration-300 rounded-xl group relative overflow-hidden"
            >
              <Link to="/carrinho">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <ChevronLeft size={18} className="mr-2" />
                <span>Voltar ao Carrinho</span>
              </Link>
            </Button>
            
            <Button 
              type="submit"
              className="bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy hover:brightness-110 text-white sm:order-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span>Continuar</span>
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
