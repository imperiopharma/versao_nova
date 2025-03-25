
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

// Funções e estado compartilhados para hooks relacionados a produtos
export function useProductCommon() {
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Função comum para tratamento de erros
  const handleError = (error: any, errorMessage: string) => {
    console.error(errorMessage, error);
    toast({
      title: "Erro",
      description: `${errorMessage}. Tente novamente mais tarde.`,
      variant: "destructive"
    });
    throw error;
  };

  // Função auxiliar para converter Date para string ISO para o Supabase
  const formatDateForSupabase = () => {
    return new Date().toISOString();
  };

  // Toast de sucesso comum
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
    formatDateForSupabase,
    showSuccessToast
  };
}
