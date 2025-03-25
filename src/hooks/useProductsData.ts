
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProductCommon } from './useProductCommon';

export function useProductsData() {
  const [products, setProducts] = useState<any[]>([]);
  const { handleError, formatDateForSupabase, showSuccessToast } = useProductCommon();

  // Buscar produtos do Supabase
  const fetchProducts = async () => {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) {
        throw productsError;
      }

      // Formatar dados dos produtos
      const formattedProducts = productsData.map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.original_price,
        image: product.image,
        sku: product.sku,
        category: product.category,
        description: product.description,
        status: product.status,
        costPrice: product.cost_price,
        sellingPrice: product.selling_price,
        promoPrice: product.promo_price,
        stock: product.stock,
      }));

      setProducts(formattedProducts);
      return formattedProducts;
    } catch (error) {
      handleError(error, 'Erro ao buscar produtos');
      return [];
    }
  };

  // Adicionar um produto ao Supabase
  const addProduct = async (product: any) => {
    try {
      // Remover propriedades incompatíveis com o esquema do Supabase
      const { id, ...productData } = product;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseProduct = {
        name: productData.name || 'Produto sem nome',
        description: productData.description || '',
        sku: productData.sku || '',
        brand: productData.brand || '',
        category: productData.category || '',
        price: productData.price || productData.sellingPrice || 0,
        original_price: productData.originalPrice || productData.costPrice || 0,
        cost_price: productData.costPrice || 0,
        selling_price: productData.sellingPrice || 0,
        promo_price: productData.promoPrice || 0,
        stock: productData.stock || 0,
        status: productData.status || 'active',
        image: productData.image || ''
      };

      console.log('Dados enviados para o Supabase:', supabaseProduct);

      const { data, error } = await supabase
        .from('products')
        .insert(supabaseProduct)
        .select('*')
        .single();

      if (error) {
        console.error('Erro do Supabase:', error);
        throw error;
      }

      console.log('Resposta do Supabase:', data);

      const formattedProduct = {
        id: data.id,
        name: data.name,
        brand: data.brand,
        price: data.price,
        originalPrice: data.original_price,
        image: data.image,
        sku: data.sku,
        category: data.category,
        description: data.description,
        status: data.status,
        costPrice: data.cost_price,
        sellingPrice: data.selling_price,
        promoPrice: data.promo_price,
        stock: data.stock,
      };

      setProducts(prev => [...prev, formattedProduct]);
      showSuccessToast("Produto adicionado", "O produto foi adicionado com sucesso.");
      return formattedProduct;
    } catch (error) {
      console.error('Erro completo:', error);
      handleError(error, 'Erro ao adicionar produto');
      throw error;
    }
  };

  // Atualizar um produto no Supabase
  const updateProduct = async (product: any) => {
    try {
      const { id } = product;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseProduct = {
        name: product.name || 'Produto sem nome',
        description: product.description || '',
        sku: product.sku || '',
        brand: product.brand || '',
        category: product.category || '',
        price: product.price || product.sellingPrice || 0,
        original_price: product.originalPrice || product.costPrice || 0,
        cost_price: product.costPrice || 0,
        selling_price: product.sellingPrice || 0,
        promo_price: product.promoPrice || 0,
        stock: product.stock || 0,
        status: product.status || 'active',
        image: product.image || '',
        updated_at: formatDateForSupabase()
      };

      const { error } = await supabase
        .from('products')
        .update(supabaseProduct)
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(p => p.id === id ? { ...product } : p));
      showSuccessToast("Produto atualizado", "O produto foi atualizado com sucesso.");
      return product;
    } catch (error) {
      handleError(error, 'Erro ao atualizar produto');
      throw error;
    }
  };

  // Excluir um produto do Supabase
  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      setProducts(prev => prev.filter(p => p.id !== productId));
      showSuccessToast("Produto excluído", "O produto foi excluído com sucesso.");
    } catch (error) {
      handleError(error, 'Erro ao excluir produto');
      throw error;
    }
  };

  return {
    products,
    setProducts,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
}
