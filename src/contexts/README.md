
# Contextos

Esta pasta contém os contextos React utilizados para gerenciamento de estado global na aplicação.

## Contextos Disponíveis

- `CartContext.tsx`: Gerencia o estado do carrinho de compras
- `CheckoutContext.tsx`: Gerencia o estado do processo de checkout

## Uso

Os contextos fornecem estado global e funções para manipular esse estado em vários componentes, evitando a necessidade de prop drilling.

Para usar um contexto:

```tsx
import { useCart } from '@/contexts/CartContext';

function MyComponent() {
  const { items, addItem, removeItem } = useCart();
  // Usar as funções e estado conforme necessário
}
```
