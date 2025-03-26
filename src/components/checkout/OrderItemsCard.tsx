
import React from 'react';
import { CartItem } from '@/contexts/CartContext';
import { Tag } from 'lucide-react';

interface OrderItemsCardProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountType?: string | null;
  couponCode?: string | null;
  shippingCost: number;
  hasInsurance: boolean;
  total: number;
}

export const OrderItemsCard: React.FC<OrderItemsCardProps> = ({
  items,
  subtotal,
  discount,
  discountType,
  couponCode,
  shippingCost,
  hasInsurance,
  total
}) => {
  // Calcular o total final considerando o seguro
  const finalTotal = hasInsurance ? total * 1.2 : total;
  
  // Função para formatar o texto do desconto com base no tipo
  const getDiscountText = (): string => {
    if (!couponCode) return "Desconto";
    
    if (discountType === 'percentage') {
      return `Desconto (${couponCode})`;
    } else if (discountType === 'fixed') {
      return `Desconto fixo (${couponCode})`;
    } else if (discountType === 'shipping') {
      return `Frete grátis (${couponCode})`;
    }
    
    return "Desconto";
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-imperio-navy border-b pb-3">Itens do pedido</h2>
      
      <div className="max-h-60 overflow-y-auto mb-4 pr-2">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <p className="text-sm">
                Quantidade: {item.quantity} × {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-imperio-navy">
                {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between mb-2 text-green-600">
            <span className="flex items-center">
              <Tag size={14} className="mr-1.5" />
              {getDiscountText()}
            </span>
            <span>-{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        )}
        
        <div className="flex justify-between mb-2">
          <span>Frete</span>
          <span>{shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        
        {hasInsurance && (
          <div className="flex justify-between mb-2 text-imperio-navy">
            <span>Seguro de Envio (20%)</span>
            <span>+{(total * 0.2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        )}
        
        <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="text-imperio-navy font-bold">{finalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      </div>
    </div>
  );
};
