
# Componentes

Esta pasta contém todos os componentes React da aplicação, organizados por funcionalidade.

## Estrutura

- `/admin`: Componentes usados na interface de administração
- `/auth`: Componentes relacionados a autenticação e autorização
- `/cart`: Componentes para gerenciamento do carrinho
- `/checkout`: Formulários e componentes de checkout
- `/home`: Seções e blocos para a página inicial
- `/layout`: Componentes de estrutura (Header, Footer, Layout)
- `/product`: Cartões e componentes relacionados a produtos
- `/ui`: Componentes de interface de usuário básicos (shadcn/ui)

## Convenções

- Cada componente deve estar em seu próprio arquivo
- Componentes devem seguir a convenção PascalCase para nome de arquivos e componentes
- Todos os componentes devem usar a sintaxe de Function Component
- Propriedades (props) devem ser tipadas usando interfaces TypeScript

## Componentes Principais

### Página Inicial
- `FlashSaleSection.tsx`: Exibe os combos promocionais
- `CategoryCards.tsx`: Exibe as categorias de produtos
- `BrandsSection.tsx`: Exibe as marcas parceiras
- `HeroBanner.tsx`: Banner principal rotativo

### Administração
- `admin/products/ProductDialog.tsx`: Formulário para criar/editar produtos e combos
- `admin/layout/SidebarMenu.tsx`: Menu de navegação administrativa

### Checkout
- `checkout/OrderSummary.tsx`: Resumo do pedido durante checkout
- `checkout/ShippingMethodForm.tsx`: Seleção de método de envio
