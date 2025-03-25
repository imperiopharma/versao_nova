
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
    updateProduct
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
    updateCategory
  } = useCategoriesData();

  // Fetch all data on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch all data
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

  // Return the same API to maintain backward compatibility
  return {
    products,
    brands,
    categories,
    loading,
    fetchData,
    addProduct,
    updateProduct,
    addBrand,
    updateBrand,
    deleteBrand,
    addCategory,
    updateCategory,
  };
}
