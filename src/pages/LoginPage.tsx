
import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ChevronLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPath = searchParams.get('next') || '/';
  
  const { signIn, signUp, error: authError, loading } = useAuth();
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
    }
    
    if (!isLogin) {
      if (!name.trim()) {
        newErrors.name = 'Nome é obrigatório';
      }
      
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'As senhas não conferem';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isLogin) {
        await signIn(email, password);
        
        if (!authError) {
          navigate(nextPath);
        }
      } else {
        await signUp(email, password, name);
        
        if (!authError) {
          // Após o cadastro bem-sucedido, redirecione diretamente
          // Como não há verificação de email, podemos fazer login diretamente
          await signIn(email, password);
          if (!authError) {
            navigate(nextPath);
          }
        }
      }
    } catch (error) {
      console.error('Erro de autenticação:', error);
    }
  };
  
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ChevronLeft size={18} />
                <span>Voltar</span>
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-subtle p-8">
            <h1 className="text-2xl font-semibold text-imperio-navy mb-6">
              {isLogin ? 'Acesse sua Conta' : 'Criar nova conta'}
            </h1>
            
            {authError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle size={18} className="text-imperio-red mr-2 mt-0.5" />
                <p className="text-imperio-red text-sm">{authError}</p>
              </div>
            )}
            
            {errors.form && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle size={18} className="text-imperio-red mr-2 mt-0.5" />
                <p className="text-imperio-red text-sm">{errors.form}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Digite seu nome completo"
                      className={`pl-10 ${errors.name ? 'border-imperio-red' : ''}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-imperio-red text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              )}
              
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
                    placeholder="Digite seu email"
                    className={`pl-10 ${errors.email ? 'border-imperio-red' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-imperio-red text-sm mt-1">{errors.email}</p>
                )}
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
                    className={`pl-10 ${errors.password ? 'border-imperio-red' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                {errors.password && (
                  <p className="text-imperio-red text-sm mt-1">{errors.password}</p>
                )}
              </div>
              
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      className={`pl-10 ${errors.confirmPassword ? 'border-imperio-red' : ''}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-imperio-red text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}
              
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
                ) : (
                  isLogin ? 'Entrar' : 'Cadastrar'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-imperio-navy hover:underline text-sm font-medium focus:outline-none"
                disabled={loading}
              >
                {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
