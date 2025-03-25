import React from 'react';
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
import { 
  Edit, 
  MoreVertical, 
  Trash2, 
  MessageSquare
} from "lucide-react";
import { CategoryDialog } from './CategoryDialog';
import { useDataList } from '@/hooks/useDataList';
import { SearchBar } from '../common/SearchBar';

// Dados de exemplo para desenvolvimento
const mockCategories = [
  { 
    id: 1, 
    name: 'Categoria 1', 
    slug: 'categoria-1', 
    description: 'Descrição da Categoria 1',
    productsCount: 15,
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Categoria 2', 
    slug: 'categoria-2', 
    description: 'Descrição da Categoria 2',
    productsCount: 8,
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Categoria 3', 
    slug: 'categoria-3', 
    description: 'Descrição da Categoria 3',
    productsCount: 12,
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Categoria 4', 
    slug: 'categoria-4', 
    description: 'Descrição da Categoria 4',
    productsCount: 0,
    status: 'inactive'
  },
];

export const CategoriesList: React.FC = () => {
  const {
    filteredData: filteredCategories,
    searchQuery,
    selectedItem: selectedCategory,
    isDialogOpen: isCategoryDialogOpen,
    handleEditItem: handleEditCategory,
    handleDeleteItem: handleDeleteCategory,
    handleSearchChange,
    setIsDialogOpen: setIsCategoryDialogOpen,
    setSelectedItem: setSelectedCategory
  } = useDataList({
    initialData: mockCategories,
    searchFields: ['name', 'description']
  });

  return (
    <div className="space-y-4">
      <SearchBar 
        placeholder="Buscar categorias..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-center">Produtos</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                  <TableCell className="text-center">{category.productsCount}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      category.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status === 'active' ? 'Ativo' : 'Inativo'}
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
                          <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar Categoria
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Ver Produtos
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir Categoria
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
      
      {isCategoryDialogOpen && (
        <CategoryDialog 
          category={selectedCategory}
          isOpen={isCategoryDialogOpen}
          onClose={() => {
            setIsCategoryDialogOpen(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
};
