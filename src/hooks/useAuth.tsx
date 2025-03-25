
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthCredentials {
  email: string;
  password: string;
}

interface UseAuthOptions {
  isAdmin?: boolean;
  redirectPath?: string;
  storageKey?: string;
  validCredentials?: { 
    email: string; 
    password: string;
  };
}

export const useAuth = ({
  isAdmin = false,
  redirectPath = '/',
  storageKey = 'isLoggedIn',
  validCredentials
}: UseAuthOptions = {}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const validateCredentials = async (credentials: AuthCredentials): Promise<boolean> => {
    // Simular uma verificação de credenciais
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (validCredentials) {
      return credentials.email === validCredentials.email && 
             credentials.password === validCredentials.password;
    }
    
    // Para login não administrativo, usamos credenciais de teste genéricas
    return credentials.email === 'usuario@exemplo.com' && credentials.password === 'senha123';
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos');
      return;
    }
    
    setLoading(true);
    
    try {
      const isValid = await validateCredentials({ email, password });
      
      if (isValid) {
        // Login bem-sucedido
        localStorage.setItem(storageKey, 'true');
        
        toast({
          title: isAdmin ? 'Login administrativo realizado com sucesso!' : 'Login realizado com sucesso!',
          description: isAdmin ? 'Bem-vindo ao painel de administração.' : 'Bem-vindo de volta.',
          duration: 3000,
        });
        
        navigate(redirectPath);
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao processar sua solicitação');
    } finally {
      setLoading(false);
    }
  };
  
  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    setError,
    handleEmailChange,
    handlePasswordChange,
    handleLogin
  };
};
