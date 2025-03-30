
import { useState } from 'react';
import { useProductCommon } from './useProductCommon';
import { categoryService } from '@/services/apiService';
import { slugify } from '@/lib/utils';

export function useCategoriesData() {
  const [categories, setCategories] = useState<any[]>([]);
  const { handleError, showSuccessToast } = useProductCommon();
  const [loading, setLoading] = useState(false);

  // Buscar categorias da API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categoriesData = await categoryService.getAll();

      if (categoriesData && categoriesData.length > 0) {
        // Formatar dados das categorias
        const formattedCategories = categoriesData.map(category => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          status: category.status || 'active',
          active: category.active === 1 || category.active === true,
          iconName: category.icon_name || 'pill'
        }));

        setCategories(formattedCategories);
        setLoading(false);
        return formattedCategories;
      }
      
      setLoading(false);
      return [];
    } catch (error) {
      handleError(error, 'Erro ao buscar categorias');
      setLoading(false);
      return [];
    }
  };

  // Adicionar uma categoria via API
  const addCategory = async (category: any) => {
    setLoading(true);
    try {
      // Verificar se o nome existe
      if (!category.name) {
        throw new Error('Nome da categoria é obrigatório');
      }
      
      // Gerar slug automaticamente se não existir
      const slug = category.slug || slugify(category.name);
      
      // Preparar dados para API
      const categoryData = {
        name: category.name,
        slug: slug,
        description: category.description || '',
        icon_name: category.iconName || 'pill',
        status: category.status || 'active',
        active: category.active !== undefined ? (category.active ? 1 : 0) : 1
      };

      console.log('Enviando categoria para API:', categoryData);

      const newCategory = await categoryService.create(categoryData);

      if (newCategory) {
        const formattedCategory = {
          id: newCategory.id,
          name: newCategory.name,
          slug: newCategory.slug,
          description: newCategory.description || '',
          status: newCategory.status || 'active',
          active: newCategory.active === 1 || newCategory.active === true,
          iconName: newCategory.icon_name || 'pill'
        };

        setCategories(prev => [...prev, formattedCategory]);
        showSuccessToast('Categoria adicionada', 'A categoria foi adicionada com sucesso.');
        setLoading(false);
        return formattedCategory;
      }
      
      setLoading(false);
      return null;
    } catch (error) {
      handleError(error, 'Erro ao adicionar categoria');
      setLoading(false);
      throw error;
    }
  };

  // Atualizar uma categoria via API
  const updateCategory = async (category: any) => {
    setLoading(true);
    try {
      const { id } = category;
      
      // Verificar se o ID existe
      if (!id) {
        throw new Error('ID da categoria é necessário para atualização');
      }
      
      // Preparar dados para API
      const categoryData = {
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        icon_name: category.iconName || 'pill',
        status: category.status || 'active',
        active: category.active !== undefined ? (category.active ? 1 : 0) : 1
      };

      const updatedCategory = await categoryService.update(id, categoryData);

      if (updatedCategory) {
        // Atualizar a categoria na lista local
        setCategories(prev => prev.map(c => c.id === id ? {
          ...category,
          id: updatedCategory.id || id,
          name: updatedCategory.name || category.name,
          slug: updatedCategory.slug || category.slug, 
          description: updatedCategory.description || category.description,
          status: updatedCategory.status || category.status,
          active: updatedCategory.active === 1 || updatedCategory.active === true,
          iconName: updatedCategory.icon_name || category.iconName
        } : c));
        
        showSuccessToast('Categoria atualizada', 'A categoria foi atualizada com sucesso.');
        setLoading(false);
        return updatedCategory;
      }
      
      setLoading(false);
      return null;
    } catch (error) {
      handleError(error, 'Erro ao atualizar categoria');
      setLoading(false);
      throw error;
    }
  };

  // Atualizar o status ativo de uma categoria
  const toggleCategoryActive = async (categoryId: string, active: boolean) => {
    setLoading(true);
    try {
      const categoryToUpdate = categories.find(c => c.id === categoryId);
      
      if (!categoryToUpdate) {
        throw new Error('Categoria não encontrada');
      }
      
      const updatedData = {
        ...categoryToUpdate,
        active: active,
        status: active ? 'active' : 'inactive'
      };
      
      const result = await updateCategory(updatedData);
      
      if (result) {
        showSuccessToast(
          active ? 'Categoria ativada' : 'Categoria desativada', 
          `A categoria foi ${active ? 'ativada' : 'desativada'} com sucesso.`
        );
      }
      
      setLoading(false);
      return result;
    } catch (error) {
      handleError(error, `Erro ao ${active ? 'ativar' : 'desativar'} categoria`);
      setLoading(false);
      throw error;
    }
  };

  // Excluir uma categoria via API
  const deleteCategory = async (categoryId: string) => {
    setLoading(true);
    try {
      await categoryService.delete(categoryId);

      // Remover a categoria da lista local
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      showSuccessToast('Categoria excluída', 'A categoria foi excluída com sucesso.');
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error, 'Erro ao excluir categoria');
      setLoading(false);
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
    deleteCategory,
    loading
  };
}
