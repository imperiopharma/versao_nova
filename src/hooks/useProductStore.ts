
import { useEffect } from 'react';
import { useProductCommon } from './useProductCommon';
import { useProductsData } from './useProductsData';
import { useBrandsData } from './useBrandsData';
import { useCategoriesData } from './useCategoriesData';

export function useProductStore() {
  const { loading, setLoading } = useProductCommon();
  
  const { 
    products,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProductsData();
  
  const {
    brands,
    fetchBrands,
    addBrand,
    updateBrand,
    deleteBrand
  } = useBrandsData();
  
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory
  } = useCategoriesData();

  // Buscar todos os dados no carregamento inicial
  useEffect(() => {
    fetchData();
  }, []);

  // Função para buscar todos os dados
  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchProducts(),
        fetchBrands(),
        fetchCategories()
      ]);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Retornar a mesma API para manter compatibilidade
  return {
    products,
    brands,
    categories,
    loading,
    fetchData,
    addProduct,
    updateProduct,
    deleteProduct,
    addBrand,
    updateBrand,
    deleteBrand,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
