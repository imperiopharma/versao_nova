
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/types/cart';

type CartState = {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export function useCartOperations({ items, setItems }: CartState) {
  const { toast } = useToast();

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

  const clearCart = (
    setCouponCode: (code: string | null) => void,
    setDiscountType: (type: any) => void,
    setShippingMethod: (method: string | null) => void,
    setShippingCost: (cost: number) => void,
    setShipping: (shipping: number) => void,
    setHasInsurance: (value: boolean) => void
  ) => {
    setItems([]);
    setCouponCode(null);
    setDiscountType(null);
    setShippingMethod(null);
    setShippingCost(0);
    setShipping(0);
    setHasInsurance(false);
    localStorage.removeItem('imperioCoupon');
  };

  return {
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  };
}
