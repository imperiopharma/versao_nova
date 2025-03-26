
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
import { getSafeImageUrl } from '@/lib/utils';

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
  // Transformar categoria para exibição
  const displayCategory = () => {
    switch (brand.category) {
      case 'imported': return 'Importada';
      case 'premium': return 'Premium';
      case 'national': return 'Nacional';
      case 'various': return 'Diversos';
      default: return brand.category || 'Não definida';
    }
  };

  // Garantir que temos uma URL de imagem válida usando getSafeImageUrl
  const imageUrl = getSafeImageUrl(
    brand.logoUrl || brand.logo, 
    `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`,
    brand.name
  );

  return (
    <TableRow>
      <TableCell>
        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt={brand.name} 
            className="h-full w-full object-contain"
            onError={(e) => {
              // Fallback para um placeholder se a imagem não carregar
              (e.target as HTMLImageElement).src = `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brand.name)}`;
            }}
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <div>
          <p className="truncate max-w-[120px]">{brand.name}</p>
          <p className="text-xs text-muted-foreground md:hidden">
            {brand.status === 'active' ? 'Ativo' : 'Inativo'}
          </p>
        </div>
      </TableCell>
      <TableCell className="max-w-xs truncate hidden md:table-cell">{brand.description || '-'}</TableCell>
      <TableCell className="text-center hidden md:table-cell">{displayCategory()}</TableCell>
      <TableCell className="text-center hidden md:table-cell">
        <span className={`px-2 py-1 rounded-full text-xs ${
          brand.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {brand.status === 'active' ? 'Ativo' : 'Inativo'}
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
              <DropdownMenuItem onClick={() => onEdit(brand)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar Marca
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit({...brand, focus: 'logo'})}>
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
