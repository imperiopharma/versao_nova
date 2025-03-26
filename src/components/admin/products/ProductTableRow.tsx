
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
  // Verificação de segurança para evitar erros se o produto for inválido
  if (!product || !product.id) {
    console.error("Produto inválido na linha da tabela:", product);
    return null;
  }
  
  // Valores seguros para exibição
  const sku = product.sku || 'N/D';
  const name = product.name || 'Sem nome';
  const brand = product.brand || 'N/D';
  const category = product.category || 'N/D';
  const costPrice = typeof product.costPrice === 'number' ? product.costPrice : 0;
  const sellingPrice = typeof product.sellingPrice === 'number' ? product.sellingPrice : 0;
  const status = product.status || 'inactive';
  
  return (
    <TableRow key={product.id}>
      <TableCell className="font-medium">{sku}</TableCell>
      <TableCell>
        <div>
          <p className="truncate max-w-[120px] font-medium">{name}</p>
          <p className="text-xs text-muted-foreground md:hidden">
            {formatCurrency(sellingPrice)}
          </p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{brand}</TableCell>
      <TableCell className="hidden md:table-cell">{category}</TableCell>
      <TableCell className="text-right hidden md:table-cell">{formatCurrency(costPrice)}</TableCell>
      <TableCell className="text-right hidden md:table-cell">{formatCurrency(sellingPrice)}</TableCell>
      <TableCell className="text-center hidden md:table-cell">
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : status === 'out_of_stock' 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-red-100 text-red-800'
        }`}>
          {status === 'active' 
            ? 'Ativo' 
            : status === 'out_of_stock' 
              ? 'Sem Estoque' 
              : 'Inativo'}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : status === 'out_of_stock' 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-red-100 text-red-800'
        }`}>
          {status === 'active' 
            ? 'Ativo' 
            : status === 'out_of_stock' 
              ? 'Sem Est.' 
              : 'Inativo'}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
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
