
import React, { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const isEditing = !!category;
  
  // Form state
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    status: category?.status || 'active'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('category-', '')]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log('Saving category:', formData);
    
    toast({
      title: isEditing ? "Categoria atualizada" : "Categoria adicionada",
      description: `${formData.name} foi ${isEditing ? 'atualizada' : 'adicionada'} com sucesso.`,
    });
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Nome da Categoria</Label>
              <Input 
                id="category-name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nome da categoria"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category-slug">Slug (URL)</Label>
              <Input 
                id="category-slug" 
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="slug-da-categoria"
                required
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
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descrição da categoria..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={handleSelectChange}
              >
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
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit">
              {isEditing ? 'Salvar Alterações' : 'Adicionar Categoria'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
