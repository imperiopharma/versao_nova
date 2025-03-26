
# Lib

Esta pasta contém funções utilitárias e bibliotecas auxiliares usadas em toda a aplicação.

## Arquivos

- `formatters.ts`: Funções para formatação de valores (dinheiro, datas, etc.)
- `utils.ts`: Funções utilitárias gerais

## Uso

Estas funções devem ser usadas para evitar duplicação de código e manter consistência em toda a aplicação:

```tsx
import { formatCurrency } from '@/lib/formatters';

function PriceDisplay({ price }) {
  return <span>{formatCurrency(price)}</span>;
}
```
