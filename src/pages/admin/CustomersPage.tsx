
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { CustomersList } from '@/components/admin/customers/CustomersList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus } from 'lucide-react';
import { CustomerDialog } from '@/components/admin/customers/CustomerDialog';

export const CustomersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Clientes</h1>
          
          <Button 
            className="flex items-center gap-1"
            onClick={() => setIsCustomerDialogOpen(true)}
          >
            <UserPlus size={18} />
            <span>Adicionar Cliente</span>
          </Button>
        </div>
        
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar clientes por nome, email ou telefone..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <CustomersList searchQuery={searchQuery} />
        
        {isCustomerDialogOpen && (
          <CustomerDialog 
            isOpen={isCustomerDialogOpen}
            onClose={() => setIsCustomerDialogOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};
