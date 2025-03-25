
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const AdminAuthGuard: React.FC = () => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: 'Acesso restrito',
        description: 'Faça login para acessar o painel administrativo.',
        variant: 'destructive',
      });
    }
  }, [isLoggedIn, toast]);
  
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Outlet />;
};
