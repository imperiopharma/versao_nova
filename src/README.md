
# Estrutura do Frontend

Esta é a estrutura principal do projeto frontend da loja Imperio. Aqui estão as principais pastas e suas funções:

- `/components`: Todos os componentes React da aplicação
- `/contexts`: Gerenciadores de estado global usando React Context API
- `/data`: Dados estáticos e mocks para desenvolvimento
- `/hooks`: Custom hooks React para lógica reutilizável
- `/lib`: Utilidades e funções auxiliares
- `/pages`: Componentes de página completa
- `/services`: Integrações com serviços externos
- `/types`: Definições de tipos TypeScript
- `/integrations`: Integrações com serviços externos (Supabase)

## Arquitetura Frontend

O projeto segue uma arquitetura baseada em componentes usando React 18, com Typescript para tipagem estática. O estilo é gerenciado principalmente com Tailwind CSS, complementado por componentes shadcn/ui para consistência visual.

O estado global é gerenciado através de React Context (principalmente para o carrinho e checkout), com estados locais gerenciados via React hooks.

## Sistema de Combos Promocionais

A loja inclui um sistema completo de combos promocionais:

### Visualização de Combos
- Seção dedicada na página inicial (FlashSaleSection)
- Página dedicada de combos (/combos)
- Indicação visual de desconto aplicado

### Gerenciamento Administrativo
- Interface para criação e edição de combos
- Definição de percentual de desconto
- Upload de imagens específicas para combos
- Relatórios de vendas de combos

### Integração com Checkout
- Cálculo correto de valores com desconto
- Compatibilidade com cupons adicionais
- Resumo claro dos descontos aplicados

## Convenções de Código

- Todos os componentes são funcionais (Function Components)
- Componentes maiores são divididos em subcomponentes menores
- Custom hooks para extrair lógica complexa dos componentes
- Tipagem explícita para melhor documentação e segurança de tipo
- Sistema de pasta organizado por funcionalidade

## Estrutura de Páginas

- **HomePage**: Página inicial com seções principais
  - Banners rotativos (HeroBanner)
  - Categorias de produtos (CategoryCards)
  - Combos Especiais (FlashSaleSection)
  - Marcas parceiras (BrandsSection)

- **Admin Pages**: Painel administrativo completo
  - Dashboard com estatísticas
  - Gerenciamento de produtos e combos
  - Controle de pedidos
  - Relatórios financeiros
