
# Componentes do Dashboard Administrativo

Esta pasta contém os componentes específicos utilizados no painel de controle principal (dashboard) do painel administrativo.

## Componentes

- `DashboardStats.tsx`: Cards estatísticos com métricas principais (produtos, clientes, pedidos, receita)
- `SalesChart.tsx`: Gráfico de vendas por período (diário, semanal, mensal)
- `CustomerGrowth.tsx`: Gráfico de crescimento da base de clientes
- `TopProducts.tsx`: Lista dos produtos mais vendidos
- `RecentOrdersTable.tsx`: Tabela com os pedidos mais recentes

## Funcionalidades

Estes componentes apresentam:
- Visão geral das métricas de desempenho do negócio
- Visualização de tendências de vendas
- Acompanhamento de crescimento e atividade
- Lista de pedidos recentes para acompanhamento rápido

## Uso

Estes componentes são utilizados na página principal do painel administrativo (`Dashboard.tsx`).

## Dependências

- Os componentes utilizam dados fornecidos pelo Supabase através de hooks especializados:
  - `useOrdersData()`: Fornece dados de pedidos
  - `useProductStore()`: Fornece dados de produtos
  - Recharts para gráficos
  - Shadcn/UI para componentes de interface

## Personalização

Para personalizar estes componentes:

1. **DashboardStats**: 
   - Edite os cartões de estatísticas em `DashboardStats.tsx`
   - Personalize as cores e ícones dos cartões

2. **SalesChart**: 
   - Modifique os parâmetros do gráfico em `SalesChart.tsx`
   - Ajuste o período de visualização ou tipo de gráfico

3. **TopProducts**: 
   - Altere o número de produtos exibidos
   - Personalize as informações mostradas para cada produto

4. **RecentOrdersTable**: 
   - Ajuste as colunas e informações exibidas
   - Modifique o número de pedidos mostrados
