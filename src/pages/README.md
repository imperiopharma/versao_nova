
# Páginas

Esta pasta contém componentes de página completa que são renderizados por rotas específicas.

## Estrutura

- `/admin`: Páginas do painel administrativo
- Páginas principais do site

## Páginas Disponíveis

- `HomePage.tsx`: Página inicial
- `ProductDetailsPage.tsx`: Detalhes de um produto específico
- `CategoryProductsPage.tsx`: Produtos de uma categoria específica
- `CartPage.tsx`: Página do carrinho
- `CheckoutDadosPage.tsx`: Página de informações de checkout
- Entre outras...

## Convenções

Cada arquivo nesta pasta representa uma rota completa da aplicação. Eles devem:
- Usar o componente Layout para manter a estrutura consistente
- Importar e compor componentes menores
- Buscar dados via hooks quando necessário
