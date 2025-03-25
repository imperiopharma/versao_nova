
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProductCommon } from './useProductCommon';

export function useBrandsData() {
  const [brands, setBrands] = useState<any[]>([]);
  const { handleError, formatDateForSupabase, showSuccessToast } = useProductCommon();

  // Fetch brands from Supabase
  const fetchBrands = async () => {
    try {
      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*');

      if (brandsError) {
        throw brandsError;
      }

      // Format brands data
      const formattedBrands = brandsData.map(brand => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        status: brand.status,
        logoUrl: brand.logo_url,
        category: brand.category
      }));

      setBrands(formattedBrands);
      return formattedBrands;
    } catch (error) {
      handleError(error, 'Erro ao buscar marcas');
      return [];
    }
  };

  // Add a brand to Supabase
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
      handleError(error, 'Erro ao adicionar marca');
      throw error;
    }
  };

  // Update a brand in Supabase
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
        updated_at: formatDateForSupabase()
      };

      const { error } = await supabase
        .from('brands')
        .update(supabbaseBrand)
        .eq('id', id);

      if (error) throw error;

      setBrands(prev => prev.map(b => b.id === id ? { ...brand } : b));
      return brand;
    } catch (error) {
      handleError(error, 'Erro ao atualizar marca');
      throw error;
    }
  };

  // Delete a brand from Supabase
  const deleteBrand = async (brandId: string) => {
    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandId);

      if (error) throw error;

      setBrands(prev => prev.filter(b => b.id !== brandId));
      showSuccessToast("Marca excluída", "A marca foi excluída com sucesso.");
    } catch (error) {
      handleError(error, 'Erro ao excluir marca');
      throw error;
    }
  };

  return {
    brands,
    setBrands,
    fetchBrands,
    addBrand,
    updateBrand,
    deleteBrand
  };
}
