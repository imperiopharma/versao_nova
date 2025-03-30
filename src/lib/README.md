
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

## Utilitários Gerais

O arquivo `utils.ts` contém funções auxiliares diversas:

- `slugify(text: string)`: Converte texto para formato de slug (para URLs)
- `truncateText(text: string, length: number)`: Trunca texto para exibição
- `getSafeImageUrl(url: string, fallback: string)`: Garante URL de imagem válida com fallback
- `debounce(func: Function, wait: number)`: Implementa debounce para funções
- `getInitials(name: string)`: Extrai iniciais de um nome completo
- `generateOrderNumber()`: Gera número de pedido único

## Uso

Estas funções podem ser importadas e utilizadas em qualquer parte da aplicação:

```tsx
import { formatCurrency, formatDate } from '@/lib/formatters';
import { slugify, truncateText } from '@/lib/utils';

function ProductDetails({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{truncateText(product.description, 100)}</p>
      <div>Preço: {formatCurrency(product.price)}</div>
      <div>Adicionado em: {formatDate(product.created_at)}</div>
      <a href={`/produto/${slugify(product.name)}`}>Ver detalhes</a>
    </div>
  );
}
```

## Personalização

Para adicionar novas funções utilitárias:

1. Identifique a categoria apropriada (formatadores ou utilitários gerais)
2. Adicione a função ao arquivo correspondente
3. Adicione tipos TypeScript apropriados
4. Documente a função com comentários explicativos
5. Teste a função em diferentes cenários

## Observações Importantes

- Mantenha estas funções puras e sem efeitos colaterais
- Evite dependências externas desnecessárias
- Documente claramente parâmetros e retornos
- Implemente tratamento de erros adequado
