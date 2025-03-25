
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useProductCommon() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Função para formatar data para Supabase
  const formatDateForSupabase = () => {
    return new Date().toISOString();
  };

  // Função para lidar com erros
  const handleError = (error: any, message: string) => {
    console.error(`${message}:`, error);
    toast({
      title: 'Erro',
      description: message,
      variant: 'destructive',
    });
  };

  // Função para exibir notificação de sucesso
  const showSuccessToast = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  return {
    loading,
    setLoading,
    formatDateForSupabase,
    handleError,
    showSuccessToast
  };
}
