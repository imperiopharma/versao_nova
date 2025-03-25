
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

// Shared state and utility functions for product-related hooks
export function useProductCommon() {
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Common error handling function
  const handleError = (error: any, errorMessage: string) => {
    console.error(errorMessage, error);
    toast({
      title: "Erro",
      description: `${errorMessage}. Tente novamente mais tarde.`,
      variant: "destructive"
    });
    throw error;
  };

  // Helper to convert Date to ISO string for Supabase
  const formatDateForSupabase = () => {
    return new Date().toISOString();
  };

  // Common success toast
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
