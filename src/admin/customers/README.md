
# Componentes de Gerenciamento de Clientes

Esta pasta contém os componentes relacionados ao gerenciamento de clientes no painel administrativo.

## Componentes

- `CustomersList.tsx`: Lista dos clientes com opções para adicionar, editar e excluir
- `CustomerDialog.tsx`: Formulário para adicionar ou editar um cliente
- `CustomerDetailsDialog.tsx`: Visualização detalhada de um cliente específico

## Funcionalidades

Estes componentes permitem:
- Visualização completa de todos os clientes
- Adição de novos clientes
- Edição de informações de clientes existentes
- Alteração de status (ativo/inativo)
- Visualização do histórico de pedidos por cliente
- Análise de valor e frequência de compras

## Uso

Estes componentes são utilizados na página de gerenciamento de clientes (`CustomersPage.tsx`).

## Dependências

- Os componentes utilizam:
  - Conexão direta com o Supabase para operações CRUD
  - Componentes UI da biblioteca Shadcn
  - Hooks especializados conforme necessário

## Integração com Backend

Todos os componentes estão integrados com o Supabase para:
- Buscar dados atualizados de clientes
- Persistir alterações no banco de dados
- Relacionar clientes com seus pedidos
- Aplicar políticas de segurança (RLS)

## Personalização

Para personalizar estes componentes:

1. **CustomersList**: 
   - Edite as colunas exibidas na lista de clientes
   - Modifique os filtros disponíveis (ativos, inativos, todos)

2. **CustomerDialog**: 
   - Ajuste os campos do formulário de cliente
   - Personalize as validações de dados

3. **CustomerDetailsDialog**: 
   - Altere as informações exibidas no detalhe do cliente
   - Modifique as estatísticas e métricas apresentadas

## Campos de Cliente

Os clientes possuem os seguintes campos principais:
- `id`: Identificador único
- `name`: Nome completo
- `email`: Email de contato (usado para login quando aplicável)
- `phone`: Telefone de contato
- `status`: Status do cliente (active/inactive)
- `total_spent`: Valor total gasto pelo cliente
- `total_orders`: Número total de pedidos
- `last_order_date`: Data do último pedido

## Observações Importantes

- Todos os componentes respeitam as políticas de Row Level Security do Supabase
- Apenas usuários com função "admin" podem acessar estas funcionalidades
- As informações sensíveis são tratadas conforme boas práticas de segurança
