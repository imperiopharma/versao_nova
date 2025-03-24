
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

interface CategoryDialogProps {
  category?: any;
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryDialog: React.FC<CategoryDialogProps> = ({ 
  category, 
  isOpen, 
  onClose 
}) => {
  const isEditing = !!category;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Nome da Categoria</Label>
            <Input 
              id="category-name" 
              defaultValue={category?.name || ''} 
              placeholder="Nome da categoria"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category-slug">Slug (URL)</Label>
            <Input 
              id="category-slug" 
              defaultValue={category?.slug || ''} 
              placeholder="slug-da-categoria"
            />
            <p className="text-xs text-muted-foreground">
              O slug será usado na URL para acessar a página da categoria
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category-description">Descrição</Label>
            <Textarea 
              id="category-description" 
              rows={3}
              defaultValue={category?.description || ''} 
              placeholder="Descrição da categoria..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category-status">Status</Label>
            <Select defaultValue={category?.status || 'active'}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">
            {isEditing ? 'Salvar Alterações' : 'Adicionar Categoria'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
