
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProductCommon } from './useProductCommon';

export function useProductsData() {
  const [products, setProducts] = useState<any[]>([]);
  const { handleError, formatDateForSupabase, showSuccessToast } = useProductCommon();

  // Buscar produtos do Supabase
  const fetchProducts = async () => {
    try {
      console.log("Buscando produtos do Supabase...");
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) {
        console.error("Erro ao buscar produtos:", productsError);
        throw productsError;
      }

      console.log("Produtos recebidos do Supabase:", productsData?.length || 0);
      
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

  // Gerar SKU automaticamente baseado na quantidade de produtos + 1
  const generateSku = () => {
    const nextNumber = products.length + 1;
    return `PROD${String(nextNumber).padStart(4, '0')}`;
  };

  // Adicionar um produto ao Supabase
  const addProduct = async (product: any) => {
    try {
      console.log("Adicionando produto:", product);
      
      // Remover propriedades incompatíveis com o esquema do Supabase
      const { 
        id, 
        originalPrice, 
        costPrice, 
        sellingPrice, 
        promoPrice, 
        ...productData 
      } = product;
      
      // Gerar SKU automaticamente se não fornecido
      const sku = productData.sku || generateSku();
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseProduct = {
        name: productData.name || 'Produto sem nome',
        description: productData.description || '',
        sku: sku,
        brand: productData.brand || '',
        category: productData.category || '',
        price: Number(sellingPrice) || 0,
        original_price: Number(costPrice) || 0,
        cost_price: Number(costPrice) || 0,
        selling_price: Number(sellingPrice) || 0,
        promo_price: Number(promoPrice) || 0,
        stock: 1, // Valor padrão para estoque
        status: productData.status || 'active',
        image: productData.image || 'https://via.placeholder.com/300x300?text=Produto'
      };

      console.log('Dados enviados para o Supabase:', supabaseProduct);

      const { data, error } = await supabase
        .from('products')
        .insert(supabaseProduct)
        .select()
        .single();

      if (error) {
        console.error('Erro do Supabase:', error);
        throw error;
      }

      console.log('Resposta do Supabase:', data);

      if (!data) {
        throw new Error('Produto não foi adicionado ao banco de dados');
      }

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

      // Atualizar a lista local de produtos
      setProducts(prev => [formattedProduct, ...prev]);
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
      console.log("Atualizando produto:", product);
      
      if (!product.id) {
        throw new Error('ID do produto não fornecido para atualização');
      }
      
      const { 
        id, 
        originalPrice, 
        costPrice, 
        sellingPrice, 
        promoPrice, 
        ...productData 
      } = product;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseProduct = {
        name: productData.name || 'Produto sem nome',
        description: productData.description || '',
        sku: productData.sku || '',
        brand: productData.brand || '',
        category: productData.category || '',
        price: Number(sellingPrice) || 0,
        original_price: Number(costPrice) || 0,
        cost_price: Number(costPrice) || 0,
        selling_price: Number(sellingPrice) || 0,
        promo_price: Number(promoPrice) || 0,
        stock: Number(productData.stock) || 0,
        status: productData.status || 'active',
        image: productData.image || 'https://via.placeholder.com/300x300?text=Produto',
        updated_at: formatDateForSupabase()
      };

      console.log('Dados enviados para atualização:', supabaseProduct);

      const { error } = await supabase
        .from('products')
        .update(supabaseProduct)
        .eq('id', id);

      if (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
      }

      // Atualizar o produto na lista local
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
      console.log("Excluindo produto:", productId);
      
      if (!productId) {
        throw new Error('ID do produto não fornecido para exclusão');
      }
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Erro ao excluir produto:', error);
        throw error;
      }

      // Remover o produto da lista local
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
    deleteProduct,
    generateSku
  };
}
