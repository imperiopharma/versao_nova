
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
import { Input } from "@/components/ui/input";
import { 
  Edit, 
  MoreVertical, 
  Trash2, 
  Search,
  Image,
  MessageSquare
} from "lucide-react";
import { BrandDialog } from './BrandDialog';

// Dados de exemplo para desenvolvimento
const mockBrands = [
  { 
    id: 1, 
    name: 'Marca X', 
    slug: 'marca-x', 
    logoUrl: 'https://placehold.co/100x100?text=X',
    description: 'Descrição da Marca X',
    productsCount: 24,
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Marca Y', 
    slug: 'marca-y', 
    logoUrl: 'https://placehold.co/100x100?text=Y',
    description: 'Descrição da Marca Y',
    productsCount: 18,
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Marca Z', 
    slug: 'marca-z', 
    logoUrl: 'https://placehold.co/100x100?text=Z',
    description: 'Descrição da Marca Z',
    productsCount: 12,
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Marca W', 
    slug: 'marca-w', 
    logoUrl: 'https://placehold.co/100x100?text=W',
    description: 'Descrição da Marca W',
    productsCount: 0,
    status: 'inactive'
  },
];

export const BrandsList: React.FC = () => {
  const [brands, setBrands] = useState(mockBrands);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
  
  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand);
    setIsBrandDialogOpen(true);
  };
  
  const handleDeleteBrand = (brandId: number) => {
    // Na implementação real, aqui seria uma chamada à API
    setBrands(brands.filter(brand => brand.id !== brandId));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar marcas..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-center">Produtos</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhuma marca encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredBrands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                      <img 
                        src={brand.logoUrl} 
                        alt={brand.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{brand.description}</TableCell>
                  <TableCell className="text-center">{brand.productsCount}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      brand.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {brand.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditBrand(brand)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar Marca
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Image className="h-4 w-4 mr-2" />
                            Alterar Logo
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Ver Produtos
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteBrand(brand.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir Marca
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
      
      {isBrandDialogOpen && (
        <BrandDialog 
          brand={selectedBrand}
          isOpen={isBrandDialogOpen}
          onClose={() => {
            setIsBrandDialogOpen(false);
            setSelectedBrand(null);
          }}
        />
      )}
    </div>
  );
};
