
import React, { useState } from 'react';
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

// Dados de exemplo para desenvolvimento
const mockCustomers = [
  { 
    id: 1, 
    name: 'João Silva', 
    email: 'joao.silva@email.com', 
    phone: '(11) 99999-1234', 
    orders: 12,
    totalSpent: 3450.80,
    lastOrder: '2023-06-15',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Maria Santos', 
    email: 'maria.santos@email.com', 
    phone: '(11) 98888-4321', 
    orders: 8,
    totalSpent: 2180.45,
    lastOrder: '2023-06-10',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Carlos Oliveira', 
    email: 'carlos.oliveira@email.com', 
    phone: '(21) 97777-5678', 
    orders: 3,
    totalSpent: 750.20,
    lastOrder: '2023-06-05',
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Ana Souza', 
    email: 'ana.souza@email.com', 
    phone: '(21) 96666-8765', 
    orders: 5,
    totalSpent: 1250.75,
    lastOrder: '2023-05-28',
    status: 'active'
  },
  { 
    id: 5, 
    name: 'Pedro Costa', 
    email: 'pedro.costa@email.com', 
    phone: '(31) 95555-4567', 
    orders: 0,
    totalSpent: 0,
    lastOrder: null,
    status: 'inactive'
  },
];

interface CustomersListProps {
  searchQuery: string;
}

export const CustomersList: React.FC<CustomersListProps> = ({ searchQuery }) => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  
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
  
  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };
  
  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };
  
  const handleDeleteCustomer = (customerId: number) => {
    // Na implementação real, aqui seria uma chamada à API
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
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
            {filteredCustomers.length === 0 ? (
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
                  <TableCell className="text-center">{customer.orders}</TableCell>
                  <TableCell className="text-right">{formatCurrency(customer.totalSpent)}</TableCell>
                  <TableCell>{formatDate(customer.lastOrder)}</TableCell>
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
                          <DropdownMenuItem>
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
