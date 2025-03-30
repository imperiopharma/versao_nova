
import React, { useState } from 'react';
import { SidebarMenu } from './SidebarMenu';
import { MobileSidebar } from './MobileSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Escondido em mobile */}
      <aside 
        className={`hidden md:flex md:w-${collapsed ? '20' : '72'} flex-shrink-0 flex-col bg-white shadow-lg z-20 border-r border-gray-100 transition-all duration-300`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h1 className={`text-xl font-bold text-imperio-navy truncate ${collapsed ? 'opacity-0 w-0' : 'opacity-100'} transition-opacity`}>
            Painel Admin
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <SidebarMenu collapsed={collapsed} />
        </ScrollArea>
      </aside>
      
      {/* Mobile sidebar - mostrado como Sheet */}
      <MobileSidebar title="Painel Admin" />
      
      {/* Conteúdo principal */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full w-full p-4 md:p-6 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
