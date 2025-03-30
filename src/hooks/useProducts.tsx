
import { useState } from 'react';
import { Product, FlashSaleItem } from '@/types/product';
import { mockFeaturedProducts, mockFlashSaleItems } from '@/data/mock/products';

export const useProducts = () => {
  const [featuredProducts] = useState<Product[]>(mockFeaturedProducts);
  const [flashSaleItems] = useState<FlashSaleItem[]>(mockFlashSaleItems);
  const [loading] = useState<boolean>(false); // Adicionando loading state

  return {
    featuredProducts,
    flashSaleItems,
    loading
  };
};
