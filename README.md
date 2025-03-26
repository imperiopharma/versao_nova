
# Imperio Farmácia - Projeto Frontend e Backend

## Visão Geral

Este é o projeto da loja virtual Imperio Farmácia, construído com React, TypeScript, Tailwind CSS e Supabase. O projeto é dividido em duas partes principais:

1. **Frontend**: Interface de usuário com React e componentes Shadcn/UI
2. **Backend**: Utilizamos Supabase como serviço de backend (BaaS)

## Estrutura do Projeto

```
/
├── src/                    # Código-fonte frontend
│   ├── components/         # Componentes React
│   ├── contexts/           # Contextos para gerenciamento de estado
│   ├── data/               # Dados estáticos e mocks
│   ├── hooks/              # Custom hooks React
│   ├── integrations/       # Integrações com serviços externos
│   ├── lib/                # Utilitários e helpers
│   ├── pages/              # Componentes de página
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

## Estrutura Detalhada

Cada pasta principal contém um arquivo README.md com informações detalhadas sobre seu conteúdo e uso.
