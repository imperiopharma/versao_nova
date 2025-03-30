
# Componentes de Finanças Administrativas

Esta pasta contém os componentes utilizados na seção financeira do painel administrativo da Imperio Pharma.

## Componentes

- `FinanceStats.tsx`: Cards com métricas financeiras principais
- `FinancePageHeader.tsx`: Cabeçalho da página com seletor de período
- `ExpensesDistributionChart.tsx`: Gráfico de distribuição de despesas
- `SalesByCategoryChart.tsx`: Gráfico de vendas por categoria
- `RecentTransactionsTable.tsx`: Tabela de transações recentes
- `FinanceTabContent.tsx`: Conteúdo base para abas financeiras

## Relatórios de Vendas de Combos

O sistema financeiro inclui relatórios específicos para análise de combos:

### Métricas Específicas de Combos

- Receita total gerada por combos
- Comparativo de receita: combos vs. produtos individuais
- Margem de lucro média em combos
- Taxa de conversão de combos
- Impacto dos combos no ticket médio

### Visualizações para Combos

- Gráfico de tendência de vendas de combos ao longo do tempo
- Distribuição de vendas por tipo de combo
- Comparativo visual de desempenho entre diferentes combos
- Análise de sazonalidade nas vendas de combos

### Análise de Descontos

- Total de descontos concedidos através de combos
- Impacto dos descontos na margem de lucro
- Comparativo entre diferentes estratégias de desconto
- ROI dos descontos aplicados em combos

## Filtros e Opções

Os relatórios financeiros podem ser filtrados por:
- Período (dia, semana, mês, ano, personalizado)
- Tipo de produto (combos, produtos individuais, todos)
- Categoria de produto
- Canal de venda

## Integração com Serviços

Os componentes financeiros obtêm dados através de:
- `orderService` para dados de pedidos
- `productService` para informações de produtos
- `financeService` para análises específicas
