
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Mail, 
  Phone, 
  ShoppingBag, 
  UserPlus 
} from 'lucide-react';

interface Customer {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  pedidos: number;
  valorTotal: number;
  ultimaCompra: string;
  tipo: 'novo' | 'recorrente' | 'vip';
}

export const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for demonstration
  const customers: Customer[] = [
    { id: 'CLI001', nome: 'João Silva', email: 'joao.silva@email.com', telefone: '(11) 99999-1111', pedidos: 5, valorTotal: 1245.80, ultimaCompra: '15/06/2023', tipo: 'recorrente' },
    { id: 'CLI002', nome: 'Maria Oliveira', email: 'maria.oliveira@email.com', telefone: '(11) 99999-2222', pedidos: 8, valorTotal: 2360.50, ultimaCompra: '18/06/2023', tipo: 'vip' },
    { id: 'CLI003', nome: 'Pedro Santos', email: 'pedro.santos@email.com', telefone: '(21) 99999-3333', pedidos: 2, valorTotal: 495.90, ultimaCompra: '10/06/2023', tipo: 'recorrente' },
    { id: 'CLI004', nome: 'Ana Souza', email: 'ana.souza@email.com', telefone: '(21) 99999-4444', pedidos: 1, valorTotal: 189.90, ultimaCompra: '05/06/2023', tipo: 'novo' },
    { id: 'CLI005', nome: 'Lucas Ferreira', email: 'lucas.ferreira@email.com', telefone: '(31) 99999-5555', pedidos: 4, valorTotal: 978.60, ultimaCompra: '12/06/2023', tipo: 'recorrente' },
    { id: 'CLI006', nome: 'Carla Vieira', email: 'carla.vieira@email.com', telefone: '(31) 99999-6666', pedidos: 7, valorTotal: 1876.30, ultimaCompra: '17/06/2023', tipo: 'vip' },
    { id: 'CLI007', nome: 'Rafael Melo', email: 'rafael.melo@email.com', telefone: '(41) 99999-7777', pedidos: 3, valorTotal: 687.40, ultimaCompra: '09/06/2023', tipo: 'recorrente' },
    { id: 'CLI008', nome: 'Julia Costa', email: 'julia.costa@email.com', telefone: '(41) 99999-8888', pedidos: 1, valorTotal: 249.90, ultimaCompra: '04/06/2023', tipo: 'novo' },
    { id: 'CLI009', nome: 'Marcos Silva', email: 'marcos.silva@email.com', telefone: '(51) 99999-9999', pedidos: 6, valorTotal: 1545.70, ultimaCompra: '16/06/2023', tipo: 'vip' },
    { id: 'CLI010', nome: 'Fernanda Alves', email: 'fernanda.alves@email.com', telefone: '(51) 99999-0000', pedidos: 2, valorTotal: 435.80, ultimaCompra: '08/06/2023', tipo: 'recorrente' },
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const getCustomerTypeBadge = (tipo: 'novo' | 'recorrente' | 'vip') => {
    switch(tipo) {
      case 'novo':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Novo</Badge>;
      case 'recorrente':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Recorrente</Badge>;
      case 'vip':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">VIP</Badge>;
      default:
        return null;
    }
  };
  
  const filteredCustomers = customers.filter(customer => {
    return customer.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.telefone.includes(searchTerm);
  });
  
  return (
    <AdminLayout>
      <div className="py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <Button>
            <UserPlus size={18} className="mr-2" />
            Novo Cliente
          </Button>
        </div>
        
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gerenciar Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text"
                  placeholder="Buscar clientes..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Pedidos</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.nome}</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail size={14} className="mr-1 text-gray-500" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone size={14} className="mr-1 text-gray-500" />
                            <span>{customer.telefone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ShoppingBag size={16} className="text-imperio-navy mr-2" />
                          <span>{customer.pedidos}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(customer.valorTotal)}</TableCell>
                      <TableCell>{customer.ultimaCompra}</TableCell>
                      <TableCell>{getCustomerTypeBadge(customer.tipo)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Eye size={16} className="mr-2" />
                              <span>Ver Detalhes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <ShoppingBag size={16} className="mr-2" />
                              <span>Ver Pedidos</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Mail size={16} className="mr-2" />
                              <span>Enviar Email</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
