
# Componentes do Dashboard Administrativo

Esta pasta contém os componentes específicos utilizados no painel de controle principal (dashboard) do painel administrativo.

## Componentes

- `DashboardStats.tsx`: Cards estatísticos com métricas principais (produtos, clientes, pedidos, receita)
- `SalesChart.tsx`: Gráfico de vendas por período (diário, semanal, mensal)
- `CustomerGrowth.tsx`: Gráfico de crescimento da base de clientes
- `TopProducts.tsx`: Lista dos produtos mais vendidos, incluindo combos
- `RecentOrdersTable.tsx`: Tabela com os pedidos mais recentes

## Funcionalidades

Estes componentes apresentam:
- Visão geral das métricas de desempenho do negócio
- Visualização de tendências de vendas
- Acompanhamento de crescimento e atividade
- Lista de pedidos recentes para acompanhamento rápido
- Desempenho de combos promocionais

## Métricas para Combos

O dashboard inclui métricas específicas para a performance de combos:
- Total de vendas de combos vs produtos individuais
- Combos mais populares
- Taxa de conversão de visualizações para vendas de combos
- Percentual da receita total vinda de combos

Estas métricas são visualizadas através de:
- Cards específicos em `DashboardStats.tsx`
- Seção dedicada no gráfico de vendas
- Filtro para combos em `TopProducts.tsx`

## Uso

Estes componentes são utilizados na página principal do painel administrativo (`Dashboard.tsx`).

## Integração com Serviços

Os componentes utilizam os seguintes serviços para obter dados:
- `productService` para dados de produtos
- `orderService` para dados de pedidos
- `customerService` para dados de clientes
