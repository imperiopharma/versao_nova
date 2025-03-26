
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProductCommon } from './useProductCommon';
import { Brand, BrandCategory } from '@/types/brand';
import { slugify } from '@/lib/utils';

export function useBrandsData() {
  const [brands, setBrands] = useState<any[]>([]);
  const { handleError, formatDateForSupabase, showSuccessToast } = useProductCommon();

  // Buscar marcas do Supabase
  const fetchBrands = async () => {
    try {
      console.log('Buscando marcas do Supabase...');
      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*')
        .order('name');

      if (brandsError) {
        throw brandsError;
      }

      // Formatar dados das marcas
      const formattedBrands = brandsData.map(brand => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        status: brand.status,
        logoUrl: brand.logo_url,
        category: brand.category
      }));

      console.log(`Encontradas ${formattedBrands.length} marcas no Supabase`);
      setBrands(formattedBrands);
      return formattedBrands;
    } catch (error) {
      handleError(error, 'Erro ao buscar marcas');
      return [];
    }
  };

  // Adicionar uma marca ao Supabase
  const addBrand = async (brand: any) => {
    try {
      // Verificar se o nome e slug existem
      if (!brand.name) {
        throw new Error('Nome da marca é obrigatório');
      }
      
      // Gerar slug automaticamente se não existir
      const slug = brand.slug || slugify(brand.name);
      
      // Remover propriedades incompatíveis com o esquema do Supabase
      const { id, logoUrl, ...brandData } = brand;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabbaseBrand = {
        name: brandData.name,
        slug: slug,
        description: brandData.description,
        category: brandData.category,
        logo_url: logoUrl,
        status: brandData.status
      };

      console.log('Enviando para Supabase:', supabbaseBrand);

      const { data, error } = await supabase
        .from('brands')
        .insert(supabbaseBrand)
        .select()
        .single();

      if (error) {
        console.error('Erro Supabase:', error);
        throw error;
      }

      console.log('Resposta Supabase:', data);

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
      showSuccessToast('Marca adicionada', 'A marca foi adicionada com sucesso.');
      return formattedBrand;
    } catch (error) {
      handleError(error, 'Erro ao adicionar marca');
      throw error;
    }
  };

  // Atualizar uma marca no Supabase
  const updateBrand = async (brand: any) => {
    try {
      const { id, logoUrl, ...brandData } = brand;
      
      // Verificar se o ID existe
      if (!id) {
        throw new Error('ID da marca é necessário para atualização');
      }
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabbaseBrand = {
        name: brandData.name,
        slug: brandData.slug,
        description: brandData.description,
        category: brandData.category,
        logo_url: logoUrl,
        status: brandData.status,
        updated_at: formatDateForSupabase()
      };

      const { error } = await supabase
        .from('brands')
        .update(supabbaseBrand)
        .eq('id', id);

      if (error) throw error;

      setBrands(prev => prev.map(b => b.id === id ? { ...brand } : b));
      showSuccessToast('Marca atualizada', 'A marca foi atualizada com sucesso.');
      return brand;
    } catch (error) {
      handleError(error, 'Erro ao atualizar marca');
      throw error;
    }
  };

  // Excluir uma marca do Supabase
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
