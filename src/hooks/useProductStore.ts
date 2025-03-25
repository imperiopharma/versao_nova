
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useProductStore() {
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Buscar produtos
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) {
        throw productsError;
      }

      // Buscar marcas
      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*');

      if (brandsError) {
        throw brandsError;
      }

      // Buscar categorias
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');

      if (categoriesError) {
        throw categoriesError;
      }

      // Formatar dados para compatibilidade com o código existente
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

      const formattedBrands = brandsData.map(brand => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        status: brand.status,
        logoUrl: brand.logo_url,
        category: brand.category
      }));

      const formattedCategories = categoriesData.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        status: category.status
      }));

      setProducts(formattedProducts);
      setBrands(formattedBrands);
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do banco. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Produtos
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
      console.error('Erro ao adicionar produto:', error);
      toast({
        title: "Erro ao adicionar produto",
        description: "Não foi possível adicionar o produto. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

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
        updated_at: new Date()
      };

      const { error } = await supabase
        .from('products')
        .update(supabaseProduct)
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(p => p.id === id ? { ...product } : p));
      return product;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      toast({
        title: "Erro ao atualizar produto",
        description: "Não foi possível atualizar o produto. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Marcas
  const addBrand = async (brand: any) => {
    try {
      // Remover propriedades incompatíveis com o esquema do Supabase
      const { id, ...brandData } = brand;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabbaseBrand = {
        name: brandData.name,
        slug: brandData.slug,
        description: brandData.description,
        category: brandData.category,
        logo_url: brandData.logoUrl,
        status: brandData.status
      };

      const { data, error } = await supabase
        .from('brands')
        .insert(supabbaseBrand)
        .select('*')
        .single();

      if (error) throw error;

      const formattedBrand = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        category: data.category,
        logoUrl: data.logo_url,
        status: data.status
      };

      setBrands(prev => [...prev, formattedBrand]);
      return formattedBrand;
    } catch (error) {
      console.error('Erro ao adicionar marca:', error);
      toast({
        title: "Erro ao adicionar marca",
        description: "Não foi possível adicionar a marca. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateBrand = async (brand: any) => {
    try {
      const { id } = brand;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabbaseBrand = {
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        category: brand.category,
        logo_url: brand.logoUrl,
        status: brand.status,
        updated_at: new Date()
      };

      const { error } = await supabase
        .from('brands')
        .update(supabbaseBrand)
        .eq('id', id);

      if (error) throw error;

      setBrands(prev => prev.map(b => b.id === id ? { ...brand } : b));
      return brand;
    } catch (error) {
      console.error('Erro ao atualizar marca:', error);
      toast({
        title: "Erro ao atualizar marca",
        description: "Não foi possível atualizar a marca. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Categorias
  const addCategory = async (category: any) => {
    try {
      // Remover propriedades incompatíveis com o esquema do Supabase
      const { id, ...categoryData } = category;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseCategory = {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        status: categoryData.status
      };

      const { data, error } = await supabase
        .from('categories')
        .insert(supabaseCategory)
        .select('*')
        .single();

      if (error) throw error;

      const formattedCategory = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        status: data.status
      };

      setCategories(prev => [...prev, formattedCategory]);
      return formattedCategory;
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      toast({
        title: "Erro ao adicionar categoria",
        description: "Não foi possível adicionar a categoria. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateCategory = async (category: any) => {
    try {
      const { id } = category;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseCategory = {
        name: category.name,
        slug: category.slug,
        description: category.description,
        status: category.status,
        updated_at: new Date()
      };

      const { error } = await supabase
        .from('categories')
        .update(supabaseCategory)
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.map(c => c.id === id ? { ...category } : c));
      return category;
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      toast({
        title: "Erro ao atualizar categoria",
        description: "Não foi possível atualizar a categoria. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Remover marca
  const deleteBrand = async (brandId: string) => {
    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandId);

      if (error) throw error;

      setBrands(prev => prev.filter(b => b.id !== brandId));
      toast({
        title: "Marca excluída",
        description: "A marca foi excluída com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao excluir marca:', error);
      toast({
        title: "Erro ao excluir marca",
        description: "Não foi possível excluir a marca. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

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
