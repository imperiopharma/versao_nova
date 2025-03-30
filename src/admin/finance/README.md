
# Componentes de Finanças Administrativas

Esta pasta contém os componentes utilizados na seção financeira do painel administrativo da Imperio Pharma.

## Componentes

- `FinanceStats.tsx`: Cards com métricas financeiras principais
- `FinancePageHeader.tsx`: Cabeçalho da página com seletor de período
- `ExpensesDistributionChart.tsx`: Gráfico de distribuição de despesas
- `SalesByCategoryChart.tsx`: Gráfico de vendas por categoria
- `RecentTransactionsTable.tsx`: Tabela de transações recentes
- `FinanceTabContent.tsx`: Conteúdo base para abas financeiras

## Funcionalidades

Estes componentes permitem:
- Visualização de métricas financeiras chave
- Análise de vendas por categoria e período
- Acompanhamento de transações recentes
- Distribuição visual de despesas e custos
- Filtragem por período para análise comparativa

## Uso

Estes componentes são utilizados na página financeira do painel administrativo (`FinancePage.tsx`).

```tsx
import { FinanceStats } from '@/admin/finance/FinanceStats';
import { FinancePageHeader } from '@/admin/finance/FinancePageHeader';
import { SalesByCategoryChart } from '@/admin/finance/SalesByCategoryChart';

function FinancePage() {
  return (
    <AdminLayout>
      <FinancePageHeader />
      <FinanceStats />
      <div className="grid grid-cols-2 gap-4">
        <ExpensesDistributionChart />
        <SalesByCategoryChart />
      </div>
    </AdminLayout>
  );
}
```

## Integração com Backend

Os componentes financeiros:
- Buscam dados do Supabase para análises
- Calculam métricas em tempo real baseadas em pedidos
- Utilizam políticas RLS para garantir acesso apenas a administradores
- Atualizam automaticamente quando novos dados estão disponíveis

## Gráficos e Visualizações

Os componentes utilizam a biblioteca Recharts para:
- Gráficos de barras
- Gráficos de linha
- Gráficos de pizza
- Visualizações personalizadas

## Personalização

Para personalizar estes componentes:

1. **FinanceStats**: 
   - Edite as métricas exibidas nos cards
   - Adicione ou remova indicadores de desempenho

2. **SalesByCategoryChart**: 
   - Modifique os filtros disponíveis
   - Ajuste o tipo de gráfico ou visualização

3. **RecentTransactionsTable**: 
   - Altere as colunas exibidas
   - Modifique a quantidade de transações mostradas

## Observações Importantes

- Os dados exibidos são atualizados em tempo real
- Todos os valores financeiros são formatados consistentemente
- Os componentes lidam com estados de carregamento e erro
- As métricas são calculadas no servidor para melhor desempenho
- Os gráficos são totalmente responsivos
