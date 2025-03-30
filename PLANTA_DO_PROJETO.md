
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
│   ├── placeholder.svg       # Imagem de placeholder
│   └── images/               # Imagens utilizadas na aplicação
│
├── src/                      # Código-fonte do projeto
│   │
│   ├── components/           # Componentes reutilizáveis
│   │   │
│   │   ├── admin/            # Componentes administrativos
│   │   │   ├── common/       # Componentes compartilhados
│   │   │   ├── coupons/      # Gerenciamento de cupons
│   │   │   ├── customers/    # Gerenciamento de clientes
│   │   │   ├── dashboard/    # Componentes do dashboard
│   │   │   ├── finance/      # Relatórios financeiros
│   │   │   ├── layout/       # Layout administrativo
│   │   │   ├── orders/       # Gerenciamento de pedidos
│   │   │   ├── products/     # Gerenciamento de produtos e combos
│   │   │   └── settings/     # Configurações do sistema
│   │   │
│   │   ├── auth/             # Componentes de autenticação
│   │   │   ├── AdminAuthGuard.tsx  # Proteção de rotas admin
│   │   │   ├── AdminLogout.tsx     # Componente de logout admin
│   │   │   └── README.md           # Documentação dos componentes
│   │   │
│   │   ├── cart/             # Componentes do carrinho
│   │   │   ├── CartItem.tsx        # Item do carrinho
│   │   │   ├── CartSummary.tsx     # Resumo do carrinho
│   │   │   ├── AddedToCartModal.tsx # Modal de item adicionado
│   │   │   └── README.md           # Documentação dos componentes
│   │   │
│   │   ├── checkout/         # Componentes de checkout
│   │   │   ├── coupon/             # Componentes de cupom
│   │   │   ├── shipping/           # Componentes de envio
│   │   │   ├── CheckoutForm.tsx    # Formulário de checkout
│   │   │   ├── OrderSummary.tsx    # Resumo do pedido
│   │   │   └── README.md           # Documentação dos componentes
│   │   │
│   │   ├── home/             # Componentes da página inicial
│   │   │   ├── BrandsSection.tsx    # Seção de marcas
│   │   │   ├── CategoryCards.tsx    # Cards de categorias 
│   │   │   ├── FlashSaleSection.tsx # Seção de combos
│   │   │   ├── HeroBanner.tsx       # Banner principal
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── layout/           # Componentes de layout
│   │   │   ├── header/             # Componentes do cabeçalho
│   │   │   ├── Footer.tsx          # Rodapé do site
│   │   │   ├── Header.tsx          # Cabeçalho do site
│   │   │   ├── Layout.tsx          # Layout principal
│   │   │   ├── MobileNavBar.tsx    # Navegação mobile
│   │   │   └── README.md           # Documentação dos componentes
│   │   │
│   │   ├── product/          # Componentes de produto
│   │   │   ├── ProductCard.tsx      # Card de produto
│   │   │   ├── ProductDetails.tsx   # Detalhes do produto
│   │   │   ├── ProductList.tsx      # Lista de produtos
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   ├── ui/               # Componentes UI base (shadcn)
│   │   │   ├── button.tsx           # Componente de botão
│   │   │   ├── card.tsx             # Componente de card
│   │   │   ├── dialog.tsx           # Componente de diálogo
│   │   │   └── README.md            # Documentação dos componentes
│   │   │
│   │   └── README.md         # Documentação geral dos componentes
│   │
│   ├── contexts/             # Contextos para gerenciamento de estado
│   │   ├── CartContext.tsx          # Contexto do carrinho
│   │   ├── CheckoutContext.tsx      # Contexto de checkout
│   │   └── README.md                # Documentação dos contextos
│   │
│   ├── data/                 # Dados estáticos e mocks
│   │   ├── mock/                    # Dados fictícios para desenvolvimento
│   │   │   ├── brands.ts            # Marcas fictícias
│   │   │   ├── categories.tsx       # Categorias fictícias 
│   │   │   ├── faq.ts               # Perguntas frequentes
│   │   │   ├── hero.ts              # Dados do hero banner
│   │   │   └── products.ts          # Produtos fictícios incluindo combos
│   │   └── README.md                # Documentação dos dados
│   │
│   ├── hooks/                # Hooks personalizados
│   │   ├── products/                # Hooks específicos de produtos
│   │   │   ├── useProductToast.ts   # Notificações de produtos
│   │   │   ├── useProducts.ts       # Operações com produtos e combos
│   │   │   └── README.md            # Documentação dos hooks
│   │   ├── useAuth.tsx              # Hook de autenticação
│   │   ├── useBrands.tsx            # Hook para marcas
│   │   ├── useCategories.tsx        # Hook para categorias
│   │   ├── useHomeData.tsx          # Hook para dados da página inicial
│   │   ├── useOrdersData.ts         # Hook para pedidos
│   │   ├── useProductStore.ts       # Hook para administração de produtos
│   │   └── README.md                # Documentação dos hooks
│   │
│   ├── integrations/         # Integrações externas
│   │   ├── supabase/                # Configuração do Supabase
│   │   │   ├── client.ts            # Cliente Supabase
│   │   │   ├── types.ts             # Tipos do Supabase
│   │   │   └── README.md            # Documentação da integração
│   │   └── README.md                # Documentação das integrações
│   │
│   ├── lib/                  # Funções utilitárias
│   │   ├── formatters.ts            # Formatadores (dinheiro, data)
│   │   ├── utils.ts                 # Utilidades gerais
│   │   └── README.md                # Documentação das utilidades
│   │
│   ├── pages/                # Páginas da aplicação
│   │   ├── admin/                   # Páginas administrativas
│   │   │   ├── CouponsPage.tsx      # Página de cupons
│   │   │   ├── CustomersPage.tsx    # Página de clientes
│   │   │   ├── Dashboard.tsx        # Dashboard administrativo
│   │   │   ├── FinancePage.tsx      # Página financeira
│   │   │   ├── LoginPage.tsx        # Página de login admin
│   │   │   ├── OrdersPage.tsx       # Página de pedidos
│   │   │   ├── ProductsPage.tsx     # Página de produtos e combos
│   │   │   ├── SettingsPage.tsx     # Página de configurações
│   │   │   └── README.md            # Documentação das páginas
│   │   │
│   │   ├── HomePage.tsx             # Página inicial
│   │   ├── CombosPage.tsx           # Página de combos
│   │   ├── ProductDetailsPage.tsx   # Página de detalhes do produto
│   │   ├── CategoryProductsPage.tsx # Página de produtos por categoria
│   │   ├── BrandProductsPage.tsx    # Página de produtos por marca
│   │   ├── CartPage.tsx             # Página do carrinho
│   │   ├── CheckoutDadosPage.tsx    # Página de dados do checkout
│   │   ├── CheckoutResumoPage.tsx   # Página de resumo do checkout
│   │   ├── CheckoutPagamentoPage.tsx # Página de pagamento
│   │   ├── LoginPage.tsx            # Página de login
│   │   ├── NotFound.tsx             # Página 404
│   │   └── README.md                # Documentação das páginas
│   │
│   ├── services/             # Serviços da aplicação
│   │   ├── apiService.ts            # Serviço de comunicação com API
│   │   ├── storageService.ts        # Serviço de armazenamento
│   │   └── README.md                # Documentação dos serviços
│   │
│   ├── types/                # Definições de tipos
│   │   ├── product.ts               # Tipos de produto e combo
│   │   ├── category.ts              # Tipos de categoria
│   │   ├── brand.ts                 # Tipos de marca
│   │   ├── hero.ts                  # Tipos do hero banner
│   │   ├── orders.ts                # Tipos de pedidos
│   │   └── README.md                # Documentação dos tipos
│   │
│   ├── App.tsx               # Componente raiz da aplicação
│   ├── main.tsx              # Ponto de entrada
│   └── README.md             # Documentação geral da estrutura
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

