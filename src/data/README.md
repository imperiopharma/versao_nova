
# Dados Estáticos e Mocks

Esta pasta contém dados estáticos e mocks utilizados no desenvolvimento da aplicação Imperio Pharma.

## Estrutura

- `/mock`: Dados fictícios para desenvolvimento e testes

## Dados Disponíveis

A pasta `/mock` contém os seguintes conjuntos de dados:

- `products.ts`: Produtos de exemplo, incluindo combos promocionais
- `categories.tsx`: Categorias de produtos
- `brands.ts`: Marcas de produtos
- `hero.ts`: Slides para o banner principal
- `faq.ts`: Perguntas frequentes

## Sistema de Combos nos Dados Mock

O arquivo `products.ts` inclui exemplos de combos promocionais:

```typescript
export const mockProducts = [
  // ... produtos normais
  
  // Exemplo de combo promocional
  {
    id: 'combo-1',
    name: 'Kit Completo Vitaminas',
    price: 79.90,
    originalPrice: 129.90, // Preço original antes do desconto
    image: '/images/products/combo-vitaminas.jpg',
    brand: 'MultiVita',
    description: 'Kit completo com todas as vitaminas essenciais para sua saúde diária.',
    isCombo: true, // Identifica como combo
    stock: 15,
    category: 'vitaminas'
  },
  
  // Mais exemplos de combos...
]

// Produtos específicos para a seção de combos na página inicial
export const mockFlashSaleItems = [
  // Combos em destaque
  {
    id: 'combo-2',
    name: 'Combo Proteção Solar',
    price: 89.90,
    originalPrice: 149.90,
    image: '/images/products/combo-solar.jpg',
    brand: 'SolProteção',
    isCombo: true,
    stock: 10,
    category: 'proteção-solar'
  },
  // ... mais combos em destaque
];
```

## Uso em Desenvolvimento

Estes dados são utilizados durante o desenvolvimento para:
- Realizar testes de interface sem depender do backend
- Criar protótipos e validar design
- Trabalhar offline
- Acelerar o processo de desenvolvimento com dados consistentes

## Integração com Serviços

Em ambiente de desenvolvimento, os serviços da API podem ser configurados para usar estes dados mock em vez de fazer requisições reais.
