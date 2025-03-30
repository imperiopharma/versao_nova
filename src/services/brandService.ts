
import { apiClient } from './apiClient';

export const brandService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/marcas');
      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
      return [];
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/marcas/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao buscar marca ${id}:`, error);
      return null;
    }
  },
  
  create: async (brand: any) => {
    try {
      const response = await apiClient.post('/marcas', brand);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar marca:', error);
      throw error;
    }
  },
  
  update: async (id: string, brand: any) => {
    try {
      const response = await apiClient.put(`/marcas/${id}`, brand);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao atualizar marca ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/marcas/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao excluir marca ${id}:`, error);
      throw error;
    }
  }
};
