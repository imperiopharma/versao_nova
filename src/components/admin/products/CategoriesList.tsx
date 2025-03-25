
import React, { useEffect } from 'react';
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
import { useProductStore } from '@/hooks/useProductStore';
import { DeleteProductDialog } from './DeleteProductDialog';

export const CategoriesList: React.FC = () => {
  const { categories, loading, fetchData, deleteCategory } = useProductStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = React.useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const {
    filteredData: filteredCategories,
    searchQuery,
    selectedItem: selectedCategory,
    isDialogOpen: isCategoryDialogOpen,
    handleEditItem: handleEditCategory,
    handleSearchChange,
    setIsDialogOpen: setIsCategoryDialogOpen,
    setSelectedItem: setSelectedCategory,
    setData
  } = useDataList({
    initialData: categories,
    searchFields: ['name', 'description']
  });

  // Atualizar os dados filtrados quando categories mudar
  useEffect(() => {
    setData(categories);
    // Atualizar o initialData do useDataList
    handleSearchChange({ target: { value: searchQuery } } as React.ChangeEvent<HTMLInputElement>);
  }, [categories, searchQuery]);

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete);
        setDeleteDialogOpen(false);
        setCategoryToDelete(null);
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
      }
    }
  };

  const handleCloseDialog = () => {
    setIsCategoryDialogOpen(false);
    setSelectedCategory(null);
    // Recarregar dados após fechar o diálogo
    fetchData();
  };

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
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Carregando categorias...
                </TableCell>
              </TableRow>
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{category.description}</TableCell>
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteClick(category.id)}
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
          onClose={handleCloseDialog}
        />
      )}
      
      <DeleteProductDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
