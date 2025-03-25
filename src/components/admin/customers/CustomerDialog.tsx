
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/customer';

interface CustomerDialogProps {
  customer?: Customer;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDialog: React.FC<CustomerDialogProps> = ({ 
  customer, 
  isOpen, 
  onClose 
}) => {
  const isEditing = !!customer;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    status: customer?.status || 'active',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('customer-', '')]: value
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value as 'active' | 'inactive'
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditing && customer) {
        // Atualizar cliente existente
        const { error } = await supabase
          .from('customers')
          .update({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            status: formData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', customer.id);
          
        if (error) throw error;
        
        toast({
          title: 'Cliente atualizado',
          description: 'Os dados do cliente foram atualizados com sucesso.'
        });
      } else {
        // Criar novo cliente
        const { error } = await supabase
          .from('customers')
          .insert({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            status: formData.status,
            total_spent: 0,
            total_orders: 0
          });
          
        if (error) throw error;
        
        toast({
          title: 'Cliente adicionado',
          description: 'O cliente foi adicionado com sucesso.'
        });
      }
      
      // Força atualização da página para mostrar os novos dados
      window.location.reload();
      
      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar cliente:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível salvar o cliente.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="customer-name">Nome Completo</Label>
            <Input 
              id="customer-name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome do cliente"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer-email">E-mail</Label>
            <Input 
              id="customer-email" 
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer-phone">Telefone</Label>
            <Input 
              id="customer-phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer-status">Status</Label>
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
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Adicionar Cliente'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
