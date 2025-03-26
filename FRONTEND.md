
# Imperio Farmácia - Documentação Frontend

## Visão Geral

O frontend da Imperio Farmácia é construído com React, TypeScript e Tailwind CSS, utilizando a biblioteca de componentes Shadcn/UI. A arquitetura segue princípios modernos de desenvolvimento web, com foco em componentização, reusabilidade e responsividade.

## Estrutura de Pastas

### `/src/components`

Contém todos os componentes React reutilizáveis, organizados por domínio:

- `/admin`: Componentes específicos para o painel administrativo
- `/auth`: Componentes relacionados à autenticação
- `/cart`: Componentes para o carrinho de compras
- `/chatbot`: Componentes do assistente virtual
- `/checkout`: Componentes para o processo de finalização de compra
- `/home`: Componentes específicos da página inicial
- `/layout`: Componentes estruturais (header, footer, layouts)
- `/product`: Componentes relacionados a produtos
- `/ui`: Componentes base do Shadcn/UI

### `/src/contexts`

Contém os contextos React para gerenciamento de estado global:

- `CartContext.tsx`: Gerencia o estado do carrinho de compras
- `CheckoutContext.tsx`: Gerencia o estado do processo de checkout

### `/src/data`

Contém dados estáticos e mocks para desenvolvimento:

- `/mock`: Dados fictícios para produtos, categorias, marcas, etc.

### `/src/hooks`

Custom hooks para lógica reutilizável:

- `/products`: Hooks específicos para gerenciamento de produtos
- `useAuth.tsx`: Hook para autenticação
- `useMobile.tsx`: Hook para detecção de dispositivos móveis
- E outros hooks utilitários

### `/src/integrations`

Código para integração com serviços externos:

- `/supabase`: Cliente e configurações para Supabase

### `/src/lib`

Utilitários e helpers:

- `formatters.ts`: Funções para formatação de dados
- `utils.ts`: Funções utilitárias gerais

### `/src/pages`

Componentes de página completa, mapeados para rotas:

- `/admin`: Páginas do painel administrativo
- Outras páginas da loja (home, produtos, checkout, etc.)

## Fluxo de Dados

1. **Dados Externos**: Obtidos do Supabase via `integrations/supabase`
2. **Estado Global**: Gerenciado via React Context (`contexts/`)
3. **Estado Local**: Gerenciado com `useState` e React Query
4. **Renderização**: Componentes recebem dados via props e hooks

## Estilos e UI

- **Tailwind CSS**: Sistema principal de estilização
- **Shadcn/UI**: Componentes base pré-estilizados
- **Classes Personalizadas**: Definidas no `tailwind.config.ts`
- **Temas de Cores**: Cores da marca Imperio aplicadas consistentemente

## Responsividade

O design é totalmente responsivo, utilizando:

- Grid layouts flexíveis
- Media queries via classes Tailwind (`sm:`, `md:`, `lg:`, etc.)
- Componentes adaptáveis para diferentes tamanhos de tela
- Navegação específica para dispositivos móveis

## Animações e Interações

- Transições suaves entre estados
- Efeitos de hover
- Feedback visual para ações do usuário
- Modal de confirmação para adição ao carrinho

## Rotas

Gerenciadas com React Router:

- `/`: Página inicial
- `/produtos/:id`: Detalhes do produto
- `/categorias/:id`: Produtos por categoria
- `/marcas/:id`: Produtos por marca
- `/carrinho`: Carrinho de compras
- `/checkout/dados`: Formulário de dados para checkout
- `/checkout/resumo`: Resumo do pedido
- `/checkout/pagamento`: Página de pagamento
- `/admin/*`: Rotas do painel administrativo (protegidas)

## Práticas de Desenvolvimento

- **Componentização**: Componentes pequenos e focados
- **TypeScript**: Tipagem forte para todos os componentes e funções
- **Memoização**: Uso de `React.memo` e `useMemo` para otimização
- **Lazy Loading**: Carregamento sob demanda para rotas menos frequentes
- **Testes**: Principais componentes e lógicas testados

## Performance

- Otimização de imagens
- Code splitting
- Minificação de assets
- Carregamento priorizado de conteúdo visível
- Pré-busca de dados para navegação mais fluida
