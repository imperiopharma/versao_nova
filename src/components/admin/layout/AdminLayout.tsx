
import React from 'react';
import { SidebarMenu } from './SidebarMenu';
import { MobileSidebar } from './MobileSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex md:w-64 flex-shrink-0 flex-col bg-white shadow-md z-20">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-imperio-navy truncate">Admin Painel</h1>
        </div>
        
        <SidebarMenu />
      </aside>
      
      {/* Mobile sidebar - shown as Sheet */}
      <MobileSidebar title="Admin Painel" />
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-6 pt-20 md:pt-6">
        <div className="w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
