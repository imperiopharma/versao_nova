
import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DashboardOverview } from '@/components/admin/dashboard/DashboardOverview';
import { SalesChart } from '@/components/admin/dashboard/SalesChart';
import { RecentOrders } from '@/components/admin/dashboard/RecentOrders';
import { TopProducts } from '@/components/admin/dashboard/TopProducts';
import { RevenueStats } from '@/components/admin/dashboard/RevenueStats';
import { CustomerGrowth } from '@/components/admin/dashboard/CustomerGrowth';

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="py-6 space-y-6">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        
        <DashboardOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <RevenueStats />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
          <div>
            <TopProducts />
          </div>
        </div>
        
        <CustomerGrowth />
      </div>
    </AdminLayout>
  );
};
