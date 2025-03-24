
import React from 'react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderMessageProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export const OrderMessage: React.FC<OrderMessageProps> = ({ 
  isOpen, 
  onOpenChange,
  message
}) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message)
      .then(() => {
        toast({
          title: "Copiado!",
          description: "A mensagem do pedido foi copiada para a área de transferência",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o texto. Por favor, tente selecionar e copiar manualmente.",
          variant: "destructive",
        });
        console.error('Erro ao copiar: ', err);
      });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Detalhes do Pedido para Estoque</DrawerTitle>
          <DrawerDescription>
            Copie esta mensagem para enviar ao estoque via WhatsApp
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Textarea
            value={message}
            className="min-h-[300px] font-mono"
            readOnly
          />
        </div>
        <DrawerFooter className="border-t pt-4">
          <div className="flex justify-between w-full">
            <Button onClick={copyToClipboard} className="gap-2">
              <Copy className="h-4 w-4" /> Copiar Mensagem
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
