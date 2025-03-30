
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, Download, AlertTriangle, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentProofViewProps {
  proofUrl?: string;
  orderNumber: string;
}

export const PaymentProofView: React.FC<PaymentProofViewProps> = ({ 
  proofUrl, 
  orderNumber 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  if (!proofUrl) {
    return (
      <div className="flex items-center text-amber-600">
        <AlertTriangle size={16} className="mr-2" />
        <span className="text-sm">Sem comprovante</span>
      </div>
    );
  }
  
  const handleDownload = () => {
    try {
      // Criar um link temporário para download
      const link = document.createElement('a');
      link.href = proofUrl;
      link.download = `comprovante-pedido-${orderNumber}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download iniciado",
        description: `Baixando comprovante do pedido ${orderNumber}`,
      });
    } catch (error) {
      console.error('Erro ao baixar comprovante:', error);
      toast({
        title: "Erro ao baixar",
        description: "Não foi possível baixar o comprovante. Tente novamente.",
        variant: "destructive",
      });
    }
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
            <DialogTitle className="flex items-center">
              <FileImage className="mr-2 h-5 w-5" />
              Comprovante do Pedido {orderNumber}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4 bg-gray-50 rounded-md flex flex-col items-center">
            {proofUrl ? (
              <img 
                src={proofUrl} 
                alt={`Comprovante do pedido ${orderNumber}`}
                className="max-w-full max-h-[70vh] object-contain rounded-md shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                  toast({
                    title: "Erro ao carregar imagem",
                    description: "Não foi possível carregar o comprovante.",
                    variant: "destructive",
                  });
                }}
              />
            ) : (
              <div className="p-12 border-2 border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                Não foi possível carregar o comprovante
              </div>
            )}
            
            <div className="mt-4 flex gap-2">
              <Button 
                onClick={handleDownload}
                className="flex items-center"
              >
                <Download size={16} className="mr-2" />
                Baixar Comprovante
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
