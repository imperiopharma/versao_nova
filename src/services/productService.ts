
import { apiClient } from './apiClient';

export const productService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/produtos');
      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/produtos/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      return null;
    }
  },
  
  create: async (product: any) => {
    try {
      const response = await apiClient.post('/produtos', product);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },
  
  update: async (id: string, product: any) => {
    try {
      const response = await apiClient.put(`/produtos/${id}`, product);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/produtos/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao excluir produto ${id}:`, error);
      throw error;
    }
  },
  
  getCombos: async () => {
    try {
      const response = await apiClient.get('/combos');
      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao buscar combos:', error);
      return [];
    }
  }
};
