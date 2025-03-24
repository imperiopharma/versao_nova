import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';

export const CustomersPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Clientes</h1>
        
        {/* Your customers page content will go here */}
        <div className="p-10 bg-white rounded-lg shadow text-center">
          <p className="text-gray-500">
            Conteúdo da página de clientes será implementado aqui
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};
