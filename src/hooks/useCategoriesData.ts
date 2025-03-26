
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProductCommon } from './useProductCommon';

export function useCategoriesData() {
  const [categories, setCategories] = useState<any[]>([]);
  const { handleError, formatDateForSupabase, showSuccessToast } = useProductCommon();

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
        status: category.status,
        active: category.status === 'active' // Convertendo status para um booleano active
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
      const { id, active, ...categoryData } = category;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseCategory = {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        status: active ? 'active' : 'inactive', // Converter booleano active para status string
      };

      console.log('Enviando categoria para Supabase:', supabaseCategory);

      const { data, error } = await supabase
        .from('categories')
        .insert(supabaseCategory)
        .select()
        .single();

      if (error) {
        console.error('Erro Supabase:', error);
        throw error;
      }

      console.log('Resposta Supabase:', data);

      const formattedCategory = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        status: data.status,
        active: data.status === 'active' // Convertendo status para um booleano active
      };

      setCategories(prev => [...prev, formattedCategory]);
      showSuccessToast('Categoria adicionada', 'A categoria foi adicionada com sucesso.');
      return formattedCategory;
    } catch (error) {
      handleError(error, 'Erro ao adicionar categoria');
      throw error;
    }
  };

  // Atualizar uma categoria no Supabase
  const updateCategory = async (category: any) => {
    try {
      const { id, active, ...categoryData } = category;
      
      // Converter nomes de propriedades para o formato do Supabase
      const supabaseCategory = {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        status: active ? 'active' : 'inactive', // Converter booleano active para status string
        updated_at: formatDateForSupabase()
      };

      const { error } = await supabase
        .from('categories')
        .update(supabaseCategory)
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.map(c => c.id === id ? { ...category } : c));
      showSuccessToast('Categoria atualizada', 'A categoria foi atualizada com sucesso.');
      return category;
    } catch (error) {
      handleError(error, 'Erro ao atualizar categoria');
      throw error;
    }
  };

  // Atualizar o status ativo de uma categoria
  const toggleCategoryActive = async (categoryId: string, active: boolean) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({ 
          status: active ? 'active' : 'inactive', // Converter booleano active para status string
          updated_at: formatDateForSupabase() 
        })
        .eq('id', categoryId);

      if (error) throw error;

      setCategories(prev => prev.map(c => 
        c.id === categoryId ? { ...c, active, status: active ? 'active' : 'inactive' } : c
      ));
      
      showSuccessToast(
        active ? 'Categoria ativada' : 'Categoria desativada', 
        `A categoria foi ${active ? 'ativada' : 'desativada'} com sucesso.`
      );
    } catch (error) {
      handleError(error, `Erro ao ${active ? 'ativar' : 'desativar'} categoria`);
      throw error;
    }
  };

  // Adicionar função para excluir categoria
  const deleteCategory = async (categoryId: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      setCategories(prev => prev.filter(c => c.id !== categoryId));
      showSuccessToast('Categoria excluída', 'A categoria foi excluída com sucesso.');
    } catch (error) {
      handleError(error, 'Erro ao excluir categoria');
      throw error;
    }
  };

  return {
    categories,
    setCategories,
    fetchCategories,
    addCategory,
    updateCategory,
    toggleCategoryActive,
    deleteCategory
  };
}
