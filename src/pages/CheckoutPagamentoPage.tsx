
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { useToast } from '@/hooks/use-toast';
import { useCheckoutSubmit } from '@/hooks/useCheckoutSubmit';

// Componentes importados
import { PaymentSummary } from '@/components/checkout/payment/PaymentSummary';
import { PixKeyDisplay } from '@/components/checkout/payment/PixKeyDisplay';
import { PaymentInstructions } from '@/components/checkout/payment/PaymentInstructions';
import { PaymentProofUploader } from '@/components/checkout/payment/PaymentProofUploader';
import { PaymentWarning } from '@/components/checkout/payment/PaymentWarning';
import { PaymentNavigation } from '@/components/checkout/payment/PaymentNavigation';
import { OrderCompletedDialog } from '@/components/checkout/payment/OrderCompletedDialog';

export const CheckoutPagamentoPage: React.FC = () => {
  const { 
    customerData, 
    paymentProofFile, 
    setPaymentProofFile, 
    setCheckoutStep,
    resetCustomerData
  } = useCheckout();
  
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    handleCompleteOrder,
    loading,
    completedOrder,
    setCompletedOrder
  } = useCheckoutSubmit();
  
  // Check if user came from previous steps
  useEffect(() => {
    if (!customerData.name || !customerData.email || items.length === 0) {
      navigate('/checkout/resumo');
    }
  }, [customerData, items, navigate]);
  
  const handleCloseCompletedDialog = () => {
    clearCart();
    resetCustomerData();
    setCheckoutStep(1);
    navigate('/');
  };
  
  return (
    <Layout>
      <div className="section-container py-8">
        <div className="mb-6">
          <CheckoutSteps currentStep={4} />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-semibold text-imperio-navy mb-6">Pagamento via PIX</h1>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-lg shadow-elevation p-6 mb-6">
            <PaymentSummary total={total} />
            <PixKeyDisplay />
            
            <div className="space-y-5">
              <PaymentInstructions total={total} />
              <PaymentProofUploader 
                paymentProofFile={paymentProofFile}
                setPaymentProofFile={setPaymentProofFile}
              />
            </div>
          </div>
          
          <PaymentNavigation 
            onSubmit={handleCompleteOrder}
            isSubmitDisabled={!paymentProofFile}
            loading={loading}
          />
          
          <PaymentWarning />
        </div>
      </div>
      
      <OrderCompletedDialog 
        open={completedOrder} 
        onOpenChange={() => {}}
        onClose={handleCloseCompletedDialog}
      />
    </Layout>
  );
};
