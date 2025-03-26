
import { useBrands } from './useBrands';
import { useProducts } from './useProducts';
import { useCategories } from './useCategories';
import { useFaq } from './useFaq';
import { useHero } from './useHero';
import { useProductStore } from './useProductStore';
import { useEffect, useState } from 'react';
import { Category } from '@/types/category';

/**
 * Hook que agrega todos os dados necessários para a página inicial
 * Centraliza a lógica de carregamento de dados de várias fontes
 */
export const useHomeData = () => {
  // Carregamento de dados de vários hooks
  const { featuredProducts, flashSaleItems } = useProducts();
  const { categories: defaultCategories, serviceCards } = useCategories();
  const { categories: adminCategories } = useProductStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const faqItems = useFaq();
  const { heroData, heroSlides } = useHero();
  const brands = useBrands();

  // Tenta usar categorias do painel admin, se disponíveis
  useEffect(() => {
    console.log("useHomeData effect running with:", {
      adminCategoriesLength: adminCategories?.length || 0,
      defaultCategoriesLength: defaultCategories?.length || 0
    });
    
    // Garantir que temos categorias para exibir (primeiro as do admin, depois as padrão)
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
        active: cat.status === 'active' // Garantimos que apenas categorias ativas são mostradas
      }));
      console.log("Setting mapped admin categories:", mappedCategories);
      setCategories(mappedCategories);
    } else if (defaultCategories && defaultCategories.length > 0) {
      // Fallback para as categorias padrão
      console.log("Using default categories:", defaultCategories);
      
      // Garantir que todas as categorias padrão tenham a flag 'active' definida
      const validDefaultCategories = defaultCategories.map(cat => ({
        ...cat,
        active: cat.active !== undefined ? cat.active : true
      }));
      
      setCategories(validDefaultCategories);
    } else {
      // Fallback final se nenhuma categoria estiver disponível
      console.log("No categories available, using empty array");
      setCategories([]);
    }
  }, [adminCategories, defaultCategories]);

  // Dados de configuração da página inicial
  const homeConfig = {
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
  };

  return {
    brands,
    featuredProducts,
    flashSaleItems,
    heroSlides,
    categories,
    serviceCards,
    faqItems,
    homeData: homeConfig
  };
};
