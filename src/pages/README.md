
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

## Integração com Serviços

Todas as páginas utilizam os serviços correspondentes:
- Páginas de produtos utilizam `productService`
- Páginas de categorias utilizam `categoryService`
- Páginas de marcas utilizam `brandService`
- Páginas de pedidos utilizam `orderService`
- Páginas de clientes utilizam `customerService`

## Uso do Router

As páginas são mapeadas para rotas utilizando o React Router:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produto/:id" element={<ProductDetailsPage />} />
        {/* Outras rotas... */}
      </Routes>
    </BrowserRouter>
  );
}
```
