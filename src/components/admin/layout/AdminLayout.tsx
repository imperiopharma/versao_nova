
import React from 'react';
import { SidebarMenu } from './SidebarMenu';
import { MobileSidebar } from './MobileSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex md:w-72 flex-shrink-0 flex-col bg-white shadow-lg z-20 border-r border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h1 className="text-xl font-bold text-imperio-navy truncate">Painel Admin</h1>
        </div>
        
        <ScrollArea className="flex-1">
          <SidebarMenu />
        </ScrollArea>
      </aside>
      
      {/* Mobile sidebar - shown as Sheet */}
      <MobileSidebar title="Painel Admin" />
      
      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full w-full p-4 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
