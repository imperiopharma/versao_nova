
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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface ProductsTableProps {
  loading: boolean;
  filteredProducts: any[];
  formatCurrency: (value: number) => string;
  handleEditProduct: (product: any) => void;
  handleDeleteClick: (productId: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  loading,
  filteredProducts,
  formatCurrency,
  handleEditProduct,
  handleDeleteClick,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  return (
    <div className="w-full">
      <div className="rounded-md border overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">SKU</TableHead>
                <TableHead className="min-w-[150px]">Nome</TableHead>
                <TableHead className="min-w-[100px] hidden md:table-cell">Marca</TableHead>
                <TableHead className="min-w-[100px] hidden md:table-cell">Categoria</TableHead>
                <TableHead className="text-right min-w-[100px] hidden md:table-cell">Preço de Custo</TableHead>
                <TableHead className="text-right min-w-[100px]">Preço</TableHead>
                <TableHead className="text-center w-[80px] hidden md:table-cell">Estoque</TableHead>
                <TableHead className="text-center w-[80px]">Status</TableHead>
                <TableHead className="text-center w-[60px]">Ações</TableHead>
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
      
      {!loading && filteredProducts.length > 0 && totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={page === currentPage}
                    onClick={() => onPageChange?.(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
