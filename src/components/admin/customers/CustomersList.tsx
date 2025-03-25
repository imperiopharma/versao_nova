
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  MoreVertical, 
  Edit, 
  ShoppingBag, 
  Trash2, 
  Send, 
  UserCog 
} from "lucide-react";
import { CustomerDialog } from './CustomerDialog';
import { CustomerDetailsDialog } from './CustomerDetailsDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string | null;
  status: 'active' | 'inactive';
}

interface CustomersListProps {
  searchQuery: string;
}

export const CustomersList: React.FC<CustomersListProps> = ({ searchQuery }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();
  
  // Carregar clientes do Supabase
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        setCustomers(data || []);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os clientes.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, [toast]);
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  // Formatação de data
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };
  
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };
  
  const handleDeleteCustomer = async (customerId: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId);
        
      if (error) throw error;
      
      setCustomers(customers.filter(customer => customer.id !== customerId));
      
      toast({
        title: 'Cliente excluído',
        description: 'O cliente foi excluído com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o cliente.',
        variant: 'destructive',
      });
    }
  };
  
  const handleChangeStatus = async (customerId: string, newStatus: 'active' | 'inactive') => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', customerId);
        
      if (error) throw error;
      
      setCustomers(customers.map(customer => 
        customer.id === customerId 
          ? { ...customer, status: newStatus } 
          : customer
      ));
      
      toast({
        title: 'Status atualizado',
        description: `O cliente agora está ${newStatus === 'active' ? 'ativo' : 'inativo'}.`,
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do cliente.',
        variant: 'destructive',
      });
    }
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone?.includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead className="text-center">Pedidos</TableHead>
              <TableHead className="text-right">Total Gasto</TableHead>
              <TableHead>Último Pedido</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Carregando clientes...
                </TableCell>
              </TableRow>
            ) : filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div>
                      <div>{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{customer.total_orders || 0}</TableCell>
                  <TableCell className="text-right">{formatCurrency(customer.total_spent || 0)}</TableCell>
                  <TableCell>{formatDate(customer.last_order_date)}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`${
                        customer.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      } border-none`}
                    >
                      {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver cliente</span>
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Mais ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar Cliente
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Ver Pedidos
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar E-mail
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => 
                            handleChangeStatus(customer.id, customer.status === 'active' ? 'inactive' : 'active')
                          }>
                            <UserCog className="h-4 w-4 mr-2" />
                            {customer.status === 'active' 
                              ? 'Desativar Conta' 
                              : 'Ativar Conta'
                            }
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir Cliente
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {isEditDialogOpen && selectedCustomer && (
        <CustomerDialog 
          customer={selectedCustomer}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedCustomer(null);
          }}
        />
      )}
      
      {isDetailsDialogOpen && selectedCustomer && (
        <CustomerDetailsDialog 
          customer={selectedCustomer}
          isOpen={isDetailsDialogOpen}
          onClose={() => {
            setIsDetailsDialogOpen(false);
            setSelectedCustomer(null);
          }}
          onEdit={() => {
            setIsDetailsDialogOpen(false);
            setIsEditDialogOpen(true);
          }}
        />
      )}
    </div>
  );
};
