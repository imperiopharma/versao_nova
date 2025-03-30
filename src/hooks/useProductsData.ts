
import { useState } from 'react';
import { useProducts } from './products/useProducts';
import { useProductToast } from './products/useProductToast';
import { productService } from '@/services/productService';

export function useProductsData() {
  const {
    products,
    setProducts,
    generateSku
  } = useProducts();

  const { loading, setLoading, handleError, showSuccessToast } = useProductToast();

  // Buscar produtos da API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log("Buscando produtos da API...");
      const productsData = await productService.getAll();
      console.log("Produtos recebidos:", productsData?.length || 0);
      
      if (productsData && productsData.length > 0) {
        setProducts(productsData);
      }
      
      setLoading(false);
      return productsData || [];
    } catch (error) {
      handleError(error, 'Erro ao buscar produtos');
      setLoading(false);
      return [];
    }
  };

  // Adicionar um produto via API
  const addProduct = async (productData) => {
    setLoading(true);
    try {
      console.log("Adicionando produto:", productData);
      
      // Gerar SKU se não fornecido
      if (!productData.sku) {
        productData.sku = generateSku();
      }
      
      const newProduct = await productService.create(productData);
      if (newProduct) {
        setProducts(prev => [newProduct, ...prev]);
        showSuccessToast("Produto adicionado", "O produto foi adicionado com sucesso.");
      }
      
      setLoading(false);
      return newProduct;
    } catch (error) {
      handleError(error, 'Erro ao adicionar produto');
      setLoading(false);
      throw error;
    }
  };

  // Atualizar um produto via API
  const updateProduct = async (productData) => {
    setLoading(true);
    try {
      console.log("Atualizando produto:", productData);
      
      if (!productData.id) {
        throw new Error('ID do produto não fornecido para atualização');
      }
      
      const updatedProduct = await productService.update(productData.id, productData);
      
      if (updatedProduct) {
        setProducts(prev => prev.map(p => p.id === productData.id ? {...p, ...updatedProduct} : p));
        showSuccessToast("Produto atualizado", "O produto foi atualizado com sucesso.");
      }
      
      setLoading(false);
      return updatedProduct;
    } catch (error) {
      handleError(error, 'Erro ao atualizar produto');
      setLoading(false);
      throw error;
    }
  };

  // Excluir um produto via API
  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      console.log("Excluindo produto:", productId);
      
      await productService.delete(productId);
      
      // Remover o produto da lista local
      setProducts(prev => prev.filter(p => p.id !== productId));
      showSuccessToast("Produto excluído", "O produto foi excluído com sucesso.");
      
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error, 'Erro ao excluir produto');
      setLoading(false);
      throw error;
    }
  };

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
