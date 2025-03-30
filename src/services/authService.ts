
import axios from 'axios';

const API_URL = '/api';

// Serviço de autenticação básico
const authService = {
  // Login administrador
  loginAdmin: async (username: string, password: string) => {
    try {
      // Implementação simples para fins de exemplo
      // Na versão final, isso deve chamar a API para validar credenciais
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        return { success: true };
      }

      // Tentativa de autenticação via API
      /*
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
      
      if (response.data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        return { success: true };
      }
      */
      
      return { success: false, error: 'Credenciais inválidas' };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, error: 'Erro ao fazer login' };
    }
  },
  
  // Verificar se o usuário está logado
  isLoggedIn: () => {
    return localStorage.getItem('adminLoggedIn') === 'true';
  },
  
  // Obter nome do usuário logado
  getUsername: () => {
    return localStorage.getItem('adminUsername') || 'Admin';
  },
  
  // Logout
  logout: () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
  }
};

export default authService;
