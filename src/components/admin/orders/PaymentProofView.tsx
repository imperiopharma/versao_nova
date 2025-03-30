
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, Download, AlertTriangle } from 'lucide-react';

interface PaymentProofViewProps {
  proofUrl?: string;
  orderNumber: string;
}

export const PaymentProofView: React.FC<PaymentProofViewProps> = ({ 
  proofUrl, 
  orderNumber 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!proofUrl) {
    return (
      <div className="flex items-center text-amber-600">
        <AlertTriangle size={16} className="mr-2" />
        <span className="text-sm">Sem comprovante</span>
      </div>
    );
  }
  
  const handleDownload = () => {
    // Criar um link temporário para download
    const link = document.createElement('a');
    link.href = proofUrl;
    link.download = `comprovante-pedido-${orderNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="flex items-center"
      >
        <Eye size={16} className="mr-2" />
        Ver Comprovante
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Comprovante do Pedido {orderNumber}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4 bg-gray-50 rounded-md flex flex-col items-center">
            <img 
              src={proofUrl} 
              alt={`Comprovante do pedido ${orderNumber}`}
              className="max-w-full max-h-[70vh] object-contain rounded-md shadow-md"
            />
            
            <Button 
              className="mt-4" 
              onClick={handleDownload}
            >
              <Download size={16} className="mr-2" />
              Baixar Comprovante
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
