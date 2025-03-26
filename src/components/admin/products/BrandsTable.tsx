
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

interface BrandsTableProps {
  brands: any[];
  onEdit: (brand: any) => void;
  onDelete: (brandId: string) => void;
}

export const BrandsTable: React.FC<BrandsTableProps> = ({
  brands,
  onEdit,
  onDelete
}) => {
  return (
    <div className="w-full overflow-hidden rounded-md border">
      <div className="w-full overflow-x-auto sm:overflow-x-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Logo</TableHead>
              <TableHead className="min-w-[150px]">Nome</TableHead>
              <TableHead className="min-w-[200px] hidden sm:table-cell">Descrição</TableHead>
              <TableHead className="text-center w-[100px] hidden sm:table-cell">Categoria</TableHead>
              <TableHead className="text-center w-[80px]">Status</TableHead>
              <TableHead className="text-center w-[70px]">Ações</TableHead>
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
    </div>
  );
};
