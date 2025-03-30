
import { useBrands } from './useBrands';
import { useProducts } from './useProducts';
import { useCategories } from './useCategories';
import { useHero } from './useHero';
import { useProductStore } from './useProductStore';
import { useEffect, useState } from 'react';
import { Category } from '@/types/category';
import { Pill, ShoppingBag, Heart, Star, Package, Tag, Sparkles } from 'lucide-react';

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
  const { heroSlides } = useHero();
  const { brands } = useBrands();

  // Função para renderizar o ícone baseado no nome
  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case 'pill': return () => <Pill className="h-6 w-6" />;
      case 'shopping-bag': return () => <ShoppingBag className="h-6 w-6" />;
      case 'heart': return () => <Heart className="h-6 w-6" />;
      case 'star': return () => <Star className="h-6 w-6" />;
      case 'package': return () => <Package className="h-6 w-6" />;
      case 'tag': return () => <Tag className="h-6 w-6" />;
      case 'sparkles': return () => <Sparkles className="h-6 w-6" />;
      default: return () => <Pill className="h-6 w-6" />;
    }
  };

  // Sempre usar as categorias mockadas (defaultCategories) para a página inicial
  useEffect(() => {
    console.log('Default categories:', defaultCategories);
    console.log('Admin categories:', adminCategories);
    
    // Sempre usar as categorias mockadas para garantir que "PRODUTOS EMAGRECEDORES" e "MEDICAMENTOS DE FARMÁCIA" apareçam
    if (defaultCategories && defaultCategories.length > 0) {
      // Garantir que todas as categorias padrão tenham a flag 'active' definida
      const validDefaultCategories = defaultCategories.map(cat => ({
        ...cat,
        active: cat.active !== undefined ? cat.active : true
      }));
      
      setCategories(validDefaultCategories);
    } else {
      // Fallback para as categorias do admin apenas se não houver categorias mockadas
      if (adminCategories && adminCategories.length > 0) {
        // Mapeia as categorias do admin para o formato esperado pelo componente
        const mappedCategories = adminCategories.map(cat => ({
          id: cat.id,
          name: cat.name,
          title: cat.name.toUpperCase(),
          description: cat.description || '',
          slug: cat.slug || cat.id,
          icon: cat.iconName ? getIconByName(cat.iconName) : null, // Usar o ícone selecionado no admin
          link: `/categoria/${cat.slug || cat.id}`,
          color: 'bg-imperio-navy',
          active: cat.status === 'active' // Garantimos que apenas categorias ativas são mostradas
        }));
        setCategories(mappedCategories);
      } else {
        // Fallback final se nenhuma categoria estiver disponível
        setCategories([]);
      }
    }
  }, [adminCategories, defaultCategories]);

  return {
    brands,
    featuredProducts,
    flashSaleItems,
    heroSlides,
    categories,
    serviceCards
  };
};
