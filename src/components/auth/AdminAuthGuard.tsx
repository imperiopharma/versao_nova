
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '@/services/authService';

interface AdminAuthGuardProps {
  children: ReactNode;
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const isAdmin = authService.isLoggedIn();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
