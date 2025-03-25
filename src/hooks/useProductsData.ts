
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProductCommon } from './useProductCommon';

export function useProductsData() {
  const [products, setProducts] = useState<any[]>([]);
  const { handleError, formatDateForSupabase } = useProductCommon();

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
        name: productData.name,
        description: productData.description,
        sku: productData.sku,
        brand: productData.brand,
        category: productData.category,
        price: productData.price || productData.sellingPrice,
        original_price: productData.originalPrice || productData.costPrice,
        cost_price: productData.costPrice,
        selling_price: productData.sellingPrice,
        promo_price: productData.promoPrice,
        stock: productData.stock,
        status: productData.status,
        image: productData.image
      };

      const { data, error } = await supabase
        .from('products')
        .insert(supabaseProduct)
        .select('*')
        .single();

      if (error) throw error;

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
      return formattedProduct;
    } catch (error) {
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
        name: product.name,
        description: product.description,
        sku: product.sku,
        brand: product.brand,
        category: product.category,
        price: product.price || product.sellingPrice,
        original_price: product.originalPrice || product.costPrice,
        cost_price: product.costPrice,
        selling_price: product.sellingPrice,
        promo_price: product.promoPrice,
        stock: product.stock,
        status: product.status,
        image: product.image,
        updated_at: formatDateForSupabase()
      };

      const { error } = await supabase
        .from('products')
        .update(supabaseProduct)
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(p => p.id === id ? { ...product } : p));
      return product;
    } catch (error) {
      handleError(error, 'Erro ao atualizar produto');
      throw error;
    }
  };

  return {
    products,
    setProducts,
    fetchProducts,
    addProduct,
    updateProduct
  };
}
