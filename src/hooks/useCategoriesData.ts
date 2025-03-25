
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProductCommon } from './useProductCommon';

export function useCategoriesData() {
  const [categories, setCategories] = useState<any[]>([]);
  const { handleError, formatDateForSupabase } = useProductCommon();

  // Buscar categorias do Supabase
  const fetchCategories = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');

      if (categoriesError) {
        throw categoriesError;
      }

      // Formatar dados das categorias
      const formattedCategories = categoriesData.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        status: category.status
      }));

      setCategories(formattedCategories);
      return formattedCategories;
    } catch (error) {
      handleError(error, 'Erro ao buscar categorias');
      return [];
    }
  };

  // Adicionar uma categoria ao Supabase
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
      handleError(error, 'Erro ao adicionar categoria');
      throw error;
    }
  };

  // Atualizar uma categoria no Supabase
  const updateCategory = async (category: any) => {
    try {
      const { id } = category;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseCategory = {
        name: category.name,
        slug: category.slug,
        description: category.description,
        status: category.status,
        updated_at: formatDateForSupabase()
      };

      const { error } = await supabase
        .from('categories')
        .update(supabaseCategory)
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.map(c => c.id === id ? { ...category } : c));
      return category;
    } catch (error) {
      handleError(error, 'Erro ao atualizar categoria');
      throw error;
    }
  };

  return {
    categories,
    setCategories,
    fetchCategories,
    addCategory,
    updateCategory
  };
}
