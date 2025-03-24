
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
  MoreVertical, 
  Edit, 
  Trash2, 
  Plus, 
  PackageCheck, 
  PackageX 
} from 'lucide-react';

interface Product {
  id: string;
  nome: string;
  marca: string;
  preco: number;
  estoque: number;
  categoria: string;
  status: 'ativo' | 'inativo';
}

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Dummy data for demonstration
  const products: Product[] = [
    { id: 'PROD001', nome: 'Trembolona 100mg', marca: 'Marca Premium', preco: 189.90, estoque: 45, categoria: 'Premium', status: 'ativo' },
    { id: 'PROD002', nome: 'Stanozolol 50mg', marca: 'Marca Importada', preco: 159.90, estoque: 32, categoria: 'Importada', status: 'ativo' },
    { id: 'PROD003', nome: 'Oxandrolona 15mg', marca: 'Marca Premium', preco: 119.90, estoque: 0, categoria: 'Premium', status: 'inativo' },
    { id: 'PROD004', nome: 'Testosterona 200mg', marca: 'Marca Nacional', preco: 99.90, estoque: 78, categoria: 'Nacional', status: 'ativo' },
    { id: 'PROD005', nome: 'GH 10UI', marca: 'Marca Importada', preco: 249.90, estoque: 15, categoria: 'Importada', status: 'ativo' },
    { id: 'PROD006', nome: 'Durateston 250mg', marca: 'Marca Nacional', preco: 89.90, estoque: 50, categoria: 'Nacional', status: 'ativo' },
    { id: 'PROD007', nome: 'Winstrol 50mg', marca: 'Marca Importada', preco: 179.90, estoque: 0, categoria: 'Importada', status: 'inativo' },
    { id: 'PROD008', nome: 'Deca Durabolin 100mg', marca: 'Marca Premium', preco: 199.90, estoque: 25, categoria: 'Premium', status: 'ativo' },
    { id: 'PROD009', nome: 'Dianabol 20mg', marca: 'Marca Importada', preco: 149.90, estoque: 40, categoria: 'Importada', status: 'ativo' },
    { id: 'PROD010', nome: 'Masteron 100mg', marca: 'Marca Nacional', preco: 129.90, estoque: 22, categoria: 'Nacional', status: 'ativo' },
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.categoria === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <AdminLayout>
      <div className="py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Produtos</h1>
          <Button>
            <Plus size={18} className="mr-2" />
            Novo Produto
          </Button>
        </div>
        
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gerenciar Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text"
                  placeholder="Buscar produtos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Filter size={18} className="text-gray-400" />
                <Select 
                  value={categoryFilter} 
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Importada">Importada</SelectItem>
                    <SelectItem value="Nacional">Nacional</SelectItem>
                    <SelectItem value="Diversos">Diversos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.nome}</TableCell>
                      <TableCell>{product.marca}</TableCell>
                      <TableCell>{formatCurrency(product.preco)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {product.estoque > 0 ? (
                            <div className="flex items-center">
                              <PackageCheck size={16} className="text-green-600 mr-1" />
                              <span>{product.estoque} unidades</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <PackageX size={16} className="text-red-600 mr-1" />
                              <span>Sem estoque</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{product.categoria}</TableCell>
                      <TableCell>
                        {product.status === 'ativo' ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Ativo</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Inativo</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Edit size={16} className="mr-2" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-red-600">
                              <Trash2 size={16} className="mr-2" />
                              <span>Excluir</span>
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
