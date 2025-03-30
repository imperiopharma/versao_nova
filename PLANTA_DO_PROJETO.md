
# Planta Completa do Projeto Imperio Pharma

## Estrutura de Diretórios e Arquivos

```
imperio-pharma/
│
├── node_modules/             # Pacotes e dependências instalados
│
├── public/                   # Arquivos estáticos acessíveis diretamente
│   ├── favicon.ico           # Ícone da página
│   ├── robots.txt            # Configurações para mecanismos de busca
│   └── placeholder.svg       # Imagem de placeholder
│
├── src/                      # Código-fonte do projeto
│   │
│   ├── components/           # Componentes reutilizáveis
│   │   │
│   │   ├── auth/             # Componentes de autenticação
│   │   │   ├── AdminAuthGuard.tsx  # Proteção de rotas admin
│   │   │   ├── AdminLogout.tsx     # Componente de logout admin
│   │   │   └── README.md           # Documentação dos componentes
│   │   │
│   │   ├── cart/             # Componentes do carrinho
│   │   │   ├── CartItem.tsx        # Item do carrinho
│   │   │   ├── CartSummary.tsx     # Resumo do carrinho
│   │   │   └── README.md           # Documentação dos componentes
│   │   │
│   │   ├── chatbot/          # Componente do assistente virtual
│   │   │   ├── VirtualAssistant.tsx   # Assistente virtual
│   │   │   └── README.md            # Documentação do componente
│   │   │
│   │   ├── checkout/         # Componentes de checkout
│   │   │   ├── CheckoutForm.tsx     # Formulário de checkout
│   │   │   ├── OrderSummary.tsx     # Resumo do pedido
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── home/             # Componentes da página inicial
│   │   │   ├── BrandsSection.tsx    # Seção de marcas
│   │   │   ├── CategoryCards.tsx    # Cards de categorias 
│   │   │   ├── FlashSaleSection.tsx # Seção de promoções
│   │   │   ├── HeroBanner.tsx       # Banner principal
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── layout/           # Componentes de layout
│   │   │   ├── Footer.tsx           # Rodapé do site
│   │   │   ├── Header.tsx           # Cabeçalho do site
│   │   │   ├── Layout.tsx           # Layout principal
│   │   │   ├── MobileNavBar.tsx     # Navegação mobile
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── product/          # Componentes de produto
│   │   │   ├── ProductCard.tsx      # Card de produto
│   │   │   ├── ProductDetails.tsx   # Detalhes do produto
│   │   │   ├── ProductList.tsx      # Lista de produtos
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   └── ui/               # Componentes UI base (shadcn)
│   │       ├── button.tsx           # Componente de botão
│   │       ├── card.tsx             # Componente de card
│   │       ├── dialog.tsx           # Componente de diálogo
│   │       └── README.md            # Documentação dos componentes
│   │
│   ├── admin/                # Componentes do painel administrativo
│   │   │
│   │   ├── dashboard/        # Dashboard administrativo
│   │   │   ├── DashboardStats.tsx   # Estatísticas do dashboard
│   │   │   ├── SalesChart.tsx       # Gráfico de vendas
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── layout/           # Layout do painel admin
│   │   │   ├── AdminLayout.tsx      # Layout principal do admin
│   │   │   ├── Sidebar.tsx          # Barra lateral de navegação
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── products/         # Gerenciamento de produtos
│   │   │   ├── ProductsList.tsx     # Lista de produtos
│   │   │   ├── BrandsList.tsx       # Lista de marcas
│   │   │   ├── CategoriesList.tsx   # Lista de categorias
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── orders/           # Gerenciamento de pedidos
│   │   │   ├── OrdersList.tsx       # Lista de pedidos
│   │   │   ├── OrdersFilter.tsx     # Filtro de pedidos
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── customers/        # Gerenciamento de clientes
│   │   │   ├── CustomersList.tsx    # Lista de clientes
│   │   │   ├── CustomerDialog.tsx   # Diálogo de cliente
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── finance/          # Relatórios financeiros
│   │   │   ├── FinanceStats.tsx     # Estatísticas financeiras 
│   │   │   ├── SalesByCategoryChart.tsx # Gráfico de vendas por categoria
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   └── settings/         # Configurações do sistema
│   │       ├── SettingsTemplates.tsx # Templates de configuração
│   │       └── README.md            # Documentação dos componentes
│   │
│   ├── contexts/             # Contextos para gerenciamento de estado
│   │   ├── CartContext.tsx          # Contexto do carrinho
│   │   ├── CheckoutContext.tsx      # Contexto de checkout
│   │   └── README.md                # Documentação dos contextos
│   │
│   ├── data/                 # Dados estáticos e mocks
│   │   ├── mock/                    # Dados fictícios para desenvolvimento
│   │   └── README.md                # Documentação dos dados
│   │
│   ├── hooks/                # Hooks personalizados
│   │   ├── useAuth.tsx              # Hook de autenticação
│   │   ├── useBrands.tsx            # Hook para marcas
│   │   ├── useCategories.tsx        # Hook para categorias
│   │   ├── useProducts.tsx          # Hook para produtos
│   │   └── README.md                # Documentação dos hooks
│   │
│   ├── integrations/         # Integrações externas
│   │   ├── supabase/                # Configuração do Supabase
│   │   │   ├── client.ts            # Cliente Supabase
│   │   │   └── types.ts             # Tipos do Supabase
│   │   └── README.md                # Documentação das integrações
│   │
│   ├── lib/                  # Funções utilitárias
│   │   ├── formatters.ts             # Formatadores (dinheiro, data)
│   │   ├── utils.ts                  # Utilidades gerais
│   │   └── README.md                 # Documentação das utilidades
│   │
│   ├── pages/                # Páginas da aplicação
│   │   ├── admin/                   # Páginas administrativas
│   │   │   ├── Dashboard.tsx        # Página principal do admin
│   │   │   ├── ProductsPage.tsx     # Página de produtos
│   │   │   ├── OrdersPage.tsx       # Página de pedidos
│   │   │   ├── CustomersPage.tsx    # Página de clientes
│   │   │   ├── FinancePage.tsx      # Página financeira
│   │   │   ├── SettingsPage.tsx     # Página de configurações
│   │   │   ├── LoginPage.tsx        # Página de login admin
│   │   │   └── README.md            # Documentação das páginas
│   │   │
│   │   ├── HomePage.tsx             # Página inicial
│   │   ├── ProductDetailsPage.tsx   # Página de detalhes do produto
│   │   ├── CategoryProductsPage.tsx # Página de produtos por categoria
│   │   ├── BrandProductsPage.tsx    # Página de produtos por marca
│   │   ├── CartPage.tsx             # Página do carrinho
│   │   ├── CheckoutDadosPage.tsx    # Página de dados do checkout
│   │   ├── LoginPage.tsx            # Página de login
│   │   ├── NotFound.tsx             # Página 404
│   │   └── README.md                # Documentação das páginas
│   │
│   ├── types/                # Definições de tipos
│   │   ├── product.ts               # Tipos de produto
│   │   ├── category.ts              # Tipos de categoria
│   │   ├── brand.ts                 # Tipos de marca
│   │   ├── hero.ts                  # Tipos do hero banner
│   │   ├── orders.ts                # Tipos de pedidos
│   │   └── README.md                # Documentação dos tipos
│   │
│   ├── App.tsx               # Componente raiz da aplicação
│   └── main.tsx              # Ponto de entrada
│
├── supabase/                 # Configuração do Supabase
│   └── config.toml           # Configuração do Supabase
│
├── .env.example              # Exemplo de variáveis de ambiente
├── index.html                # Arquivo HTML de entrada
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração do TypeScript
├── tailwind.config.js        # Configuração do Tailwind CSS
│
├── README.md                 # Documentação principal do projeto
├── CONEXAO_FRONT_BACK.md     # Documentação da conexão frontend-backend
├── BANCO_DE_DADOS.sql        # Script SQL para criar o banco de dados
└── PLANTA_DO_PROJETO.md      # Este arquivo (planta do projeto)
```

## Detalhes Estruturais

### Loja (Frontend)

- **components/**: Contém todos os componentes reutilizáveis organizados por função
- **pages/**: Páginas completas da loja, como Homepage, Detalhes do Produto, etc.
- **contexts/**: Gerenciamento de estado global (carrinho, checkout)
- **hooks/**: Hooks personalizados para lógica reutilizável

### Painel Administrativo (Backend)

- **admin/**: Componentes específicos do painel administrativo organizados por função
- **pages/admin/**: Páginas completas do painel administrativo
- **hooks/**: Hooks para gerenciar dados do painel (produtos, pedidos, etc)

### Integração

- **integrations/supabase/**: Configuração da conexão com o Supabase
- **lib/**: Funções utilitárias para formatação e manipulação de dados

Esta estrutura reflete exatamente a organização atual do projeto conforme solicitado.
