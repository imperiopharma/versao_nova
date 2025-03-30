
import React, { createContext, useContext } from 'react';
import { useCartState } from '@/hooks/cart/useCartState';
import { useCartOperations } from '@/hooks/cart/useCartOperations';
import { useCartCalculations } from '@/hooks/cart/useCartCalculations';
import { useCouponManager } from '@/hooks/cart/useCouponManager';
import { CartContextType } from '@/types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Gerenciamento do estado do carrinho
  const {
    items,
    setItems,
    couponCode,
    setCouponCode,
    discountType,
    setDiscountType,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    shipping,
    setShipping,
    hasInsurance,
    setHasInsurance
  } = useCartState();
  
  // Operações do carrinho (adicionar, remover, etc)
  const { addItem, updateQuantity, removeItem, clearCart: clearCartItems } = useCartOperations({ 
    items, 
    setItems 
  });
  
  // Cálculos do carrinho (subtotal, total, etc)
  const { itemCount, subtotal, discount, total } = useCartCalculations({
    items,
    couponCode,
    discountType,
    shipping,
    hasInsurance
  });
  
  // Gerenciamento de cupons
  const { validateCoupon, applyCoupon, removeCoupon, availableCoupons } = useCouponManager({
    subtotal,
    shippingMethod,
    setCouponCode,
    setDiscountType
  });
  
  // Método para limpar o carrinho
  const clearCart = () => {
    clearCartItems(
      setCouponCode,
      setDiscountType,
      setShippingMethod,
      setShippingCost,
      setShipping,
      setHasInsurance
    );
  };

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
        total,
        availableCoupons,
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

// Re-exportar types para facilitar importação
export type { CartItem, Coupon, CouponType } from '@/types/cart';
