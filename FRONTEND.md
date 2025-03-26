
# Documentação Frontend

## Arquitetura

O frontend da loja Imperio Farmácia é construído com uma arquitetura baseada em componentes usando React 18 com TypeScript. A aplicação utiliza:

- **React** para construção de UI com componentes
- **TypeScript** para tipagem estática
- **Tailwind CSS** para estilização
- **Shadcn/UI** para componentes reutilizáveis
- **React Router** para navegação
- **Context API** para gerenciamento de estado global
- **Custom Hooks** para lógica reutilizável

## Estrutura de Diretórios

```
src/
├── components/           # Componentes React organizados por função
│   ├── admin/            # Componentes do painel administrativo
│   ├── auth/             # Componentes de autenticação
│   ├── cart/             # Componentes do carrinho
│   ├── chatbot/          # Assistente virtual
│   ├── checkout/         # Processo de finalização de compra
│   ├── home/             # Seções da página inicial
│   ├── layout/           # Estrutura comum (Header, Footer)
│   ├── product/          # Componentes de exibição de produtos
│   └── ui/               # Componentes básicos de UI (shadcn)
├── contexts/             # Context API para estado global
├── hooks/                # Custom hooks React
├── lib/                  # Utilitários gerais
├── pages/                # Componentes de página completa
└── types/                # Definições de tipos TypeScript
```

## Fluxo de Dados

1. **Estado Global**: Gerenciado via Context API (carrinho, autenticação)
2. **Estado Local**: Gerenciado via useState e useReducer em componentes
3. **Fetch de Dados**: Através de custom hooks que encapsulam lógica de API
4. **Props Drilling**: Minimizado através do uso de Context e composição de componentes

## Componentes Principais

### Layout

- `Layout.tsx`: Wrapper que aplica Header, Footer e estrutura base
- `Header.tsx`: Navegação principal, login, carrinho
- `Footer.tsx`: Links de rodapé, informações de contato
- `MobileNavBar.tsx`: Navegação mobile-friendly

### Página Inicial

A homepage (`HomePage.tsx`) é composta por múltiplas seções:
- Banner principal rotativo
- Categorias de produtos
- Produtos em destaque
- Seção de promoções
- Marcas parceiras
- Informações de garantia
- Newsletter
- FAQ

### Produtos

- `ProductCard.tsx`: Exibição compacta de produto com preço, imagem, ações
- `ProductDetailsPage.tsx`: Página detalhada de produto individual

### Carrinho e Checkout

- Sistema de carrinho persistente via Context API
- Processo de checkout em múltiplas etapas
- Formulários para dados de envio e pagamento

### Painel Administrativo

Interface completa para gestão da loja:
- Dashboard com estatísticas
- Gerenciamento de produtos, categorias e marcas
- Monitoramento de pedidos
- Relatórios financeiros
- Dados de clientes

## Fluxo de Navegação

1. Usuário navega pela homepage ou categorias
2. Ao selecionar produto, visualiza detalhes
3. Adiciona ao carrinho, que atualiza instantaneamente
4. Finaliza compra através do processo de checkout
5. Recebe confirmação de pedido

## Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- Desktop: Layout completo com sidebar de navegação
- Tablet: Layout adaptado com elementos reorganizados
- Mobile: Interface simplificada com menu hamburger e navegação inferior

## Convenções de Código

- **Nomes de Componentes**: PascalCase (ex: `ProductCard.tsx`)
- **Nomes de Hooks**: camelCase com prefixo "use" (ex: `useProducts.tsx`)
- **Props**: Interface TypeScript para todas as props
- **Estilos**: Classes Tailwind priorizando utilidades compostas

## Performance

- Carregamento lazy de componentes para código-splitting
- Otimização de imagens
- Memoização de componentes pesados com React.memo
- Debounce em operações frequentes como busca
