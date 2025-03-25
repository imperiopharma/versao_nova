
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { adminCredentials } from '@/components/admin/layout/menuItems';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simular verificação de credenciais
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email === adminCredentials.email && password === adminCredentials.password) {
        // Simular login bem-sucedido
        localStorage.setItem('adminLoggedIn', 'true');
        
        toast({
          title: 'Login administrativo realizado com sucesso!',
          description: 'Bem-vindo ao painel de administração.',
          duration: 3000,
        });
        
        navigate('/admin');
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
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-subtle p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-imperio-navy mb-6 text-center">
          Admin - Acesso Restrito
        </h1>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle size={18} className="text-red-500 mr-2 mt-0.5" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email administrativo"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-imperio-navy hover:bg-imperio-light-navy text-white py-6"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                <span>Processando...</span>
              </div>
            ) : 'Entrar'}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Credenciais de teste: admin@exemplo.com / admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
