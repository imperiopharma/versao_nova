
import React from 'react';
import { SidebarMenu } from './SidebarMenu';
import { MobileSidebar } from './MobileSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex md:w-72 flex-shrink-0 flex-col bg-white shadow-lg z-20 border-r border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h1 className="text-xl font-bold text-imperio-navy truncate">Admin Painel</h1>
        </div>
        
        <SidebarMenu />
      </aside>
      
      {/* Mobile sidebar - shown as Sheet */}
      <MobileSidebar title="Admin Painel" />
      
      {/* Main content - With ScrollArea for vertical scrolling only */}
      <main className="flex-1 overflow-hidden p-2 md:p-0 pt-20 md:pt-0">
        <ScrollArea className="h-[calc(100vh-24px)] overflow-x-hidden px-2 md:px-6 py-4 md:py-6">
          <div className="w-full max-w-full mx-auto pb-10">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};
