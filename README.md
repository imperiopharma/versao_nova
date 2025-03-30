
# Imperio Pharma - Projeto Fullstack

## Visão Geral

Este é o projeto completo da loja virtual Imperio Pharma, construído com React, TypeScript, Tailwind CSS e APIs RESTful. O projeto está dividido em duas partes principais:

1. **Frontend (Loja)**: Interface de usuário com React, TypeScript e componentes Shadcn/UI
2. **Backend (API)**: Serviços RESTful para gerenciamento de dados

## Estrutura do Projeto

A estrutura do projeto foi organizada de forma modular, com pastas específicas para cada parte funcional da loja e do painel administrativo.

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
│   ├── integrations/               # Integrações com serviços externos
│   ├── lib/                        # Utilitários e helpers
│   ├── pages/                      # Componentes de página
│   ├── services/                   # Serviços de API e integrações
│   │   ├── apiClient.ts            # Cliente axios configurado
│   │   ├── productService.ts       # Serviço para produtos
│   │   ├── categoryService.ts      # Serviço para categorias
│   │   ├── brandService.ts         # Serviço para marcas
│   │   ├── customerService.ts      # Serviço para clientes
│   │   └── apiService.ts           # Centralização dos serviços
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
- Axios (comunicação com API)
- React Router (roteamento)
- Tanstack React Query (gerenciamento de dados)

### Backend
- API RESTful
- PHP (backend)
- MySQL (banco de dados)

## Instalação e Configuração

### Requisitos
- Node.js 18+ e npm/yarn
- PHP 8.0+ e Composer
- MySQL 8.0+

### Configuração do Frontend

1. Clone o repositório:
```bash
git clone https://github.com/imperio-pharma/frontend.git
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env.local` baseado no `.env.example`
- Defina a URL da API em `VITE_API_URL`

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Configuração do Backend

1. Clone o repositório do backend:
```bash
git clone https://github.com/imperio-pharma/api.git
cd api
```

2. Instale as dependências:
```bash
composer install
```

3. Configure o banco de dados:
- Crie um banco de dados MySQL
- Configure as credenciais no arquivo `src/services/config.php`

4. Inicie o servidor PHP:
```bash
php -S localhost:8000
```

## Acesso à Aplicação

- Loja: http://localhost:5173
- Painel Administrativo: http://localhost:5173/admin

## Estrutura de Serviços

Os serviços de API foram organizados de forma modular:

- `apiClient.ts`: Cliente centralizado para requisições
- `productService.ts`: Serviço para produtos
- `categoryService.ts`: Serviço para categorias
- `brandService.ts`: Serviço para marcas
- `customerService.ts`: Serviço para clientes

Exemplo de uso dos serviços:

```typescript
// Importar serviço específico
import { productService } from '@/services/productService';

// Buscar produtos
const fetchProducts = async () => {
  try {
    const products = await productService.getAll();
    console.log(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};
```

## Documentação Adicional

Para informações detalhadas sobre a estrutura e implementação do projeto, consulte a documentação em cada pasta:

- `src/services/README.md`: Documentação dos serviços de API
- `src/hooks/README.md`: Documentação dos hooks personalizados
- `src/components/README.md`: Documentação dos componentes
