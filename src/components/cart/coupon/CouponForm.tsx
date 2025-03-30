
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { X, Loader2, Tag } from 'lucide-react';
import { AVAILABLE_COUPONS } from '@/hooks/cart/useCartState';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/formatters';

interface CouponFormProps {
  onCancel?: () => void;
  simpleVersion?: boolean;
}

export const CouponForm: React.FC<CouponFormProps> = ({ 
  onCancel,
  simpleVersion = false
}) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  
  const { 
    couponCode, 
    applyCoupon, 
    removeCoupon, 
    subtotal, 
    discountType 
  } = useCart();
  
  const { toast } = useToast();
  
  const handleApplyCoupon = () => {
    if (!code.trim()) {
      toast({
        title: "Erro ao aplicar cupom",
        description: "Por favor, digite um código de cupom válido.",
        variant: "destructive"
      });
      return;
    }
    
    setIsValidating(true);
    
    // Simular validação no servidor
    setTimeout(() => {
      const uppercaseCode = code.toUpperCase();
      const coupon = AVAILABLE_COUPONS.find(c => c.code === uppercaseCode);
      
      if (!coupon) {
        toast({
          title: "Cupom inválido",
          description: "O código de cupom informado não existe ou expirou.",
          variant: "destructive"
        });
        setIsValidating(false);
        return;
      }
      
      if (subtotal < coupon.minValue) {
        toast({
          title: "Valor mínimo não atingido",
          description: `Este cupom só é válido para compras acima de ${formatCurrency(coupon.minValue)}.`,
          variant: "destructive"
        });
        setIsValidating(false);
        return;
      }
      
      // Modificado para passar apenas o código, conforme a interface CartContextType
      applyCoupon(coupon.code);
      
      toast({
        title: "Cupom aplicado com sucesso!",
        description: getCouponDescription(coupon),
      });
      
      setIsValidating(false);
      setCode('');
      
      if (onCancel) {
        onCancel();
      }
    }, 800);
  };
  
  const getCouponDescription = (coupon: any) => {
    if (coupon.type === 'percentage') {
      return `Desconto de ${coupon.value}% aplicado.`;
    } else if (coupon.type === 'fixed') {
      return `Desconto de ${formatCurrency(coupon.value)} aplicado.`;
    } else if (coupon.type === 'shipping') {
      return `Frete grátis aplicado para compras acima de ${formatCurrency(coupon.minValue)}.`;
    }
    return 'Cupom aplicado com sucesso!';
  };
  
  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Cupom removido",
      description: "O cupom foi removido da sua compra.",
    });
  };
  
  // Se já houver um cupom aplicado
  if (couponCode) {
    return (
      <div className="bg-imperio-extra-light-navy rounded-md p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Tag size={18} className="text-imperio-navy mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-imperio-navy">{couponCode}</p>
              <p className="text-sm text-gray-600">
                {discountType === 'percentage' && 'Desconto percentual aplicado'}
                {discountType === 'fixed' && 'Desconto fixo aplicado'}
                {discountType === 'shipping' && 'Frete grátis aplicado'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleRemoveCoupon}
            className="text-gray-500 hover:text-imperio-red transition-colors"
            aria-label="Remover cupom"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }
  
  // Versão simplificada para a página de checkout
  if (simpleVersion) {
    return (
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Inserir código do cupom"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mr-2"
        />
        <Button 
          onClick={handleApplyCoupon}
          disabled={isValidating}
          type="button"
        >
          {isValidating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            'Aplicar'
          )}
        </Button>
      </div>
    );
  }
  
  // Versão completa para a página do carrinho
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Cupom de Desconto</h3>
        {onCancel && (
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-imperio-red transition-colors"
            aria-label="Fechar formulário de cupom"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Digite o código do cupom"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-grow"
        />
        <Button 
          onClick={handleApplyCoupon}
          disabled={isValidating}
          type="button"
        >
          {isValidating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            'Aplicar'
          )}
        </Button>
      </div>
    </div>
  );
};
