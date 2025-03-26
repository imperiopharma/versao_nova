
# Páginas

Esta pasta contém componentes de página completa da Farmácia Imperio que são renderizados por rotas específicas.

## Estrutura

- `/admin`: Páginas do painel administrativo
- Páginas principais do site para o cliente final

## Páginas Disponíveis

- `HomePage.tsx`: Página inicial da loja
- `ProductDetailsPage.tsx`: Detalhes de um produto específico
- `CategoryProductsPage.tsx`: Listagem de produtos de uma categoria específica
- `BrandProductsPage.tsx`: Listagem de produtos de uma marca específica
- `CartPage.tsx`: Página do carrinho de compras
- `CheckoutDadosPage.tsx`: Primeira etapa do checkout (dados pessoais e endereço)
- `CheckoutResumoPage.tsx`: Segunda etapa do checkout (resumo do pedido)
- `CheckoutPagamentoPage.tsx`: Terceira etapa do checkout (pagamento)
- `FreightInfoPage.tsx`: Informações sobre entrega e frete
- `CombosPage.tsx`: Página de combos e pacotes promocionais
- `MarketplacePage.tsx`: Página de marketplace com produtos de parceiros
- `LoginPage.tsx`: Página de login para clientes
- `NotFound.tsx`: Página de erro 404

## Convenções

Cada arquivo nesta pasta representa uma rota completa da aplicação. Eles devem:
- Usar o componente Layout para manter a estrutura consistente
- Importar e compor componentes menores
- Buscar dados via hooks quando necessário
- Gerenciar o estado específico da página