## Guia de Seções e Funcionalidades

### 1. Sistema de Combos

#### Componentes Envolvidos
- **Home**
  - `FlashSaleSection.tsx`: Exibe combos em destaque na página inicial
  
- **Produto**
  - `ProductCard.tsx`: Exibe produtos e combos com indicação visual apropriada
  - `ProductDetails.tsx`: Mostra informações detalhadas de produto ou combo

- **Administração**
  - `ProductDialog.tsx`: Formulário para criação e edição de produtos/combos
  - `ProductsList.tsx`: Listagem de produtos e combos no painel administrativo
  
- **Checkout**
  - `OrderSummary.tsx`: Exibe resumo do pedido com combos destacados
  - `CartSummary.tsx`: Calcula valores totais considerando descontos de combos

#### Fluxo de Criação de Combos
1. Administrador acessa `/admin/produtos`
2. Clica em "Adicionar Produto"
3. Preenche informações básicas do produto
4. Ativa a opção "É um combo?"
5. Define percentual de desconto para o combo
6. Informa preço original
7. Sistema calcula automaticamente preço com desconto
8. Salva o combo

#### Exibição na Loja
- Combos aparecem destacados na seção "Combos Especiais" da página inicial
- Combos possuem indicação clara de desconto aplicado
- Página dedicada de combos (`/combos`) mostra todos os combos disponíveis

