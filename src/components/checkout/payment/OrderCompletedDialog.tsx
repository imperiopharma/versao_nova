
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface OrderCompletedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export const OrderCompletedDialog: React.FC<OrderCompletedDialogProps> = ({ 
  open, 
  onOpenChange,
  onClose
}) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-imperio-navy text-center text-2xl">
            Pedido realizado com sucesso! 🎉
          </DialogTitle>
          <DialogDescription className="text-center">
            Seus dados foram enviados e em breve nossa equipe entrará em contato.
            Você receberá a confirmação pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <p className="font-medium">
            Obrigado por comprar na Império Pharma!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Você será redirecionado para a página inicial em instantes...
          </p>
        </div>
        
        <DialogFooter>
          <Button 
            className="w-full bg-imperio-navy hover:bg-imperio-light-navy"
            onClick={onClose}
          >
            Voltar à Página Inicial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
