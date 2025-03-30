
# Componentes de Gerenciamento de Pedidos

Esta pasta contém os componentes utilizados para gerenciar e monitorar pedidos no painel administrativo.

## Componentes

- `OrdersList.tsx`: Lista completa de pedidos com opções de filtragem e ações
- `OrdersFilter.tsx`: Filtros para pedidos (status, período, cliente)
- `OrderDetailsDialog.tsx`: Visualização detalhada de um pedido específico
- `OrderMessage.tsx`: Componente para envio de mensagens relacionadas ao pedido
- `OrderSummary.tsx`: Resumo do pedido com produtos e valores
- `OrderTableRow.tsx`: Linha da tabela de pedidos com informações resumidas
- `OrdersTable.tsx`: Tabela completa de pedidos
- `PaymentProofView.tsx`: Visualizador de comprovantes de pagamento

## Funcionalidades

Estes componentes permitem:
- Visualização de todos os pedidos do sistema
- Filtragem por status (pendente, pago, enviado, concluído, cancelado)
- Filtragem por período (hoje, 7 dias, 30 dias, todo o período)
- Visualização detalhada de pedidos específicos
- Atualização de status de pedidos
- Impressão de pedidos
- Envio de mensagens para o cliente

## Visualização de Combos em Pedidos

O sistema de gerenciamento de pedidos identifica e exibe claramente os combos:
- Combos são destacados na lista de itens do pedido
- O desconto aplicado pelo combo é exibido no resumo do pedido
- Os relatórios de vendas podem ser filtrados para mostrar apenas pedidos com combos
- As estatísticas mostram a popularidade dos diferentes combos

## Status de Pedidos

Os pedidos podem ter os seguintes status:
- `pending`: Pedido recebido, aguardando pagamento
- `paid`: Pagamento confirmado, aguardando envio
- `shipped`: Pedido enviado, em trânsito
- `completed`: Pedido entregue e finalizado
- `cancelled`: Pedido cancelado

## Integração com Serviços

Todos os componentes estão integrados com serviços da API:
- `orderService` para gerenciamento de pedidos
- `productService` para informações de produtos
- `customerService` para dados de clientes
