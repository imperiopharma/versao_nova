
import React from 'react';
import {
  TableRow,
  TableCell,
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
import { Link } from 'react-router-dom';

interface ProductTableRowProps {
  product: any;
  formatCurrency: (value: number) => string;
  handleEditProduct: (product: any) => void;
  handleDeleteClick: (productId: string) => void;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  formatCurrency,
  handleEditProduct,
  handleDeleteClick
}) => {
  return (
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
  );
};
