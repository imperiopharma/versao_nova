
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthContextType, AuthState } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  session: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { toast } = useToast();

  useEffect(() => {
    // Configurar o ouvinte de alteração de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setState(current => ({
          ...current,
          user: session?.user ?? null,
          session,
          loading: false,
        }));

        if (event === 'SIGNED_IN') {
          toast({
            title: 'Login realizado com sucesso',
            description: 'Seja bem-vindo à Império Pharma!',
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: 'Logout realizado',
            description: 'Você saiu da sua conta com sucesso.',
          });
        }
      }
    );

    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(current => ({
        ...current,
        user: session?.user ?? null,
        session,
        loading: false,
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setState(current => ({ ...current, loading: true, error: null }));
      
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error('Erro de login:', error.message);
      setState(current => ({ 
        ...current, 
        error: error.message === 'Invalid login credentials' 
          ? 'Credenciais inválidas. Verifique seu email e senha.' 
          : `Erro ao fazer login: ${error.message}`,
        loading: false 
      }));
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setState(current => ({ ...current, loading: true, error: null }));
      
      // Configurar opções para não exigir verificação de e-mail
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name
          },
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Sua conta foi criada. Você já pode fazer login!',
      });
      
    } catch (error: any) {
      console.error('Erro de cadastro:', error.message);
      setState(current => ({ 
        ...current, 
        error: `Erro ao criar conta: ${error.message}`,
        loading: false 
      }));
    }
  };

  const signOut = async () => {
    try {
      setState(current => ({ ...current, loading: true }));
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error.message);
      toast({
        title: 'Erro ao fazer logout',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resetError = () => {
    setState(current => ({ ...current, error: null }));
  };

  const value = {
    ...state,
    signIn,
    signUp,
    signOut,
    resetError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
