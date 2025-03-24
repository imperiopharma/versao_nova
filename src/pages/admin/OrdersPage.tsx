
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical, 
  Eye, 
  FileText, 
  Truck, 
  Ban,
  CheckCircle2,
  Clock 
} from 'lucide-react';

type OrderStatus = 'pendente' | 'processando' | 'enviado' | 'entregue' | 'cancelado';

interface Order {
  id: string;
  cliente: string;
  data: string;
  valor: number;
  status: OrderStatus;
  produtos: number;
  pagamento: string;
}

export const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Dummy data for demonstration
  const orders: Order[] = [
    { id: '#12345', cliente: 'João Silva', data: '15/06/2023', valor: 289.90, status: 'entregue', produtos: 2, pagamento: 'PIX' },
    { id: '#12346', cliente: 'Maria Oliveira', data: '16/06/2023', valor: 435.50, status: 'enviado', produtos: 3, pagamento: 'PIX' },
    { id: '#12347', cliente: 'Pedro Santos', data: '17/06/2023', valor: 189.99, status: 'processando', produtos: 1, pagamento: 'PIX' },
    { id: '#12348', cliente: 'Ana Souza', data: '17/06/2023', valor: 649.90, status: 'pendente', produtos: 4, pagamento: 'PIX' },
    { id: '#12349', cliente: 'Lucas Ferreira', data: '18/06/2023', valor: 329.90, status: 'entregue', produtos: 2, pagamento: 'PIX' },
    { id: '#12350', cliente: 'Carla Vieira', data: '18/06/2023', valor: 189.90, status: 'cancelado', produtos: 1, pagamento: 'PIX' },
    { id: '#12351', cliente: 'Rafael Melo', data: '19/06/2023', valor: 412.75, status: 'processando', produtos: 3, pagamento: 'PIX' },
    { id: '#12352', cliente: 'Julia Costa', data: '19/06/2023', valor: 567.20, status: 'enviado', produtos: 4, pagamento: 'PIX' },
    { id: '#12353', cliente: 'Marcos Silva', data: '20/06/2023', valor: 298.50, status: 'pendente', produtos: 2, pagamento: 'PIX' },
    { id: '#12354', cliente: 'Fernanda Alves', data: '20/06/2023', valor: 378.90, status: 'entregue', produtos: 3, pagamento: 'PIX' },
  ];
  
  const getStatusBadge = (status: OrderStatus) => {
    switch(status) {
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      case 'processando':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Processando</Badge>;
      case 'enviado':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Enviado</Badge>;
      case 'entregue':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Entregue</Badge>;
      case 'cancelado':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelado</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'pendente':
        return <Clock size={16} className="text-yellow-600" />;
      case 'processando':
        return <Clock size={16} className="text-blue-600" />;
      case 'enviado':
        return <Truck size={16} className="text-purple-600" />;
      case 'entregue':
        return <CheckCircle2 size={16} className="text-green-600" />;
      case 'cancelado':
        return <Ban size={16} className="text-red-600" />;
      default:
        return null;
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <AdminLayout>
      <div className="py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <Button>Novo Pedido</Button>
        </div>
        
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gerenciar Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text"
                  placeholder="Buscar pedidos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Filter size={18} className="text-gray-400" />
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="processando">Processando</SelectItem>
                    <SelectItem value="enviado">Enviado</SelectItem>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.cliente}</TableCell>
                      <TableCell>{order.data}</TableCell>
                      <TableCell>{formatCurrency(order.valor)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span>{getStatusBadge(order.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{order.pagamento}</TableCell>
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
                              <FileText size={16} className="mr-2" />
                              <span>Gerar Nota</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Truck size={16} className="mr-2" />
                              <span>Atualizar Status</span>
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
