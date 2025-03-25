
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
import { 
  Edit, 
  MoreVertical, 
  Trash2, 
  Eye, 
  FileImage,
  AlertTriangle
} from "lucide-react";
import { ProductDialog } from './ProductDialog';
import { useDataList } from '@/hooks/useDataList';
import { SearchBar } from '../common/SearchBar';
import { useProductStore } from '@/hooks/useProductStore';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from 'react-router-dom';

export const ProductsList: React.FC = () => {
  const { products, loading, deleteProduct } = useProductStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const {
    filteredData: filteredProducts,
    searchQuery,
    selectedItem: selectedProduct,
    isDialogOpen: isProductDialogOpen,
    handleEditItem: handleEditProduct,
    handleSearchChange,
    setIsDialogOpen: setIsProductDialogOpen,
    setSelectedItem: setSelectedProduct
  } = useDataList({
    initialData: products,
    searchFields: ['name', 'brand', 'sku']
  });
  
  // Atualizar os dados filtrados quando products mudar
  useEffect(() => {
    // Atualizar o initialData do useDataList
    // Isso é necessário porque o hook useDataList não atualiza automaticamente
    // quando o initialData muda
    handleSearchChange({ target: { value: searchQuery } } as React.ChangeEvent<HTMLInputElement>);
  }, [products]);

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <SearchBar 
        placeholder="Buscar produtos..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Preço de Custo</TableHead>
              <TableHead className="text-right">Preço de Venda</TableHead>
              <TableHead className="text-center">Estoque</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Carregando produtos...
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.costPrice)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.sellingPrice)}</TableCell>
                  <TableCell className="text-center">
                    <span className={`${
                      product.stock === 0 
                        ? 'text-red-500' 
                        : product.stock < 10 
                          ? 'text-amber-500' 
                          : 'text-green-500'
                    }`}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : product.status === 'out_of_stock' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'active' 
                        ? 'Ativo' 
                        : product.status === 'out_of_stock' 
                          ? 'Sem Estoque' 
                          : 'Inativo'}
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
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar Produto
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileImage className="h-4 w-4 mr-2" />
                            Gerenciar Imagens
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/produto/${product.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar na Loja
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteClick(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir Produto
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
      
      {isProductDialogOpen && (
        <ProductDialog 
          product={selectedProduct}
          isOpen={isProductDialogOpen}
          onClose={() => {
            setIsProductDialogOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
