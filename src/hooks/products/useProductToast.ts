
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useProductToast() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
    handleError,
    showSuccessToast
  };
}
