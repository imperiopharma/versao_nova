
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerInfoForm } from '@/components/checkout/CustomerInfoForm';
import { AddressForm } from '@/components/checkout/AddressForm';
import { ShippingMethodForm } from '@/components/checkout/ShippingMethodForm';
import { useCheckoutForm } from '@/hooks/useCheckoutForm';

export const CheckoutDadosPage: React.FC = () => {
  const { customerData } = useCheckout();
  const { setShippingMethod } = useCart();
  const { formErrors, handleChangeInput, handleSubmit } = useCheckoutForm();
  
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mb-8">
          <CheckoutSteps currentStep={2} />
        </div>
        
        <h1 className="text-3xl font-semibold text-imperio-navy mb-8">Dados do Cliente e Envio</h1>
        
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
          
          {/* Formulário de Método de Envio */}
          <ShippingMethodForm 
            setShippingMethod={setShippingMethod}
            formErrors={formErrors}
          />
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
              variant="outline"
              asChild
              className="sm:order-1"
            >
              <Link to="/carrinho">
                <ChevronLeft size={18} className="mr-2" />
                Voltar ao Carrinho
              </Link>
            </Button>
            
            <Button 
              type="submit"
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:order-2"
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
