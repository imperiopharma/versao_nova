
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
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
  Image,
  MessageSquare,
} from "lucide-react";

interface BrandItemProps {
  brand: any;
  onEdit: (brand: any) => void;
  onDelete: (brandId: string) => void;
}

export const BrandItem: React.FC<BrandItemProps> = ({ 
  brand, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TableRow>
      <TableCell>
        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
          <img 
            src={brand.logoUrl || 'https://placehold.co/100x100?text=Logo'} 
            alt={brand.name} 
            className="h-full w-full object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">{brand.name}</TableCell>
      <TableCell className="max-w-xs truncate">{brand.description}</TableCell>
      <TableCell className="text-center">{brand.category}</TableCell>
      <TableCell className="text-center">
        <span className={`px-2 py-1 rounded-full text-xs ${
          brand.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {brand.status === 'active' ? 'Ativo' : 'Inativo'}
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
              <DropdownMenuItem onClick={() => onEdit(brand)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar Marca
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Image className="h-4 w-4 mr-2" />
                Alterar Logo
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Ver Produtos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onDelete(brand.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Marca
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};
