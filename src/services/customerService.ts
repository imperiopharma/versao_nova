
import { apiClient } from './apiClient';

export const customerService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/clientes');
      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return [];
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/clientes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao buscar cliente ${id}:`, error);
      return null;
    }
  },
  
  create: async (customer: any) => {
    try {
      const response = await apiClient.post('/clientes', customer);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  },
  
  update: async (id: string, customer: any) => {
    try {
      const response = await apiClient.put(`/clientes/${id}`, customer);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao atualizar cliente ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/clientes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao excluir cliente ${id}:`, error);
      throw error;
    }
  }
};