### 2. Painel Administrativo

#### Menu Principal
- Dashboard: Visão geral e métricas
- Pedidos: Gerenciamento de vendas
- Produtos: Gerenciamento de produtos individuais
- Combos: Gerenciamento específico de combos promocionais
- Categorias: Organização de produtos
- Clientes: Gerenciamento de clientes
- Cupons: Descontos promocionais
- Financeiro: Relatórios e análises
- Configurações: Configurações do sistema

#### Relatórios para Combos
- Total de vendas por combo
- Comparativo de desempenho entre combos
- Impacto dos combos na receita total
- Taxa de conversão de combos

### 3. Checkout e Carrinho

#### Carrinho
- Exibe claramente quais itens são combos
- Mostra preço original e preço com desconto
- Calcula economia total gerada pelos combos

#### Checkout
- Mantém indicação visual para combos em todas as etapas
- Aplica corretamente descontos de combos no valor final
- Permite uso de cupons adicionais (conforme regras)
- Mostra resumo claro da economia total

### 4. Integrações com Supabase

#### Estrutura de Dados para Combos
- Tabela `products` com campos específicos:
  - `is_combo`: Flag indicando se é um combo
  - `combo_discount`: Percentual de desconto
  - `original_price`: Preço original
  - `price`: Preço com desconto aplicado

#### Consultas Principais
- Listagem de todos os combos
- Busca de combo específico
- Relatórios de vendas de combos
- Estatísticas de desempenho

### 5. Páginas Principais

#### Loja
- Página Inicial: Exibe combos em destaque e categorias
- Página de Combos: Lista todos os combos disponíveis
- Detalhes do Produto/Combo: Informações completas sobre um item
- Carrinho: Itens selecionados com resumo de valores
- Checkout: Processo completo de finalização de compra

#### Administração
- Dashboard: Visão geral com métricas e gráficos
- Produtos: Gerenciamento completo de produtos e combos
- Pedidos: Acompanhamento e gestão de vendas
- Financeiro: Relatórios e análises de desempenho
- Configurações: Personalização do comportamento do sistema

### 6. Contextos e Estado Global

#### CartContext
- Gerencia itens no carrinho (produtos e combos)
- Calcula valores considerando descontos de combos
- Fornece funções para adicionar/remover itens

#### CheckoutContext
- Gerencia progresso pelas etapas de checkout
- Armazena dados de cliente, envio e pagamento
- Coordena finalização do pedido com combos

### 7. Hooks Personalizados

#### useProducts
- Fornece acesso a produtos e combos
- Filtra produtos por diversos critérios
- Oferece funções específicas para manipulação de combos

#### useProductStore
- Gerencia operações CRUD para produtos e combos no admin
- Lida com upload de imagens
- Calcula preços com desconto automaticamente
```
