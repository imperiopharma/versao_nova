
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const AdminLogout: React.FC = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    localStorage.removeItem('adminLoggedIn');
    
    toast({
      title: 'Logout realizado',
      description: 'Você saiu do painel administrativo com sucesso.',
    });
  }, [toast]);
  
  return <Navigate to="/admin/login" replace />;
};
