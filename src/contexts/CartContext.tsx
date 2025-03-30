import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { calculateShipping, mapStoreMethodToApiMethod } from '@/services/shippingService';

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
};

export type CouponType = 'percentage' | 'fixed' | 'shipping';

export type Coupon = {
  code: string;
  type: CouponType;
  value: number;
  minValue?: number;
  expiresAt?: Date;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  couponCode: string | null;
  discount: number;
  discountType: CouponType | null;
  setCouponCode: (code: string | null) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shippingMethod: string | null;
  shippingCost: number;
  shipping: number;
  setShipping: (cost: number) => void;
  setShippingMethod: (method: string | null) => void;
  hasInsurance: boolean;
  setHasInsurance: (hasInsurance: boolean) => void;
  total: number;
  availableCoupons: Coupon[];
  validateCoupon: (code: string) => { valid: boolean; message: string };
};

// Lista de cupons disponíveis no sistema
const AVAILABLE_COUPONS: Coupon[] = [
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

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountType, setDiscountType] = useState<CouponType | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);
  const { toast } = useToast();
  
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

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += item.quantity;
        return newItems;
      } else {
        // Item doesn't exist, add it
        return [...prevItems, item];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setDiscountType(null);
    setShippingMethod(null);
    setShippingCost(0);
    setShipping(0);
    setHasInsurance(false);
    localStorage.removeItem('imperioCoupon');
  };
  
  // Verificar se um cupom é válido
  const validateCoupon = (code: string): { valid: boolean; message: string } => {
    // Verificar se o código existe
    const coupon = AVAILABLE_COUPONS.find(c => c.code === code);
    if (!coupon) {
      return { valid: false, message: 'Cupom inválido ou expirado' };
    }
    
    // Verificar valor mínimo necessário para aplicar o cupom
    if (coupon.minValue && subtotal < coupon.minValue) {
      return { 
        valid: false, 
        message: `Este cupom só é válido para compras acima de ${coupon.minValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` 
      };
    }
    
    // Verificar se o cupom ainda é válido (se tiver data de expiração)
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return { valid: false, message: 'Este cupom expirou' };
    }
    
    // Se o cupom for do tipo frete grátis, verificar se já tem um método de frete selecionado
    if (coupon.type === 'shipping' && !shippingMethod) {
      return { valid: false, message: 'Selecione um método de envio antes de aplicar este cupom' };
    }
    
    return { valid: true, message: 'Cupom válido' };
  };
  
  // Aplicar um cupom
  const applyCoupon = (code: string): boolean => {
    const validation = validateCoupon(code);
    
    if (!validation.valid) {
      toast({
        variant: 'destructive',
        title: 'Cupom inválido',
        description: validation.message,
      });
      return false;
    }
    
    const coupon = AVAILABLE_COUPONS.find(c => c.code === code);
    
    if (coupon) {
      setCouponCode(code);
      setDiscountType(coupon.type);
      
      let successMessage = '';
      
      if (coupon.type === 'percentage') {
        successMessage = `Desconto de ${coupon.value}% aplicado com sucesso!`;
      } else if (coupon.type === 'fixed') {
        successMessage = `Desconto de ${coupon.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} aplicado com sucesso!`;
      } else if (coupon.type === 'shipping') {
        successMessage = 'Cupom de frete grátis aplicado com sucesso!';
      }
      
      toast({
        title: 'Cupom aplicado',
        description: successMessage,
      });
      
      return true;
    }
    
    return false;
  };
  
  // Remover um cupom aplicado
  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountType(null);
    
    toast({
      title: 'Cupom removido',
      description: 'O cupom de desconto foi removido do seu pedido.',
    });
  };
  
  // Calculate derived values
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calcular o desconto com base no tipo de cupom aplicado
  const calculateDiscount = (): number => {
    if (!couponCode) return 0;
    
    const coupon = AVAILABLE_COUPONS.find(c => c.code === couponCode);
    if (!coupon) return 0;
    
    if (coupon.type === 'percentage') {
      return subtotal * (coupon.value / 100);
    } else if (coupon.type === 'fixed') {
      return Math.min(subtotal, coupon.value); // Não aplicar desconto maior que o subtotal
    } else if (coupon.type === 'shipping' && shippingMethod) {
      return Math.min(shipping, coupon.value); // Aplicar desconto no frete, limitado ao valor do frete
    }
    
    return 0;
  };
  
  const discount = calculateDiscount();
  
  const calculateTotal = (): number => {
    let total = subtotal - discount;
    
    // Se o cupom for de frete grátis, não adicionar o valor do frete
    if (discountType === 'shipping') {
      total += Math.max(0, shipping - discount);
    } else {
      total += shipping;
    }
    
    if (hasInsurance) {
      total += total * 0.2; // Add 20% for insurance
    }
    
    return total;
  };
  
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

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        subtotal,
        couponCode,
        discount,
        discountType,
        setCouponCode,
        applyCoupon,
        removeCoupon,
        shippingMethod,
        shippingCost,
        shipping,
        setShipping,
        setShippingMethod,
        hasInsurance,
        setHasInsurance,
        total: calculateTotal(),
        availableCoupons: AVAILABLE_COUPONS,
        validateCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
