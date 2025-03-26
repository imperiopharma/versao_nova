
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, X, AlertCircle, Check, Info } from 'lucide-react';
import { useCart, CouponType } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CouponFormProps {
  simpleVersion?: boolean;
}

export const CouponForm: React.FC<CouponFormProps> = ({ simpleVersion = false }) => {
  const { 
    couponCode, 
    discount, 
    discountType,
    subtotal,
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
  
  // Formatar o tipo de desconto para exibição
  const formatDiscountType = (type: CouponType | null, value: number): string => {
    if (!type) return '';
    
    switch (type) {
      case 'percentage':
        return `${value}% de desconto`;
      case 'fixed':
        return `${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} de desconto`;
      case 'shipping':
        return 'Frete grátis';
      default:
        return '';
    }
  };
  
  if (simpleVersion) {
    // Versão simplificada para uso em páginas de checkout
    return (
      <div className="mb-4">
        {couponCode ? (
          <div className="flex items-center justify-between p-3 bg-imperio-extra-light-navy rounded-lg">
            <div className="flex items-center">
              <Tag size={16} className="text-imperio-navy mr-2" />
              <div>
                <p className="text-sm font-medium">{couponCode}</p>
                <p className="text-xs text-imperio-navy/70">
                  {formatDiscountType(discountType, discount)}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={removeCoupon}
            >
              <X size={16} className="text-imperio-navy" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-imperio-navy/60" />
              <Input
                placeholder="Adicionar cupom"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                className="pl-10 border-imperio-navy/20 bg-white"
              />
            </div>
            <Button 
              onClick={handleApplyCoupon}
              disabled={isApplying || !inputCoupon}
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white"
              size="sm"
            >
              {isApplying ? 'Aplicando...' : 'Aplicar'}
            </Button>
          </div>
        )}
        
        {showValidationMessage && (
          <div className="mt-2">
            <Alert variant={isValid ? "default" : "destructive"} className="py-2">
              <AlertDescription className="text-xs flex items-center">
                {isValid ? (
                  <Check size={14} className="mr-1" />
                ) : (
                  <AlertCircle size={14} className="mr-1" />
                )}
                {validationMessage}
              </AlertDescription>
            </Alert>
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
        <div className="p-4 bg-imperio-extra-light-navy rounded-lg border border-imperio-navy/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-imperio-navy/10 p-2 rounded-full mr-3">
                <Tag size={18} className="text-imperio-navy" />
              </div>
              <div>
                <p className="font-medium text-imperio-navy">{couponCode}</p>
                <p className="text-sm text-imperio-navy/70">
                  {formatDiscountType(discountType, discount)}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-imperio-red border-imperio-red/20 hover:bg-imperio-red/10" 
              onClick={removeCoupon}
            >
              <X size={16} className="mr-1" />
              Remover
            </Button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-imperio-navy/10 flex justify-between text-sm">
            <span>Desconto aplicado:</span>
            <span className="font-medium text-green-600">
              -{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-imperio-navy/60" />
              <Input
                placeholder="Digite o código do cupom"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                className="pl-10 border-imperio-navy/20 bg-white shadow-sm"
              />
            </div>
            <Button 
              onClick={handleApplyCoupon}
              disabled={isApplying || !inputCoupon}
              className="whitespace-nowrap bg-imperio-navy hover:bg-imperio-light-navy text-white"
            >
              {isApplying ? (
                <>
                  <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Aplicando...
                </>
              ) : 'Aplicar Cupom'}
            </Button>
          </div>
          
          {showValidationMessage && (
            <Alert variant={isValid ? "default" : "destructive"}>
              <AlertDescription className="text-sm flex items-center">
                {isValid ? (
                  <Check size={16} className="mr-2" />
                ) : (
                  <AlertCircle size={16} className="mr-2" />
                )}
                {validationMessage}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-100">
            <Info size={18} className="flex-shrink-0 mt-0.5" />
            <p>
              Experimente alguns cupons como <span className="font-mono bg-white px-1 py-0.5 rounded">DESCONTO10</span> para 10% de desconto 
              ou <span className="font-mono bg-white px-1 py-0.5 rounded">FRETEGRATIS</span> para compras acima de R$ 300.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
