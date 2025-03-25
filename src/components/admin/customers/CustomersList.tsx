
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/customer';
import { CustomerDialog } from './CustomerDialog';

export const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showEditCustomerDialog, setShowEditCustomerDialog] = useState(false);
  const { toast } = useToast();

  // Buscar clientes do Supabase
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*');

        if (error) throw error;

        if (data) {
          // Mapear os dados para o formato esperado pelo componente
          const formattedCustomers: Customer[] = data.map(customer => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone || '',
            status: customer.status as 'active' | 'inactive',
            total_spent: customer.total_spent || 0,
            total_orders: customer.total_orders || 0,
            last_order_date: customer.last_order_date,
            created_at: customer.created_at,
            updated_at: customer.updated_at
          }));
          
          setCustomers(formattedCustomers);
          setFilteredCustomers(formattedCustomers);
        }
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os clientes.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [toast]);

  // Função para filtrar clientes com base na pesquisa e status
  useEffect(() => {
    let result = [...customers];
    
    // Filtrar por status
    if (activeFilter !== 'all') {
      result = result.filter(customer => customer.status === activeFilter);
    }
    
    // Filtrar por termo de pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(query) || 
        customer.email.toLowerCase().includes(query) ||
        (customer.phone && customer.phone.includes(query))
      );
    }
    
    setFilteredCustomers(result);
  }, [customers, searchQuery, activeFilter]);

  // Função para deletar um cliente
  const handleDeleteCustomer = async (customerId: string) => {
    if (!confirm('Tem certeza de que deseja excluir este cliente?')) return;
    
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId);
        
      if (error) throw error;
      
      // Atualizar estado local removendo o cliente excluído
      setCustomers(prev => prev.filter(c => c.id !== customerId));
      
      toast({
        title: 'Cliente excluído',
        description: 'O cliente foi excluído com sucesso.'
      });
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o cliente.',
        variant: 'destructive'
      });
    }
  };

  // Função para editar um cliente
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowEditCustomerDialog(true);
  };

  // Componente de tabela para clientes
  const CustomerTable = ({ customers }: { customers: Customer[] }) => {
    if (loading) {
      return (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      );
    }

    if (customers.length === 0) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Nenhum cliente encontrado. Comece adicionando um novo cliente.
        </div>
      );
    }

    return (
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-semibold text-sm">Nome</th>
            <th className="text-left p-3 font-semibold text-sm">Email</th>
            <th className="text-left p-3 font-semibold text-sm">Telefone</th>
            <th className="text-left p-3 font-semibold text-sm">Status</th>
            <th className="text-right p-3 font-semibold text-sm">Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b hover:bg-muted/50">
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.email}</td>
              <td className="p-3">{customer.phone || '-'}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  customer.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="p-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleEditCustomer(customer)}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddCustomerDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <Card>
        <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="px-4 pt-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="inactive">Inativos</TabsTrigger>
          </TabsList>
          <CardContent className="p-0 pt-2">
            <CustomerTable customers={filteredCustomers} />
          </CardContent>
        </Tabs>
      </Card>

      {showAddCustomerDialog && (
        <CustomerDialog
          isOpen={showAddCustomerDialog}
          onClose={() => setShowAddCustomerDialog(false)}
        />
      )}

      {showEditCustomerDialog && selectedCustomer && (
        <CustomerDialog
          customer={selectedCustomer}
          isOpen={showEditCustomerDialog}
          onClose={() => {
            setShowEditCustomerDialog(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};
