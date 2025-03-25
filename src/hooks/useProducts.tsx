
import { useState } from 'react';
import { Product, FlashSaleItem } from '@/types/product';
import { mockFeaturedProducts, mockFlashSaleItems } from '@/data/mock/products';

export const useProducts = () => {
  const [featuredProducts] = useState<Product[]>(mockFeaturedProducts);
  const [flashSaleItems] = useState<FlashSaleItem[]>(mockFlashSaleItems);

  return {
    featuredProducts,
    flashSaleItems
  };
};
