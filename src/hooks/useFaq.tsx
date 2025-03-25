
import { useState } from 'react';
import { FaqItem } from '@/types/faq';
import { mockFaqItems } from '@/data/mock/faq';

export const useFaq = () => {
  const [faqItems] = useState<FaqItem[]>(mockFaqItems);

  return faqItems;
};
