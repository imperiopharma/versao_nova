
# Páginas Administrativas

Esta pasta contém todas as páginas do painel administrativo da Imperio Pharma.

## Páginas Disponíveis

- `Dashboard.tsx`: Página principal com visão geral de vendas, pedidos e desempenho
- `ProductsPage.tsx`: Interface para gerenciamento de produtos, marcas, categorias e combos
- `OrdersPage.tsx`: Gerenciamento e acompanhamento de pedidos
- `CustomersPage.tsx`: Visualização e gerenciamento de clientes
- `CouponsPage.tsx`: Gerenciamento de cupons promocionais
- `FinancePage.tsx`: Relatórios financeiros, faturamento e análises
- `SettingsPage.tsx`: Configurações da loja, informações gerais e integrações
- `LoginPage.tsx`: Página de autenticação específica para acesso administrativo

## Sistema de Gerenciamento de Combos

### Em ProductsPage.tsx

A página de produtos inclui funcionalidades para gerenciamento completo de combos:

1. **Criação de Combos**:
   - Formulário adaptado para combos com campos específicos:
     - Opção "É um combo?"
     - Percentual de desconto
     - Preço original (sem desconto)
     - Preço calculado automaticamente com desconto

2. **Listagem de Combos**:
   - Filtro para exibir apenas combos
   - Indicação visual para produtos que são combos
   - Coluna de percentual de desconto
   - Exibição de preço original e preço com desconto

3. **Estatísticas de Combos**:
   - Desempenho de vendas de combos
   - Comparativo de conversão (combos vs produtos normais)
   - Impacto dos combos na receita total

## Fluxo de Gerenciamento

1. Administrador acessa `ProductsPage.tsx`
2. Pode criar novo combo clicando em "Adicionar Produto" e marcando como combo
3. Pode editar combos existentes, ajustando preços e percentuais de desconto
4. Visualiza relatórios de desempenho de combos
5. Configura regras específicas para combos em `SettingsPage.tsx`

## Integração com Serviços

Todas as páginas administrativas estão integradas com os serviços da API:
- `productService` para gerenciamento de produtos e combos
- `categoryService` para categorias
- `brandService` para marcas
- `orderService` para pedidos
- `customerService` para clientes
