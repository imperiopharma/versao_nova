
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
import { 
  Edit, 
  MoreVertical, 
  Trash2, 
  Image,
  MessageSquare
} from "lucide-react";
import { BrandDialog } from './BrandDialog';
import { SearchBar } from '../common/SearchBar';
import { useProductStore } from '@/hooks/useProductStore';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export const BrandsList: React.FC = () => {
  const { brands } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<string | null>(null);
  const { updateBrand, addBrand } = useProductStore();

  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand);
    setIsBrandDialogOpen(true);
  };

  const handleDeleteBrand = (brandId: string) => {
    setBrandToDelete(brandId);
  };

  const confirmDeleteBrand = () => {
    // Implementação real de deleção seria aqui
    console.log("Brand deleted:", brandToDelete);
    setBrandToDelete(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBrands = brands.filter(brand => {
    const searchLower = searchQuery.toLowerCase();
    return (
      brand.name.toLowerCase().includes(searchLower) || 
      (brand.description && brand.description.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-4">
      <SearchBar 
        placeholder="Buscar marcas..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-center">Categoria</TableHead>
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
                        src={brand.logoUrl || 'https://placehold.co/100x100?text=Logo'} 
                        alt={brand.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{brand.description}</TableCell>
                  <TableCell className="text-center">{brand.category}</TableCell>
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

      <AlertDialog open={brandToDelete !== null} onOpenChange={() => setBrandToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta marca? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteBrand} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
