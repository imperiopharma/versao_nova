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
  Eye, 
  FileImage
} from "lucide-react";
import { ProductDialog } from './ProductDialog';
import { useDataList } from '@/hooks/useDataList';
import { SearchBar } from '../common/SearchBar';

// Dados de exemplo para desenvolvimento
const mockProducts = [
  { 
    id: 1, 
    name: 'Produto A', 
    brand: 'Marca X', 
    category: 'Categoria 1', 
    sku: 'SKU001', 
    costPrice: 45.0, 
    sellingPrice: 89.90, 
    stock: 25, 
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Produto B', 
    brand: 'Marca Y', 
    category: 'Categoria 2', 
    sku: 'SKU002', 
    costPrice: 68.0, 
    sellingPrice: 129.90, 
    stock: 12, 
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Produto C', 
    brand: 'Marca Z', 
    category: 'Categoria 1', 
    sku: 'SKU003', 
    costPrice: 23.50, 
    sellingPrice: 49.90, 
    stock: 37, 
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Produto D', 
    brand: 'Marca X', 
    category: 'Categoria 3', 
    sku: 'SKU004', 
    costPrice: 120.0, 
    sellingPrice: 239.90, 
    stock: 5, 
    status: 'out_of_stock'
  },
  { 
    id: 5, 
    name: 'Produto E', 
    brand: 'Marca Y', 
    category: 'Categoria 2', 
    sku: 'SKU005', 
    costPrice: 75.0, 
    sellingPrice: 149.90, 
    stock: 0, 
    status: 'inactive'
  },
];

export const ProductsList: React.FC = () => {
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
    handleDeleteItem: handleDeleteProduct,
    handleSearchChange,
    setIsDialogOpen: setIsProductDialogOpen,
    setSelectedItem: setSelectedProduct
  } = useDataList({
    initialData: mockProducts,
    searchFields: ['name', 'brand', 'sku']
  });

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
            {filteredProducts.length === 0 ? (
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
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar na Loja
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
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
    </div>
  );
};
