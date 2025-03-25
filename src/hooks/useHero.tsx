
import { useState } from 'react';
import { HeroSlide } from '@/types/hero';
import { mockHeroSlides } from '@/data/mock/hero';

export const useHero = () => {
  const [heroSlides] = useState<HeroSlide[]>(mockHeroSlides);

  // Retornando no formato que a HomePage espera
  return {
    heroData: {
      title: "Qualidade e Confiança para sua Saúde",
      subtitle: "Produtos farmacêuticos e suplementos de alta qualidade",
      ctaText: "Comprar Agora",
      ctaLink: "/marcas",
      backgroundImage: heroSlides[0]?.image || "/background.jpg"
    },
    heroSlides
  };
};
