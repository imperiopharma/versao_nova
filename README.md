
# Imperio Farmácia - Projeto Frontend e Backend

## Visão Geral

Este é o projeto da loja virtual Imperio Farmácia, construído com React, TypeScript, Tailwind CSS e Supabase. O projeto é dividido em duas partes principais:

1. **Frontend**: Interface de usuário com React e componentes Shadcn/UI
2. **Backend**: Utilizamos Supabase como serviço de backend (BaaS)

## Estrutura do Projeto

```
/
├── src/                    # Código-fonte frontend
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── admin/          # Componentes do painel administrativo
│   │   ├── auth/           # Componentes de autenticação
│   │   ├── cart/           # Componentes relacionados ao carrinho
│   │   ├── checkout/       # Componentes de checkout e finalização de compra
│   │   ├── home/           # Componentes específicos da página inicial
│   │   ├── layout/         # Componentes de estrutura (header, footer, etc)
│   │   ├── product/        # Componentes relacionados a produtos
│   │   └── ui/             # Componentes de UI base (shadcn)
│   ├── contexts/           # Contextos para gerenciamento de estado (CartContext, etc)
│   ├── data/               # Dados estáticos e mocks
│   │   └── mock/           # Dados fictícios para desenvolvimento
│   ├── hooks/              # Custom hooks React
│   │   └── products/       # Hooks específicos para produtos
│   ├── integrations/       # Integrações com serviços externos
│   │   └── supabase/       # Cliente e configurações do Supabase
│   ├── lib/                # Utilitários e helpers
│   ├── pages/              # Componentes de página
│   │   └── admin/          # Páginas do painel administrativo
│   ├── services/           # Serviços para APIs
│   └── types/              # Definições de tipos TypeScript
├── supabase/               # Configurações do Supabase
└── public/                 # Arquivos estáticos
```

## Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/UI (componentes)
- Framer Motion (animações)
- React Router (roteamento)
- Tanstack React Query (gerenciamento de dados)

### Backend (Supabase)
- Banco de dados PostgreSQL
- Autenticação e Autorização
- Storage para arquivos
- Funções Edge Functions
- Realtime subscriptions

## Funcionalidades Principais

- **Loja**: Catálogo de produtos, carrinho, checkout
- **Admin**: Painel administrativo completo (produtos, pedidos, clientes)
- **Conteúdo**: Blog, FAQs, páginas informativas
- **Marketing**: Newsletter, cupons, promoções

## Executando o Projeto

1. Instale as dependências:
```
npm install
```

2. Inicie o servidor de desenvolvimento:
```
npm run dev
```

3. Abra http://localhost:8080 no navegador

## Detalhes da Implementação

Cada pasta principal contém um arquivo README.md com informações detalhadas sobre seu conteúdo e uso. Consulte também os arquivos FRONTEND.md e BACKEND.md para documentação específica.
