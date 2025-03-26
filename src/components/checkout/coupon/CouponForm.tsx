
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CouponInput } from './CouponInput';
import { AppliedCoupon } from './AppliedCoupon';
import { PromotionalInfo } from './PromotionalInfo';

interface CouponFormProps {
  simpleVersion?: boolean;
}

export const CouponForm: React.FC<CouponFormProps> = ({ simpleVersion = false }) => {
  const { couponCode, validateCoupon, applyCoupon, removeCoupon, discount, discountType } = useCart();
  const [inputCode, setInputCode] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);
  
  const handleValidateCoupon = () => {
    if (!inputCode.trim()) {
      setValidationResult({ valid: false, message: 'Digite um código de cupom' });
      return;
    }
    
    const result = validateCoupon(inputCode.trim());
    setValidationResult(result);
    
    if (result.valid) {
      applyCoupon(inputCode.trim());
      setInputCode('');
    }
  };
  
  const handleInputChange = (value: string) => {
    setInputCode(value);
    
    // Limpar a mensagem de validação quando o usuário começa a digitar
    if (validationResult) {
      setValidationResult(null);
    }
  };
  
  const handleRemoveCoupon = () => {
    removeCoupon();
    setValidationResult(null);
  };
  
  return (
    <div className="space-y-4">
      {couponCode ? (
        <AppliedCoupon 
          couponCode={couponCode}
          discountType={discountType}
          discount={discount}
          onRemove={handleRemoveCoupon}
          simpleVersion={simpleVersion}
        />
      ) : (
        <>
          <CouponInput 
            inputCode={inputCode}
            onInputChange={handleInputChange}
            onApply={handleValidateCoupon}
            validationResult={validationResult}
            simpleVersion={simpleVersion}
          />
          
          {!simpleVersion && <PromotionalInfo />}
        </>
      )}
    </div>
  );
};
