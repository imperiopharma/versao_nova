
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
- `CartPage.tsx`: Página do carrinho de compras
- `CheckoutDadosPage.tsx`: Primeira etapa do checkout (dados pessoais e endereço)
- `CheckoutResumoPage.tsx`: Segunda etapa do checkout (resumo do pedido)
- `CheckoutPagamentoPage.tsx`: Terceira etapa do checkout (pagamento)
- `LoginPage.tsx`: Página de login para clientes
- `NotFound.tsx`: Página de erro 404

## Páginas Administrativas

- `admin/Dashboard.tsx`: Painel principal com visão geral e métricas
- `admin/ProductsPage.tsx`: Gerenciamento de produtos, marcas e categorias
- `admin/OrdersPage.tsx`: Gerenciamento e acompanhamento de pedidos
- `admin/CustomersPage.tsx`: Visualização e gerenciamento de clientes
- `admin/FinancePage.tsx`: Relatórios financeiros e faturamento
- `admin/SettingsPage.tsx`: Configurações da loja e sistema
- `admin/LoginPage.tsx`: Página de login administrativa

## Uso

Cada página:
- Utiliza o componente `Layout` apropriado (loja ou admin)
- Importa e compõe componentes menores
- Busca dados necessários via hooks especializados
- Gerencia o estado específico da página
- É associada a uma rota em `App.tsx`

## Exemplo de Página

```tsx
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductList } from '@/components/product/ProductList';
import { useProducts } from '@/hooks/useProducts';

export const ProductsPage = () => {
  const { products, loading } = useProducts();
  
  return (
    <Layout>
      <h1>Nossos Produtos</h1>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ProductList products={products} />
      )}
    </Layout>
  );
};
```

## Responsividade

Todas as páginas são responsivas e se adaptam a diferentes tamanhos de tela, utilizando:
- Classes responsivas do Tailwind CSS
- Componentes adaptáveis
- Layouts flexíveis
- Versões específicas para mobile quando necessário

## Personalização

Para personalizar ou criar novas páginas:

1. Crie um novo arquivo na pasta `pages/` ou `pages/admin/`
2. Utilize o `Layout` apropriado
3. Importe componentes necessários
4. Utilize hooks para buscar dados
5. Adicione a rota correspondente em `App.tsx`
