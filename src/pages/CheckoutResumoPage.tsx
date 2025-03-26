
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { ShippingAddressCard } from '../components/checkout/ShippingAddressCard';
import { ShippingMethodCard } from '../components/checkout/ShippingMethodCard';
import { OrderItemsCard } from '../components/checkout/OrderItemsCard';
import { InsuranceOptionCard } from '../components/checkout/InsuranceOptionCard';
import { CheckoutNavigation } from '../components/checkout/CheckoutNavigation';
import { CouponForm } from '../components/checkout/CouponForm';

export const CheckoutResumoPage: React.FC = () => {
  const { 
    customerData, 
    setCheckoutStep 
  } = useCheckout();
  
  const { 
    items, 
    subtotal, 
    discount, 
    discountType,
    couponCode,
    shippingMethod, 
    shippingCost, 
    total,
    hasInsurance,
    setHasInsurance 
  } = useCart();
  
  const navigate = useNavigate();
  
  // Rolar para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  // Check if user came from previous step
  useEffect(() => {
    if (!customerData.name || !customerData.email || !shippingMethod) {
      navigate('/checkout/dados');
    }
  }, [customerData, navigate, shippingMethod]);
  
  const handleContinue = () => {
    setCheckoutStep(4);
    navigate('/checkout/pagamento');
  };
  
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mb-8">
          <CheckoutSteps currentStep={3} />
        </div>
        
        <h1 className="text-3xl font-semibold text-imperio-navy mb-8 text-center">Resumo do Pedido</h1>
        
        <div className="max-w-3xl mx-auto">
          {/* Endereço de Entrega */}
          <ShippingAddressCard customerData={customerData} />
          
          {/* Método de Envio */}
          <ShippingMethodCard 
            shippingMethod={shippingMethod} 
            shippingCost={shippingCost} 
          />
          
          {/* Opção de Cupom */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-imperio-navy border-b pb-3">Cupom de Desconto</h2>
            <CouponForm simpleVersion={true} />
          </div>
          
          {/* Itens do Pedido */}
          <OrderItemsCard 
            items={items}
            subtotal={subtotal}
            discount={discount}
            discountType={discountType}
            couponCode={couponCode}
            shippingCost={shippingCost}
            hasInsurance={hasInsurance}
            total={total}
          />
          
          {/* Opção de Seguro */}
          <InsuranceOptionCard 
            hasInsurance={hasInsurance}
            setHasInsurance={setHasInsurance}
          />
          
          {/* Navegação do Checkout */}
          <CheckoutNavigation 
            onContinue={handleContinue}
            backLink="/checkout/dados"
            backText="Editar Dados"
            continueText="Ir para Pagamento"
          />
        </div>
      </div>
    </Layout>
  );
};
