
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

## Histórico de Compras e Combos

O componente `CustomerDetailsDialog.tsx` inclui uma seção dedicada ao histórico de compras que exibe:
- Todos os pedidos realizados pelo cliente
- Identificação visual para pedidos que incluem combos
- Estatísticas sobre a frequência de compra de combos
- Preferências do cliente (baseadas em combos adquiridos)

## Análise de Valor

O sistema de gerenciamento de clientes calcula e exibe métricas importantes:
- Valor total gasto pelo cliente
- Valor médio por pedido
- Economia gerada por compras de combos
- Potencial de compras futuras (baseado em histórico)

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

## Integração com Supabase

Todos os componentes estão integrados com o Supabase para:
- Buscar dados atualizados de clientes
- Buscar histórico de pedidos e itens relacionados
- Persistir alterações no banco de dados
- Aplicar políticas de segurança (RLS)
