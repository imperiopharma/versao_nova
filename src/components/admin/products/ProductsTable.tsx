
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
    <div className="w-full overflow-hidden rounded-md border">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">SKU</TableHead>
              <TableHead className="min-w-[180px]">Nome</TableHead>
              <TableHead className="min-w-[120px]">Marca</TableHead>
              <TableHead className="min-w-[120px]">Categoria</TableHead>
              <TableHead className="text-right min-w-[120px]">Preço de Custo</TableHead>
              <TableHead className="text-right min-w-[120px]">Preço de Venda</TableHead>
              <TableHead className="text-center w-[80px]">Estoque</TableHead>
              <TableHead className="text-center w-[80px]">Status</TableHead>
              <TableHead className="text-center w-[100px]">Ações</TableHead>
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
    </div>
  );
};
