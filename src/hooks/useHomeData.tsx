
import { useBrands } from './useBrands';
import { useProducts } from './useProducts';
import { useCategories } from './useCategories';
import { useFaq } from './useFaq';
import { useHero } from './useHero';

export const useHomeData = () => {
  const { featuredProducts, flashSaleItems } = useProducts();
  const { categories, serviceCards } = useCategories();
  const faqItems = useFaq();
  const { heroData, heroSlides } = useHero();
  const brands = useBrands();

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
        coupons: true
      },
      // Ordem das seções na página
      sectionsOrder: [
        "categories",
        "featuredProducts", 
        "coupons",
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
