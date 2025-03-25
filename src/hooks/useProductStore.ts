
import { useEffect, useState } from 'react';
import { useProductsData } from './useProductsData';
import { useBrandsData } from './useBrandsData';
import { useCategoriesData } from './useCategoriesData';
import { useProductToast } from './products/useProductToast';

export function useProductStore() {
  const { loading, setLoading } = useProductToast();
  const [initialized, setInitialized] = useState(false);
  
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
    if (!initialized) {
      console.log("useProductStore: Inicializando e buscando dados...");
      fetchData();
      setInitialized(true);
    }
  }, [initialized]);

  // Função para buscar todos os dados
  const fetchData = async () => {
    console.log("useProductStore: Buscando todos os dados...");
    setLoading(true);
    try {
      const results = await Promise.all([
        fetchProducts(),
        fetchBrands(),
        fetchCategories()
      ]);
      
      console.log("Dados carregados: ", {
        produtos: results[0]?.length || 0,
        marcas: results[1]?.length || 0,
        categorias: results[2]?.length || 0
      });
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
