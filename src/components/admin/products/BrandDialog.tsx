
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface BrandDialogProps {
  brand?: any;
  isOpen: boolean;
  onClose: () => void;
}

export const BrandDialog: React.FC<BrandDialogProps> = ({ 
  brand, 
  isOpen, 
  onClose 
}) => {
  const isEditing = !!brand;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Marca' : 'Adicionar Nova Marca'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="brand-name">Nome da Marca</Label>
            <Input 
              id="brand-name" 
              defaultValue={brand?.name || ''} 
              placeholder="Nome da marca"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand-slug">Slug (URL)</Label>
            <Input 
              id="brand-slug" 
              defaultValue={brand?.slug || ''} 
              placeholder="slug-da-marca"
            />
            <p className="text-xs text-muted-foreground">
              O slug será usado na URL para acessar a página da marca
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand-description">Descrição</Label>
            <Textarea 
              id="brand-description" 
              rows={3}
              defaultValue={brand?.description || ''} 
              placeholder="Descrição da marca..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand-status">Status</Label>
            <Select defaultValue={brand?.status || 'active'}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Logo da Marca</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {brand?.logoUrl ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={brand.logoUrl} 
                    alt={brand.name}
                    className="h-20 w-20 object-contain mb-2" 
                  />
                  <Button variant="outline" size="sm">
                    Alterar Imagem
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-2">
                    <svg
                      className="mx-auto h-10 w-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    PNG, JPG ou WEBP (Máximo 2MB)
                  </p>
                  <Button variant="outline" size="sm">
                    Fazer Upload
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">
            {isEditing ? 'Salvar Alterações' : 'Adicionar Marca'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
