
# Páginas da Aplicação

Esta pasta contém os componentes de página completa da Imperio Pharma que são renderizados por rotas específicas.

## Estrutura

- `/admin`: Páginas do painel administrativo
- Páginas principais da loja para o cliente final

## Páginas da Loja

- `HomePage.tsx`: Página inicial da loja
- `ProductDetailsPage.tsx`: Detalhes de um produto específico
- `CategoryProductsPage.tsx`: Listagem de produtos de uma categoria específica
- `BrandProductsPage.tsx`: Listagem de produtos de uma marca específica
- `CombosPage.tsx`: Página dedicada a combos promocionais
- `CartPage.tsx`: Página do carrinho de compras
- `CheckoutDadosPage.tsx`: Primeira etapa do checkout (dados pessoais e endereço)
- `CheckoutResumoPage.tsx`: Segunda etapa do checkout (resumo do pedido)
- `CheckoutPagamentoPage.tsx`: Terceira etapa do checkout (pagamento)
- `LoginPage.tsx`: Página de login para clientes
- `NotFound.tsx`: Página de erro 404

## Página de Combos

A `CombosPage.tsx` é dedicada à exibição de todos os combos promocionais:
- Lista todos os produtos marcados como combos
- Exibe o desconto percentual aplicado em cada combo
- Mostra preço original e preço com desconto
- Oferece filtros específicos para tipos de combos
- Destaca economia potencial para o cliente

## Páginas Administrativas

- `admin/Dashboard.tsx`: Painel principal com visão geral e métricas
- `admin/ProductsPage.tsx`: Gerenciamento de produtos, incluindo combos
- `admin/OrdersPage.tsx`: Gerenciamento e acompanhamento de pedidos
- `admin/CustomersPage.tsx`: Visualização e gerenciamento de clientes
- `admin/FinancePage.tsx`: Relatórios financeiros e faturamento
- `admin/SettingsPage.tsx`: Configurações da loja e sistema
- `admin/CouponsPage.tsx`: Gerenciamento de cupons promocionais
- `admin/LoginPage.tsx`: Página de login administrativa

## Gerenciamento de Combos

O sistema permite gerenciar combos através da página `admin/ProductsPage.tsx`:
- Interface para criação de novos combos
- Campos específicos para configuração de combos:
  - Percentual de desconto
  - Preço original (antes do desconto)
  - Opção para marcar produto como combo
- Listagem de combos existentes com ações para editar/excluir
- Métricas de desempenho para cada combo

## Responsividade

Todas as páginas são responsivas e se adaptam a diferentes tamanhos de tela, utilizando:
- Classes responsivas do Tailwind CSS
- Componentes adaptáveis
- Layouts flexíveis
- Versões específicas para mobile quando necessário
