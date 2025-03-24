
import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
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
  setCouponCode: (code: string | null) => void;
  shippingMethod: string | null;
  shippingCost: number;
  setShippingMethod: (method: string | null) => void;
  hasInsurance: boolean;
  setHasInsurance: (hasInsurance: boolean) => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
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
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('imperioCart', JSON.stringify(items));
  }, [items]);

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
    setShippingMethod(null);
    setShippingCost(0);
    setHasInsurance(false);
  };
  
  // Calculate derived values
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const discount = couponCode === 'DESCONTO10' ? subtotal * 0.1 : 0;
  
  const calculateTotal = (): number => {
    let total = subtotal - discount + shippingCost;
    if (hasInsurance) {
      total += total * 0.2; // Add 20% for insurance
    }
    return total;
  };
  
  // Update shipping cost when shipping method changes
  useEffect(() => {
    if (!shippingMethod) {
      setShippingCost(0);
      return;
    }
    
    // Simple shipping cost calculation (would be replaced with a proper API call)
    const state = localStorage.getItem('shipmentState') || 'SP';
    
    if (state === 'SP' || state === 'RJ') {
      if (shippingMethod === 'sedex') setShippingCost(20);
      else if (shippingMethod === 'pac') setShippingCost(15);
      else if (shippingMethod === 'transportadora') setShippingCost(40);
    } else {
      if (shippingMethod === 'sedex') setShippingCost(30);
      else if (shippingMethod === 'pac') setShippingCost(20);
      else if (shippingMethod === 'transportadora') setShippingCost(40);
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
        setCouponCode,
        shippingMethod,
        shippingCost,
        setShippingMethod,
        hasInsurance,
        setHasInsurance,
        total: calculateTotal(),
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
