
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShoppingBag, 
  DollarSign, 
  Edit, 
  Send 
} from 'lucide-react';

interface CustomerDetailsDialogProps {
  customer: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export const CustomerDetailsDialog: React.FC<CustomerDetailsDialogProps> = ({ 
  customer, 
  isOpen, 
  onClose,
  onEdit
}) => {
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  // Formatação de data
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Detalhes do Cliente</span>
            <Badge 
              variant="outline" 
              className={`${
                customer.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              } border-none`}
            >
              {customer.status === 'active' ? 'Ativo' : 'Inativo'}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <User size={30} />
            </div>
            <div>
              <h3 className="text-lg font-medium">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">Cliente desde 2023</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-2" />
              <span>{customer.email}</span>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-2" />
              <span>{customer.phone}</span>
            </div>
            
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-gray-500 mr-2" />
              <span>{customer.orders} pedidos realizados</span>
            </div>
            
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
              <span>Total gasto: {formatCurrency(customer.totalSpent)}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <span>Último pedido: {formatDate(customer.lastOrder)}</span>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h4 className="font-medium">Endereços</h4>
            <p className="text-sm text-muted-foreground">
              Nenhum endereço cadastrado.
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
            <Button variant="outline" size="sm">
              <Send className="h-4 w-4 mr-1" />
              Enviar E-mail
            </Button>
          </div>
          
          <DialogClose asChild>
            <Button>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
