
# Componentes de Administração

Esta pasta contém todos os componentes relacionados ao painel administrativo, organizados por funcionalidade.

## Estrutura

- `/common`: Componentes compartilhados entre várias seções do admin
- `/customers`: Gerenciamento de clientes
- `/dashboard`: Visão geral e estatísticas
- `/finance`: Relatórios financeiros e faturamento
- `/layout`: Estrutura do layout administrativo
- `/orders`: Gerenciamento de pedidos
- `/products`: Gerenciamento de produtos, categorias, marcas e combos
- `/settings`: Configurações da loja
- `/coupons`: Gerenciamento de cupons promocionais

## Funcionalidades

Os componentes administrativos fornecem interfaces para:
- Visualizar estatísticas de vendas e desempenho
- Gerenciar pedidos e acompanhar status
- Adicionar/editar/remover produtos, categorias e marcas
- Criar e gerenciar combos promocionais
- Visualizar informações de clientes
- Gerenciar configurações da loja

## Sistema de Combos

### Componentes para Gestão de Combos

- `ProductDialog.tsx`: Formulário para criação/edição de produtos, incluindo a opção para marcar como combo
- `ProductsList.tsx`: Lista de produtos com indicação visual para combos
- `ProductTableRow.tsx`: Exibe informações de produto/combo com ações disponíveis

### Fluxo para Criação de Combos

1. No painel administrativo, acesse a seção "Produtos"
2. Clique em "Adicionar Produto"
3. Preencha as informações básicas do produto
4. Ative a opção "É um combo?"
5. Defina o percentual de desconto para o combo
6. Informe o preço original (sem desconto)
7. O sistema calculará automaticamente o preço final com o desconto aplicado
8. Adicione uma imagem representativa do combo
9. Salve o combo

Os combos criados aparecerão automaticamente na seção "Combos Especiais" da página inicial e na página dedicada de combos.

## Integração com Supabase

Todos os componentes administrativos se comunicam com o Supabase para:
- Persistir alterações em produtos e combos
- Buscar dados para exibição e edição
- Aplicar políticas de segurança Row Level Security (RLS)
- Gerenciar uploads de imagens e arquivos
