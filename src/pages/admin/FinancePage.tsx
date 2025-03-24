
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinancePageHeader } from '@/components/admin/finance/FinancePageHeader';
import { FinanceStats } from '@/components/admin/finance/FinanceStats';
import { ExpensesDistributionChart } from '@/components/admin/finance/ExpensesDistributionChart';
import { SalesByCategoryChart } from '@/components/admin/finance/SalesByCategoryChart';
import { RecentTransactionsTable } from '@/components/admin/finance/RecentTransactionsTable';
import { FinanceTabContent } from '@/components/admin/finance/FinanceTabContent';

export const FinancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <AdminLayout>
      <div className="py-4 space-y-4 md:py-6 md:space-y-6">
        <FinancePageHeader />
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-md mb-4">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Visão Geral</TabsTrigger>
            <TabsTrigger value="income" className="text-xs md:text-sm">Receitas</TabsTrigger>
            <TabsTrigger value="expenses" className="text-xs md:text-sm">Despesas</TabsTrigger>
            <TabsTrigger value="reports" className="text-xs md:text-sm">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <FinanceStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <ExpensesDistributionChart />
              <SalesByCategoryChart />
            </div>
            
            <RecentTransactionsTable />
          </TabsContent>
          
          <TabsContent value="income" className="space-y-4 md:space-y-6">
            <FinanceTabContent 
              title="Receitas" 
              description="Detalhamento de receitas do período" 
            />
          </TabsContent>
          
          <TabsContent value="expenses" className="space-y-4 md:space-y-6">
            <FinanceTabContent 
              title="Despesas" 
              description="Detalhamento de despesas do período" 
            />
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4 md:space-y-6">
            <FinanceTabContent 
              title="Relatórios" 
              description="Relatórios financeiros disponíveis para download" 
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
