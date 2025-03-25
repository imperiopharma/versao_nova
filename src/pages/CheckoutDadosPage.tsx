
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { ChevronLeft, ChevronRight, ShoppingCart, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerInfoForm } from '@/components/checkout/CustomerInfoForm';
import { AddressForm } from '@/components/checkout/AddressForm';
import { HowFoundUsForm } from '@/components/checkout/HowFoundUsForm';
import { ShippingMethodForm } from '@/components/checkout/ShippingMethodForm';
import { useCheckoutForm } from '@/hooks/useCheckoutForm';

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
        
        <div className="mb-8 text-center relative">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy bg-clip-text text-transparent">
            Dados do Cliente e Envio
          </h1>
          <p className="text-sm text-imperio-navy/60 mt-2 max-w-md mx-auto">
            Preencha suas informações para finalizar a compra com segurança
          </p>
          
          {/* Elemento decorativo - linha horizontal com gradiente */}
          <div className="w-32 h-1 bg-gradient-to-r from-imperio-navy to-imperio-light-navy mx-auto mt-4 rounded-full"></div>
          
          {/* Badge de segurança com efeito de brilho */}
          <div className="mx-auto mt-4 bg-gradient-to-r from-imperio-extra-light-navy/80 to-imperio-extra-light-navy/30 backdrop-blur-sm rounded-full px-4 py-1 inline-flex items-center gap-1 border border-white/30 shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] animate-[shimmer_2s_infinite] pointer-events-none"></div>
            <ShieldCheck size={14} className="text-imperio-navy" />
            <span className="text-xs text-imperio-navy font-medium">Dados protegidos</span>
            
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
          
          {/* Badge de IA Assistente */}
          <div className="mx-auto mt-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-4 py-1 inline-flex items-center gap-1 border border-white/30 shadow-md">
            <Sparkles size={14} className="text-purple-600" />
            <span className="text-xs text-imperio-navy font-medium">Assistido por IA</span>
          </div>
        </div>
        
        {/* Resumo do carrinho - com efeito de vidro */}
        <div className="md:hidden bg-gradient-to-r from-imperio-navy/5 to-imperio-light-navy/10 backdrop-blur-md rounded-2xl p-5 mb-8 shadow-lg border border-white/40 relative overflow-hidden">
          {/* Efeito de brilho */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] animate-[shimmer_3s_infinite] pointer-events-none"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-imperio-navy to-imperio-light-navy rounded-full p-3 shadow-md">
                <ShoppingCart size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-imperio-navy/70">Seu carrinho</p>
                <p className="font-bold text-imperio-navy text-lg">{items.length} {items.length === 1 ? 'item' : 'itens'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-imperio-navy/70">Total</p>
              <p className="text-imperio-navy font-bold text-lg">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>
          
          {/* Indicador de progresso do checkout */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex justify-between text-xs text-imperio-navy/60">
              <span>Progresso</span>
              <span>2/4 etapas</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-imperio-navy to-imperio-light-navy rounded-full"></div>
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
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center">
                  <ChevronLeft size={18} className="mr-2" />
                  <span>Voltar ao Carrinho</span>
                </span>
              </Link>
            </Button>
            
            <Button 
              type="submit"
              className="bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy hover:brightness-110 text-white sm:order-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0 -translate-x-full animate-shimmer"></span>
              <span className="relative z-10 flex items-center">
                <span>Continuar</span>
                <ChevronRight size={18} className="ml-2" />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
