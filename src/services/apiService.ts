
import axios from 'axios';

const API_URL = '/api'; // Caminho relativo para a API PHP

// Criamos um cliente axios com a URL base e configurações padrão
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviço para produtos
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

// Serviço para categorias
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

// Serviço para marcas
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

// Serviço para clientes
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

// Exportar todos os serviços em um objeto único
export default {
  products: productService,
  categories: categoryService,
  brands: brandService,
  customers: customerService
};
