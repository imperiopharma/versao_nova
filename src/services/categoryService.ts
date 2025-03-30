
import { apiClient } from './apiClient';

export const categoryService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/categorias');
      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/categorias/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao buscar categoria ${id}:`, error);
      return null;
    }
  },
  
  create: async (category: any) => {
    try {
      const response = await apiClient.post('/categorias', category);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  },
  
  update: async (id: string, category: any) => {
    try {
      const response = await apiClient.put(`/categorias/${id}`, category);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao atualizar categoria ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/categorias/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao excluir categoria ${id}:`, error);
      throw error;
    }
  }
};
