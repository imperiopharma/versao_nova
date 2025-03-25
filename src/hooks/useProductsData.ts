
import { useProducts } from './products/useProducts';
import { useProductToast } from './products/useProductToast';

export function useProductsData() {
  const {
    products,
    setProducts,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    generateSku
  } = useProducts();

  const { loading, setLoading } = useProductToast();

  return {
    products,
    setProducts,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    generateSku,
    loading,
    setLoading
  };
}
