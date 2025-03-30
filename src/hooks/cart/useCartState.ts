
import { useState, useEffect } from 'react';
import { CartItem, Coupon, CouponType } from '@/types/cart';
import { calculateShipping, mapStoreMethodToApiMethod } from '@/services/shippingService';

// Lista de cupons disponíveis no sistema
export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'DESCONTO10',
    type: 'percentage',
    value: 10,
    minValue: 0
  },
  {
    code: 'DESCONTO20',
    type: 'percentage',
    value: 20,
    minValue: 200
  },
  {
    code: 'FRETEGRATIS',
    type: 'shipping',
    value: 100,
    minValue: 300
  },
  {
    code: 'WELCOME',
    type: 'fixed',
    value: 30,
    minValue: 150
  },
  {
    code: 'IMPERIO50',
    type: 'fixed',
    value: 50,
    minValue: 500
  }
];

export function useCartState() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountType, setDiscountType] = useState<CouponType | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('imperioCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    
    // Carregar cupom aplicado se existir
    const savedCoupon = localStorage.getItem('imperioCoupon');
    if (savedCoupon) {
      try {
        const { code, type } = JSON.parse(savedCoupon);
        setCouponCode(code);
        setDiscountType(type);
      } catch (error) {
        console.error('Failed to parse coupon from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('imperioCart', JSON.stringify(items));
  }, [items]);
  
  // Salvar cupom aplicado no localStorage
  useEffect(() => {
    if (couponCode && discountType) {
      localStorage.setItem('imperioCoupon', JSON.stringify({ code: couponCode, type: discountType }));
    } else {
      localStorage.removeItem('imperioCoupon');
    }
  }, [couponCode, discountType]);

  // Atualizar custo de frete quando o método de frete muda
  useEffect(() => {
    if (!shippingMethod) {
      setShippingCost(0);
      setShipping(0);
      return;
    }
    
    // Obter o estado do cliente
    const state = localStorage.getItem('shipmentState') || 'SP';
    
    // Converter o método da loja para o formato da API
    const apiMethod = mapStoreMethodToApiMethod(shippingMethod);
    
    if (apiMethod) {
      // Calcular o frete usando o serviço de frete
      const cost = calculateShipping(apiMethod, state);
      
      if (cost !== null) {
        setShippingCost(cost);
        setShipping(cost);
      } else {
        setShippingCost(0);
        setShipping(0);
      }
    } else {
      setShippingCost(0);
      setShipping(0);
    }
  }, [shippingMethod]);
  
  return {
    items,
    setItems,
    couponCode,
    setCouponCode,
    discountType,
    setDiscountType,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    setShippingCost,
    shipping,
    setShipping,
    hasInsurance,
    setHasInsurance
  };
}
