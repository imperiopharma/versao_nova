
/**
 * Serviço para gerenciar autenticação
 */
class AuthService {
  /**
   * Verificar se o usuário está logado como administrador
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('adminLoggedIn') === 'true';
  }

  /**
   * Fazer login como administrador
   * @param credentials Credenciais de login
   */
  async login(credentials: { email: string; password: string }): Promise<boolean> {
    // Implementação simplificada apenas para demonstração
    // Em um ambiente real, isso deveria verificar as credenciais com um backend seguro
    
    if (credentials.email === 'admin@exemplo.com' && credentials.password === 'senha123') {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUser', JSON.stringify({
        name: 'Administrador',
        email: credentials.email,
        role: 'admin'
      }));
      
      return true;
    }
    
    return false;
  }

  /**
   * Fazer logout
   */
  logout(): void {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
  }

  /**
   * Obter dados do usuário logado
   */
  getUser(): any {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}

// Exportar uma instância única do serviço
const authService = new AuthService();
export default authService;
