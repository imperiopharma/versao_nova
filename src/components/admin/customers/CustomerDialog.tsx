
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface CustomerDialogProps {
  customer?: any;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDialog: React.FC<CustomerDialogProps> = ({ 
  customer, 
  isOpen, 
  onClose 
}) => {
  const isEditing = !!customer;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="customer-name">Nome Completo</Label>
            <Input 
              id="customer-name" 
              defaultValue={customer?.name || ''} 
              placeholder="Nome do cliente"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer-email">E-mail</Label>
            <Input 
              id="customer-email" 
              type="email"
              defaultValue={customer?.email || ''} 
              placeholder="email@exemplo.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer-phone">Telefone</Label>
            <Input 
              id="customer-phone" 
              defaultValue={customer?.phone || ''} 
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer-status">Status</Label>
            <Select defaultValue={customer?.status || 'active'}>
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
            <Label htmlFor="customer-password">Senha</Label>
            <Input 
              id="customer-password" 
              type="password"
              placeholder={isEditing ? "••••••••" : "Senha"}
            />
            {isEditing && (
              <p className="text-xs text-muted-foreground">
                Deixe em branco para manter a senha atual
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">
            {isEditing ? 'Salvar Alterações' : 'Adicionar Cliente'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
