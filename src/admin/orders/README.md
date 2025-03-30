
# Componentes de Gerenciamento de Pedidos

Esta pasta contém os componentes utilizados para gerenciar e monitorar pedidos no painel administrativo.

## Componentes

- `OrdersList.tsx`: Lista completa de pedidos com opções de filtragem e ações
- `OrdersFilter.tsx`: Filtros para pedidos (status, período, cliente)
- `OrderDetailsDialog.tsx`: Visualização detalhada de um pedido específico

## Funcionalidades

Estes componentes permitem:
- Visualização de todos os pedidos do sistema
- Filtragem por status (pendente, pago, enviado, concluído, cancelado)
- Filtragem por período (hoje, 7 dias, 30 dias, todo o período)
- Visualização detalhada de pedidos específicos
- Atualização de status de pedidos
- Impressão de pedidos

## Uso

Estes componentes são utilizados na página de gerenciamento de pedidos (`OrdersPage.tsx`).

## Dependências

- Os componentes utilizam:
  - `useOrdersData()`: Hook para buscar e gerenciar dados de pedidos
  - Supabase para operações de CRUD
  - Componentes UI da biblioteca Shadcn

## Integração com Backend

Todos os componentes estão integrados com o Supabase para:
- Buscar pedidos e itens de pedido
- Atualizar status de pedidos
- Aplicar políticas de segurança (RLS)

## Personalização

Para personalizar estes componentes:

1. **OrdersList**: 
   - Edite as colunas exibidas na lista de pedidos
   - Modifique as ações disponíveis para cada pedido

2. **OrdersFilter**: 
   - Ajuste as opções de filtro disponíveis
   - Personalize o layout e estilo dos filtros

3. **OrderDetailsDialog**: 
   - Altere as informações exibidas no detalhe do pedido
   - Adicione ou remova funcionalidades (como impressão ou envio de email)

## Status de Pedidos

Os pedidos podem ter os seguintes status:
- `pending`: Pedido recebido, aguardando pagamento
- `paid`: Pagamento confirmado, aguardando envio
- `shipped`: Pedido enviado, em trânsito
- `completed`: Pedido entregue e finalizado
- `cancelled`: Pedido cancelado

## Relatórios

Os componentes incluem funcionalidades básicas de relatórios:
- Total de pedidos por status
- Valor total de pedidos por período
- Exportação básica de dados
