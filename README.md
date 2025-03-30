
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
│   │   ├── admin/                  # Componentes do painel administrativo
│   │   ├── auth/                   # Componentes de autenticação
│   │   ├── cart/                   # Componentes do carrinho
│   │   ├── checkout/               # Componentes de checkout
│   │   ├── home/                   # Componentes da página inicial
│   │   ├── layout/                 # Componentes estruturais (header, footer)
│   │   ├── product/                # Componentes de produto
│   │   └── ui/                     # Componentes UI base (shadcn)
│   ├── contexts/                   # Contextos para gerenciamento de estado
│   ├── data/                       # Dados estáticos e mocks
│   ├── hooks/                      # Custom hooks React
│   ├── integrations/               # Integrações com serviços externos (Supabase)
│   ├── lib/                        # Utilitários e helpers
│   ├── pages/                      # Componentes de página
│   ├── services/                   # Serviços de API e integrações
│   └── types/                      # Definições de tipos TypeScript
```

## Funcionalidades Principais

### Sistema de Combos

A loja conta com um sistema completo de combos promocionais:

- **Criação de Combos**:
  - Interface administrativa dedicada
  - Configuração de percentual de desconto
  - Definição de preços originais e com desconto
  - Upload de imagens para combos

- **Exibição de Combos**:
  - Seção "Combos Especiais" na página inicial
  - Página dedicada de combos
  - Indicação visual clara de descontos
  - Destaque para valor economizado

- **Gerenciamento no Carrinho e Checkout**:
  - Identificação visual de combos no carrinho
  - Cálculo correto de descontos
  - Compatibilidade com cupons adicionais
  - Resumo claro de economia total

### Painel Administrativo

O sistema inclui um painel administrativo completo:

- **Dashboard com métricas**:
  - Visão geral de vendas
  - Desempenho de combos
  - Principais indicadores

- **Gestão de Produtos e Combos**:
  - Interface para criação e edição
  - Categorização e organização
  - Upload de imagens

- **Gerenciamento de Pedidos**:
  - Acompanhamento de status
  - Histórico completo
  - Filtragem e busca

- **Relatórios Financeiros**:
  - Análise de desempenho
  - Relatórios por período
  - Gráficos e visualizações

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

## Executando o Projeto

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
- Crie um arquivo `.env` baseado no `.env.example`
- Adicione as credenciais do Supabase

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação:
- Loja: http://localhost:5173
- Painel Administrativo: http://localhost:5173/admin

## Acesso ao Painel Administrativo

Para acessar o painel administrativo:
- URL: `/admin/login`
- Email: admin@exemplo.com
- Senha: admin123

## Documentação Adicional

Para informações detalhadas sobre a estrutura e implementação do projeto, consulte:

- `PLANTA_DO_PROJETO.md`: Mapa completo da estrutura do projeto
- `BANCO_DE_DADOS.sql`: Script SQL para criar o banco de dados
- `CONEXAO_FRONT_BACK.md`: Detalhes sobre a conexão entre frontend e backend
