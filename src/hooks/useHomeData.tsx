
import { useBrands } from './useBrands';
import { useProducts } from './useProducts';
import { useCategories } from './useCategories';
import { useFaq } from './useFaq';
import { useHero } from './useHero';

export const useHomeData = () => {
  const brands = useBrands();
  const { featuredProducts, flashSaleItems } = useProducts();
  const { categories, serviceCards } = useCategories();
  const faqItems = useFaq();
  const heroSlides = useHero();

  return {
    brands,
    featuredProducts,
    flashSaleItems,
    heroSlides,
    categories,
    serviceCards,
    faqItems
  };
};
