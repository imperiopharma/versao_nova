
import { useAuth as useAuthContext } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  validCredentials
}: UseAuthOptions = {}) => {
  const auth = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Para login administrativo usando validCredentials (modo de desenvolvimento)
    if (isAdmin && validCredentials) {
      if (email === validCredentials.email && password === validCredentials.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        
        toast({
          title: 'Login administrativo realizado com sucesso!',
          description: 'Bem-vindo ao painel de administração.',
          duration: 3000,
        });
        
        navigate(redirectPath);
        return;
      } else {
        auth.resetError();
        toast({
          title: 'Erro de login',
          description: 'Email ou senha incorretos',
          variant: 'destructive',
        });
        return;
      }
    }
    
    // Login normal usando Supabase
    await auth.signIn(email, password);
    
    if (!auth.error) {
      navigate(redirectPath);
    }
  };
  
  return {
    email,
    password,
    loading: auth.loading,
    error: auth.error,
    setEmail,
    setPassword,
    setError: (error: string) => {
      // Este método é mantido para compatibilidade com código existente
    },
    setLoading: (loading: boolean) => {
      // Este método é mantido para compatibilidade com código existente
    },
    toast,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
};
