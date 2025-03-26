
import { useBrands } from './useBrands';
import { useProducts } from './useProducts';
import { useCategories } from './useCategories';
import { useFaq } from './useFaq';
import { useHero } from './useHero';
import { useProductStore } from './useProductStore';
import { useEffect, useState } from 'react';
import { Category } from '@/types/category';

export const useHomeData = () => {
  const { featuredProducts, flashSaleItems } = useProducts();
  const { categories: defaultCategories, serviceCards } = useCategories();
  const { categories: adminCategories } = useProductStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const faqItems = useFaq();
  const { heroData, heroSlides } = useHero();
  const brands = useBrands();

  // Tenta usar categorias do painel admin, se disponíveis
  useEffect(() => {
    if (adminCategories && adminCategories.length > 0) {
      // Mapeia as categorias do admin para o formato esperado pelo componente
      const mappedCategories = adminCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        title: cat.name,
        description: cat.description || '',
        slug: cat.slug || cat.id,
        icon: null, // Será tratado pelo renderIcon com fallback
        link: `/categoria/${cat.slug || cat.id}`,
        color: 'bg-imperio-navy',
        active: cat.status === 'active'
      }));
      setCategories(mappedCategories);
    } else {
      // Fallback para as categorias padrão
      setCategories(defaultCategories);
    }
  }, [adminCategories, defaultCategories]);

  return {
    brands,
    featuredProducts,
    flashSaleItems,
    heroSlides,
    categories,
    serviceCards,
    faqItems,
    homeData: {
      showPromoHeader: false,
      promoHeaderText: "Frete grátis em compras acima de R$ 200,00",
      showVipSection: true,
      showAppBanner: false,
      // Controle de seções
      showSections: {
        categories: true,
        featuredProducts: true,
        flashSale: true,
        brands: true,
        guarantees: true,
        promoCards: true,
        about: true,
        location: true,
        faq: true,
        newsletter: true,
        coupons: false
      },
      // Ordem das seções na página
      sectionsOrder: [
        "categories",
        "featuredProducts", 
        "flashSale",
        "brands",
        "guarantees",
        "promoCards",
        "vip",
        "about",
        "location",
        "faq",
        "newsletter"
      ]
    }
  };
};
