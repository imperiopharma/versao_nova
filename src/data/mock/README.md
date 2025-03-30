
# Dados Mock

Esta pasta contém dados fictícios usados para desenvolvimento e demonstração da Farmácia Imperio.

## Arquivos

- `brands.ts`: Lista de marcas parceiras com nome, logo e descrição
- `categories.tsx`: Categorias e subcategorias de produtos com ícones e descrições
- `faq.ts`: Perguntas frequentes agrupadas por temas
- `hero.ts`: Dados para os banners principais rotativos da home
- `products.ts`: Catálogo completo de produtos fictícios incluindo combos

## Sistema de Combos nos Dados Mock

Os dados mock de produtos já incluem exemplos de combos promocionais:

```typescript
// Exemplo de mock de combo na lista de produtos
{
  id: 'combo-1',
  name: 'Kit Completo Vitaminas A-Z',
  brand: 'MultiVita',
  description: 'Kit completo com vitaminas essenciais para sua saúde diária',
  price: 89.90,
  originalPrice: 129.90, // Preço antes do desconto
  image: '/images/combos/kit-vitaminas.jpg',
  isCombo: true, // Marca como combo
  stock: 15,
  category: 'vitaminas'
}
```

## Uso em Desenvolvimento

Estes dados são utilizados principalmente durante as fases de desenvolvimento:
- Quando a API ainda não está completamente implementada
- Para trabalhar offline
- Para demonstração da interface
- Para testes de usabilidade

Em ambiente de produção, estes dados são substituídos por chamadas reais à API.

## Estrutura dos Dados

Cada arquivo segue a estrutura de tipos definida em `/src/types`, garantindo consistência entre os dados mock e os dados reais da aplicação.

## Customização

Para adicionar novos produtos ou combos aos dados mock:
1. Edite o arquivo `products.ts`
2. Siga o formato existente, incluindo todas as propriedades necessárias
3. Para combos, certifique-se de definir `isCombo: true` e incluir `originalPrice`
4. Os novos itens aparecerão automaticamente na interface durante o desenvolvimento
