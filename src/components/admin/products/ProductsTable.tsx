
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTableRow } from './ProductTableRow';

interface ProductsTableProps {
  loading: boolean;
  filteredProducts: any[];
  formatCurrency: (value: number) => string;
  handleEditProduct: (product: any) => void;
  handleDeleteClick: (productId: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  loading,
  filteredProducts,
  formatCurrency,
  handleEditProduct,
  handleDeleteClick
}) => {
  return (
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
              <ProductTableRow
                key={product.id}
                product={product}
                formatCurrency={formatCurrency}
                handleEditProduct={handleEditProduct}
                handleDeleteClick={handleDeleteClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
