
# Componentes do Carrinho de Compras

Esta pasta contém os componentes relacionados ao carrinho de compras da Imperio Pharma.

## Componentes

- `CartItem.tsx`: Item individual no carrinho
- `CartSummary.tsx`: Resumo do carrinho (subtotal, frete, total)
- `CartEmpty.tsx`: Estado vazio do carrinho
- `CartSidebar.tsx`: Carrinho em formato de sidebar

## Funcionalidades

Estes componentes permitem:
- Visualização dos itens adicionados ao carrinho
- Atualização de quantidades
- Remoção de itens
- Cálculo automático de subtotal, frete e total
- Navegação para o checkout
- Persistência dos itens entre sessões

## Uso

Estes componentes são utilizados principalmente na página de carrinho (`CartPage.tsx`) e como um sidebar que pode ser aberto de qualquer página.

```tsx
import { CartSummary } from '@/components/cart/CartSummary';
import { CartItem } from '@/components/cart/CartItem';

// Na página do carrinho
function CartPage() {
  const { items, totalPrice } = useCart();
  
  return (
    <div>
      <h1>Seu Carrinho</h1>
      
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      
      <CartSummary totalPrice={totalPrice} />
      
      <Button onClick={goToCheckout}>Finalizar Compra</Button>
    </div>
  );
}
```

## Integração com Contexto

Todos os componentes do carrinho utilizam o `CartContext` para:
- Acessar a lista de itens
- Obter valores calculados (total, quantidade)
- Executar ações (adicionar, remover, atualizar)

## Comportamento Responsivo

Os componentes se adaptam a diferentes tamanhos de tela:
- Em desktop: Layout completo com mais informações
- Em mobile: Layout simplificado e otimizado para toque

## Personalização

Para personalizar estes componentes:

1. **CartItem**: 
   - Edite as informações exibidas para cada item
   - Modifique os controles de quantidade

2. **CartSummary**: 
   - Ajuste os cálculos e regras de frete
   - Adicione ou remova linhas de resumo (descontos, impostos, etc.)

3. **CartSidebar**: 
   - Altere o comportamento de abertura/fechamento
   - Modifique a animação e posicionamento

## Observações Importantes

- O carrinho utiliza `localStorage` para persistência
- Existe validação para evitar adicionar mais produtos do que o estoque disponível
- Os preços sempre são recalculados ao abrir o carrinho para garantir valores atualizados
- O componente lida automaticamente com produtos que foram removidos do catálogo
