
import { useState } from 'react';
import { HeroSlide } from '@/types/hero';
import { mockHeroSlides } from '@/data/mock/hero';

export const useHero = () => {
  const [heroSlides] = useState<HeroSlide[]>(mockHeroSlides);

  return heroSlides;
};
