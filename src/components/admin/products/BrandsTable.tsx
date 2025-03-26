
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BrandItem } from './BrandItem';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from '@/components/ui/scroll-area';

interface BrandsTableProps {
  brands: any[];
  onEdit: (brand: any) => void;
  onDelete: (brandId: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const BrandsTable: React.FC<BrandsTableProps> = ({
  brands,
  onEdit,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  return (
    <div className="w-full">
      <div className="rounded-md border overflow-hidden">
        <ScrollArea className="w-full max-w-full">
          <div className="min-w-full w-max md:w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Logo</TableHead>
                  <TableHead className="min-w-[120px]">Nome</TableHead>
                  <TableHead className="min-w-[200px] hidden md:table-cell">Descrição</TableHead>
                  <TableHead className="text-center w-[100px] hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="text-center w-[80px]">Status</TableHead>
                  <TableHead className="text-center w-[60px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhuma marca encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  brands.map((brand) => (
                    <BrandItem 
                      key={brand.id} 
                      brand={brand} 
                      onEdit={onEdit} 
                      onDelete={onDelete} 
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
      
      {brands.length > 0 && totalPages > 1 && (
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
                <PaginationItem key={page} className="hidden sm:inline-block">
                  <PaginationLink 
                    isActive={page === currentPage}
                    onClick={() => onPageChange?.(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem className="sm:hidden">
                <span className="text-sm px-2">
                  {currentPage} / {totalPages}
                </span>
              </PaginationItem>
              
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
