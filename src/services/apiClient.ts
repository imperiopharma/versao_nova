
import axios from 'axios';

const API_URL = '/api'; // Caminho relativo para a API PHP

// Criamos um cliente axios com a URL base e configurações padrão
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
