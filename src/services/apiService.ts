
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
    const response = await apiClient.get('/produtos');
    return response.data.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/produtos/${id}`);
    return response.data.data;
  },
  
  getCombos: async () => {
    const response = await apiClient.get('/combos');
    return response.data.data;
  }
};

// Serviço para categorias
export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get('/categorias');
    return response.data.data;
  }
};

// Serviço para marcas
export const brandService = {
  getAll: async () => {
    const response = await apiClient.get('/marcas');
    return response.data.data;
  }
};

// Outros serviços podem ser adicionados conforme necessário

export default {
  products: productService,
  categories: categoryService,
  brands: brandService
};
