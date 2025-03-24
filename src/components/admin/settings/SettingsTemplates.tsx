
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';

const defaultTemplate = `*PEDIDO {orderNumber}*
*Data:* {date}
*Status:* {status}

*CLIENTE:*
Nome: {customer.name}
Email: {customer.email}

*PRODUTOS:*
{products}

*Método de Pagamento:* {paymentMethod}
*Frete:* {shipping}
*Desconto:* {discount}
*Subtotal:* {subtotal}
*TOTAL:* {total}`;

export const SettingsTemplates = () => {
  const { toast } = useToast();
  const [orderTemplate, setOrderTemplate] = React.useState(defaultTemplate);

  const handleSaveTemplate = () => {
    // Here we would save the template to the database
    toast({
      title: "Template salvo",
      description: "O modelo de mensagem foi atualizado com sucesso",
    });
  };

  const handleResetTemplate = () => {
    setOrderTemplate(defaultTemplate);
    toast({
      title: "Template restaurado",
      description: "O modelo de mensagem foi restaurado para o padrão",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template de Mensagem para Pedidos</CardTitle>
        <CardDescription>
          Personalize o formato da mensagem dos pedidos que será enviada para o estoque.
          Use as variáveis entre chaves {} para incluir informações dinâmicas do pedido.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Variáveis disponíveis:</h3>
          <div className="text-sm text-muted-foreground">
            <code className="text-xs">{`{orderNumber}, {date}, {status}, {customer.name}, {customer.email}, {products}, {paymentMethod}, {shipping}, {discount}, {subtotal}, {total}`}</code>
          </div>
        </div>
        
        <Textarea
          value={orderTemplate}
          onChange={(e) => setOrderTemplate(e.target.value)}
          className="min-h-[300px] font-mono"
          placeholder="Digite o template da mensagem aqui..."
        />
        
        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" onClick={handleResetTemplate}>
            Restaurar Padrão
          </Button>
          <Button onClick={handleSaveTemplate}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
