
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
  );
};
