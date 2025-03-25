
import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DashboardOverview } from '@/components/admin/dashboard/DashboardOverview';
import { SalesChart } from '@/components/admin/dashboard/SalesChart';
import { RecentOrders } from '@/components/admin/dashboard/RecentOrders';
import { CustomerGrowth } from '@/components/admin/dashboard/CustomerGrowth';
import { TopProducts } from '@/components/admin/dashboard/TopProducts';
import { RevenueStats } from '@/components/admin/dashboard/RevenueStats';

export const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <DashboardOverview />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <SalesChart />
          </div>
          <div>
            <RevenueStats />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentOrders />
          <div className="space-y-6">
            <CustomerGrowth />
            <TopProducts />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
