import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';

export const OrdersPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Pedidos</h1>
        
        {/* Your orders page content will go here */}
        <div className="p-10 bg-white rounded-lg shadow text-center">
          <p className="text-gray-500">
            Conteúdo da página de pedidos será implementado aqui
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};
