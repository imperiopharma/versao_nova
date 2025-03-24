
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Truck, 
  Send, 
  Download, 
  Package,
  Eye,
  Copy
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface OrderDetailsDialogProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
}

export const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ 
  order, 
  isOpen, 
  onClose,
  onStatusChange
}) => {
  const [isOrderMessageOpen, setIsOrderMessageOpen] = useState(false);
  const { toast } = useToast();
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  // Formatação de data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Cores e textos para os status dos pedidos
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Aguardando Pagamento' };
      case 'paid':
        return { color: 'bg-blue-100 text-blue-800', text: 'Pagamento Aprovado' };
      case 'preparing':
        return { color: 'bg-purple-100 text-purple-800', text: 'Em Preparação' };
      case 'shipped':
        return { color: 'bg-indigo-100 text-indigo-800', text: 'Enviado' };
      case 'delivered':
        return { color: 'bg-green-100 text-green-800', text: 'Entregue' };
      case 'canceled':
        return { color: 'bg-red-100 text-red-800', text: 'Cancelado' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Desconhecido' };
    }
  };

  // Gerar a mensagem formatada do pedido para copiar
  const generateOrderMessage = () => {
    const lines = [
      `*PEDIDO ${order.orderNumber}*`,
      `*Data:* ${formatDate(order.date)}`,
      `*Status:* ${getStatusConfig(order.status).text}`,
      '',
      `*CLIENTE:*`,
      `Nome: ${order.customer.name}`,
      `Email: ${order.customer.email}`,
      '',
      `*PRODUTOS:*`
    ];

    // Adicionar itens do pedido
    order.items.forEach((item: any) => {
      lines.push(`${item.quantity}x ${item.name} - ${formatCurrency(item.price)} cada = ${formatCurrency(item.price * item.quantity)}`);
    });

    lines.push('');
    lines.push(`*Método de Pagamento:* ${order.paymentMethod}`);
    lines.push(`*Frete:* ${formatCurrency(order.shipping)}`);
    
    if (order.discount > 0) {
      lines.push(`*Desconto:* ${formatCurrency(order.discount)}`);
    }
    
    lines.push(`*Subtotal:* ${formatCurrency(order.subtotal)}`);
    lines.push(`*TOTAL:* ${formatCurrency(order.total)}`);
    
    return lines.join('\n');
  };

  // Função para copiar a mensagem para a área de transferência
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateOrderMessage())
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Detalhes do Pedido {order.orderNumber}</span>
              <Badge 
                variant="outline" 
                className={`${getStatusConfig(order.status).color} border-none`}
              >
                {getStatusConfig(order.status).text}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm">Data do Pedido:</div>
              <div className="font-medium">{formatDate(order.date)}</div>
            </div>
            
            <div className="flex items-center gap-2">
              <Select 
                value={order.status}
                onValueChange={onStatusChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Alterar Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Aguardando Pagamento</SelectItem>
                  <SelectItem value="paid">Pagamento Aprovado</SelectItem>
                  <SelectItem value="preparing">Em Preparação</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsOrderMessageOpen(true)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Visualizar Pedido
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1 p-3 border rounded-md">
              <div className="font-medium">Informações do Cliente</div>
              <div>{order.customer.name}</div>
              <div className="text-sm text-muted-foreground">{order.customer.email}</div>
            </div>
            
            <div className="space-y-1 p-3 border rounded-md">
              <div className="font-medium">Informações de Pagamento</div>
              <div>Método: {order.paymentMethod}</div>
              <div className="text-sm text-muted-foreground">
                Status: {getStatusConfig(order.status).text}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="font-medium mb-2">Itens do Pedido</div>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="space-y-2 p-3 border rounded-md mb-4">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Frete</span>
              <span>{formatCurrency(order.shipping)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span>Desconto</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Send className="h-4 w-4 mr-1" />
                Enviar E-mail
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Nota Fiscal
              </Button>
            </div>
            
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Fechar</Button>
              </DialogClose>
              
              {order.status === 'paid' && (
                <Button 
                  onClick={() => onStatusChange('preparing')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Package className="h-4 w-4 mr-1" />
                  Iniciar Preparação
                </Button>
              )}
              
              {order.status === 'preparing' && (
                <Button 
                  onClick={() => onStatusChange('shipped')}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Truck className="h-4 w-4 mr-1" />
                  Marcar como Enviado
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Drawer open={isOrderMessageOpen} onOpenChange={setIsOrderMessageOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Detalhes do Pedido para Estoque</DrawerTitle>
            <DrawerDescription>
              Copie esta mensagem para enviar ao estoque via WhatsApp
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <Textarea
              value={generateOrderMessage()}
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
    </>
  );
};
