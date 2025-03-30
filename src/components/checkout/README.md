
# Componentes de Checkout

Esta pasta contém os componentes relacionados ao processo de checkout (finalização de compra) da Imperio Pharma.

## Componentes

- `CheckoutForm.tsx`: Formulário para coleta de dados do cliente
- `OrderSummary.tsx`: Resumo do pedido durante o checkout
- `PaymentOptions.tsx`: Opções de pagamento disponíveis
- `AddressForm.tsx`: Formulário para endereço de entrega
- `CheckoutSteps.tsx`: Indicador de progresso do checkout
- `CartSummary.tsx`: Resumo do carrinho durante o checkout
- `OrderItemsCard.tsx`: Lista de itens do pedido
- `ShippingMethodForm.tsx`: Seleção de método de envio

## Suporte a Combos no Checkout

Os componentes de checkout foram adaptados para lidar corretamente com combos:

### OrderSummary.tsx

- Exibe claramente quais itens são combos
- Mostra o desconto aplicado a cada combo
- Calcula e exibe o total de economia com combos
- Apresenta seção "Você economizou" destacando o valor total economizado

### CartSummary.tsx

- Calcula corretamente o subtotal considerando os descontos de combos
- Permite aplicação de cupons adicionais sobre combos (se permitido)
- Exibe claramente o valor economizado com combos

## Processo de Checkout com Combos

1. Cliente adiciona combos ao carrinho
2. No checkout, os combos são identificados visualmente
3. Os descontos são claramente exibidos no resumo
4. Cupons podem ser aplicados conforme regras específicas
5. O resumo final mostra economia total (combos + cupons)
6. Pedido é finalizado com todos os descontos aplicados

## Exemplo de Implementação

```tsx
// Trecho simplificado de OrderItemsCard.tsx
const OrderItemsCard = () => {
  const { items } = useCart();
  const totalSavings = items.reduce((total, item) => {
    // Calcular economia em combos
    if (item.isCombo && item.originalPrice) {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }
    return total;
  }, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens do Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        {items.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <div>
              <span className="font-medium">{item.name}</span> 
              <span className="text-muted-foreground">({item.quantity}x)</span>
              {item.isCombo && (
                <span className="ml-2 bg-imperio-navy text-white text-xs px-1.5 py-0.5 rounded-full">
                  Combo
                </span>
              )}
            </div>
            <div className="text-right">
              {item.isCombo && item.originalPrice && (
                <span className="text-sm line-through text-muted-foreground block">
                  {formatCurrency(item.originalPrice * item.quantity)}
                </span>
              )}
              <span className="font-medium">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
        
        {totalSavings > 0 && (
          <div className="mt-4 p-2 bg-green-50 text-green-800 rounded-md">
            <p className="font-medium">Você economizou {formatCurrency(totalSavings)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
```

## Integração com Serviços

Os componentes utilizam:
- `orderService` para finalização de pedidos
- `shippingService` para cálculo de frete
- `customerService` para dados de cliente
