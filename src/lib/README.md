
# Biblioteca de Utilitários

Esta pasta contém funções utilitárias e bibliotecas auxiliares usadas em toda a aplicação Imperio Pharma.

## Arquivos

- `formatters.ts`: Funções para formatação de valores (dinheiro, datas, etc.)
- `utils.ts`: Funções utilitárias gerais

## Formatadores

O arquivo `formatters.ts` contém funções para formatação consistente de valores em toda a aplicação:

- `formatCurrency(value: number)`: Formata valores monetários (R$ 99,90)
- `formatDate(date: Date | string)`: Formata datas (DD/MM/YYYY)
- `formatDateTime(date: Date | string)`: Formata data e hora (DD/MM/YYYY HH:MM)
- `formatPhoneNumber(phone: string)`: Formata números de telefone ((00) 00000-0000)
- `formatDiscountPercentage(value: number)`: Formata percentuais de desconto (30%)

## Utilitários para Combos

O arquivo `utils.ts` inclui funções específicas para manipulação de combos:

- `calculateDiscountedPrice(price: number, discount: number)`: Calcula o preço com desconto
- `calculateSavings(originalPrice: number, finalPrice: number)`: Calcula o valor economizado
- `calculateDiscountPercentage(originalPrice: number, finalPrice: number)`: Calcula o percentual de desconto
- `isCombo(product: Product)`: Verifica se um produto é um combo

Exemplo de uso:

```typescript
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';

// Calcular preço com desconto
const originalPrice = 100;
const discountPercentage = 30;
const finalPrice = calculateDiscountedPrice(originalPrice, discountPercentage);

// Formatar para exibição
console.log(`De ${formatCurrency(originalPrice)} por ${formatCurrency(finalPrice)}`);
// Saída: "De R$ 100,00 por R$ 70,00"
```

## Utilitários Gerais

Outras funções utilitárias disponíveis:

- `slugify(text: string)`: Converte texto para formato de slug (para URLs)
- `truncateText(text: string, length: number)`: Trunca texto para exibição
- `getSafeImageUrl(url: string, fallback: string)`: Garante URL de imagem válida com fallback
- `debounce(func: Function, wait: number)`: Implementa debounce para funções
- `getInitials(name: string)`: Extrai iniciais de um nome completo
- `generateOrderNumber()`: Gera número de pedido único
