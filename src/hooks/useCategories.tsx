
import { useState } from 'react';
import { Category, ServiceCard } from '@/types/category';
import { mockCategories, mockServiceCards } from '@/data/mock/categories';

export const useCategories = () => {
  const [categories] = useState<Category[]>(mockCategories);
  const [serviceCards] = useState<ServiceCard[]>(mockServiceCards);

  return {
    categories,
    serviceCards
  };
};
