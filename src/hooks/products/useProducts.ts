
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProductToast } from './useProductToast';
import { Product, ProductInputData } from '@/types/product';
import { formatDateForSupabase } from '@/lib/formatters';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { handleError, showSuccessToast } = useProductToast();

  // Buscar produtos do Supabase
  const fetchProducts = async (): Promise<Product[]> => {
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
      const formattedProducts = productsData.map(formatProductFromDB);

      setProducts(formattedProducts);
      return formattedProducts;
    } catch (error) {
      handleError(error, 'Erro ao buscar produtos');
      return [];
    }
  };

  // Formatar produto vindo do banco de dados
  const formatProductFromDB = (product: any): Product => {
    return {
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
    };
  };

  // Gerar SKU automaticamente baseado na quantidade de produtos + 1
  const generateSku = () => {
    const nextNumber = products.length + 1;
    return `PROD${String(nextNumber).padStart(4, '0')}`;
  };

  // Preparar produto para o formato do Supabase
  const prepareProductForDB = (product: ProductInputData) => {
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
    return {
      name: productData.name || 'Produto sem nome',
      description: productData.description || '',
      sku: sku,
      brand: productData.brand === 'selecione' ? '' : productData.brand || '',
      category: productData.category === 'selecione' ? '' : productData.category || '',
      price: Number(sellingPrice) || 0,
      original_price: Number(costPrice) || 0,
      cost_price: Number(costPrice) || 0,
      selling_price: Number(sellingPrice) || 0,
      promo_price: Number(promoPrice) || 0,
      stock: Number(productData.stock) || 0,
      status: productData.status || 'active',
      image: productData.image || 'https://via.placeholder.com/300x300?text=Produto'
    };
  };

  // Adicionar um produto ao Supabase
  const addProduct = async (product: ProductInputData): Promise<Product> => {
    try {
      console.log("Adicionando produto:", product);
      
      const supabaseProduct = prepareProductForDB(product);
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

      const formattedProduct = formatProductFromDB(data);

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
  const updateProduct = async (product: ProductInputData): Promise<Product> => {
    try {
      console.log("Atualizando produto:", product);
      
      if (!product.id) {
        throw new Error('ID do produto não fornecido para atualização');
      }
      
      const supabaseProduct = {
        ...prepareProductForDB(product),
        updated_at: formatDateForSupabase()
      };

      console.log('Dados enviados para atualização:', supabaseProduct);

      const { error } = await supabase
        .from('products')
        .update(supabaseProduct)
        .eq('id', product.id);

      if (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
      }

      // Formatar o produto para o formato da aplicação
      const formattedProduct = {
        id: product.id,
        name: product.name || '',
        description: product.description || '',
        sku: product.sku || '',
        brand: product.brand || '',
        category: product.category || '',
        price: Number(product.sellingPrice) || 0,
        originalPrice: Number(product.costPrice) || 0,
        costPrice: Number(product.costPrice) || 0,
        sellingPrice: Number(product.sellingPrice) || 0,
        promoPrice: Number(product.promoPrice) || 0,
        stock: Number(product.stock) || 0,
        status: product.status || 'active',
        image: product.image || 'https://via.placeholder.com/300x300?text=Produto',
      };

      // Atualizar o produto na lista local
      setProducts(prev => prev.map(p => p.id === product.id ? formattedProduct : p));
      showSuccessToast("Produto atualizado", "O produto foi atualizado com sucesso.");
      return formattedProduct;
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
