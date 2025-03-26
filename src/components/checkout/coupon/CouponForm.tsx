
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { AppliedCoupon } from './AppliedCoupon';
import { CouponInput } from './CouponInput';
import { CouponValidationMessage } from './CouponValidationMessage';
import { PromotionalInfo } from './PromotionalInfo';

interface CouponFormProps {
  simpleVersion?: boolean;
}

export const CouponForm: React.FC<CouponFormProps> = ({ simpleVersion = false }) => {
  const { 
    couponCode, 
    discount, 
    discountType,
    applyCoupon, 
    removeCoupon,
    validateCoupon
  } = useCart();
  
  const [inputCoupon, setInputCoupon] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();
  
  const handleApplyCoupon = () => {
    if (inputCoupon.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Por favor, insira um código de cupom válido.',
      });
      return;
    }
    
    setIsApplying(true);
    
    // Validar cupom antes de aplicar
    const { valid, message } = validateCoupon(inputCoupon);
    setValidationMessage(message);
    setIsValid(valid);
    setShowValidationMessage(true);
    
    // Simulando um tempo de processamento para feedback visual
    setTimeout(() => {
      if (valid) {
        applyCoupon(inputCoupon);
        setInputCoupon('');
      }
      setIsApplying(false);
      
      // Esconder a mensagem de validação após alguns segundos
      setTimeout(() => {
        setShowValidationMessage(false);
      }, 5000);
    }, 600);
  };
  
  if (simpleVersion) {
    // Versão simplificada para uso em páginas de checkout
    return (
      <div className="mb-4">
        {couponCode ? (
          <AppliedCoupon 
            couponCode={couponCode}
            discountType={discountType}
            discount={discount}
            removeCoupon={removeCoupon}
            simpleVersion={true}
          />
        ) : (
          <CouponInput
            inputCoupon={inputCoupon}
            setInputCoupon={setInputCoupon}
            handleApplyCoupon={handleApplyCoupon}
            isApplying={isApplying}
            simpleVersion={true}
          />
        )}
        
        {showValidationMessage && (
          <div className="mt-2">
            <CouponValidationMessage
              showValidationMessage={showValidationMessage}
              isValid={isValid}
              validationMessage={validationMessage}
            />
          </div>
        )}
      </div>
    );
  }
  
  // Versão completa para o carrinho
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Cupom de desconto</h3>
      
      {couponCode ? (
        <AppliedCoupon 
          couponCode={couponCode}
          discountType={discountType}
          discount={discount}
          removeCoupon={removeCoupon}
        />
      ) : (
        <>
          <CouponInput
            inputCoupon={inputCoupon}
            setInputCoupon={setInputCoupon}
            handleApplyCoupon={handleApplyCoupon}
            isApplying={isApplying}
          />
          
          {showValidationMessage && (
            <CouponValidationMessage
              showValidationMessage={showValidationMessage}
              isValid={isValid}
              validationMessage={validationMessage}
            />
          )}
          
          <PromotionalInfo />
        </>
      )}
    </div>
  );
};
