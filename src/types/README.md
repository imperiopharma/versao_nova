
# Tipos

Esta pasta contém definições de tipos TypeScript usados em toda a aplicação.

## Tipos Disponíveis

- `brand.ts`: Definições para marcas
- `category.ts`: Definições para categorias
- `customer.ts`: Definições para clientes
- `faq.ts`: Definições para FAQs
- `hero.ts`: Definições para banner principal
- `orders.ts`: Definições para pedidos
- `product.ts`: Definições para produtos

## Uso

Estes tipos fornecem tipagem estática para objetos de dados, props de componentes e retornos de funções:

```tsx
import { Product } from '@/types/product';

function formatProduct(product: Product): string {
  return `${product.name} - ${product.price}`;
}
```
