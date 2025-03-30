
# Imperio Pharma - Projeto Fullstack

## Visão Geral

Este é o projeto completo da loja virtual Imperio Pharma, construído com React, TypeScript, Tailwind CSS e Supabase. O projeto está dividido em duas partes principais:

1. **Frontend (Loja)**: Interface de usuário com React e componentes Shadcn/UI
2. **Backend (Painel Administrativo e API)**: Utilizamos Supabase como serviço de backend (BaaS)

## Estrutura do Projeto

A estrutura do projeto foi organizada conforme solicitado, com pastas específicas para cada parte funcional da loja e do painel administrativo. Cada componente está em sua própria pasta com arquivos de um único tipo por pasta.

```
/
├── src/                            # Código-fonte principal
│   ├── components/                 # Componentes React reutilizáveis
│   │   ├── auth/                   # Componentes de autenticação
│   │   ├── cart/                   # Componentes do carrinho
│   │   ├── checkout/               # Componentes de checkout
│   │   ├── home/                   # Componentes da página inicial
│   │   ├── layout/                 # Componentes estruturais (header, footer)
│   │   ├── product/                # Componentes de produto
│   │   └── ui/                     # Componentes UI base (shadcn)
│   ├── admin/                      # Componentes do painel administrativo
│   │   ├── dashboard/              # Dashboard principal
│   │   ├── products/               # Gestão de produtos
│   │   ├── orders/                 # Gestão de pedidos
│   │   ├── customers/              # Gestão de clientes
│   │   ├── finance/                # Relatórios financeiros
│   │   └── settings/               # Configurações do sistema
│   ├── contexts/                   # Contextos para gerenciamento de estado
│   ├── data/                       # Dados estáticos e tipos
│   ├── hooks/                      # Custom hooks React
│   ├── integrations/               # Integrações com serviços externos (Supabase)
│   ├── lib/                        # Utilitários e helpers
│   ├── pages/                      # Componentes de página
│   │   ├── admin/                  # Páginas do painel administrativo
│   │   └── shop/                   # Páginas da loja
│   ├── types/                      # Definições de tipos TypeScript
│   └── App.tsx                     # Componente principal da aplicação
├── supabase/                       # Configurações do Supabase
└── public/                         # Arquivos estáticos
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
- Row Level Security (RLS)
- Edge Functions

## Status do Projeto

O projeto está completamente funcional com todas as seguintes características:

- ✅ Loja frontend completa
- ✅ Painel administrativo
- ✅ Autenticação de usuários
- ✅ Conexão com banco de dados Supabase
- ✅ Gerenciamento de produtos, categorias e marcas
- ✅ Gerenciamento de pedidos e clientes
- ✅ Relatórios financeiros
- ✅ Responsividade para dispositivos móveis

## Executando o Projeto

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra http://localhost:5173 no navegador

Para mais detalhes sobre a conexão entre frontend e backend, consulte o arquivo `CONEXAO_FRONT_BACK.md`.
