
import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { SettingsTemplates } from '@/components/admin/settings/SettingsTemplates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as configurações e personalizações do sistema
          </p>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList>
            <TabsTrigger value="templates">Templates de Mensagens</TabsTrigger>
            <TabsTrigger value="general">Configurações Gerais</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-250px)] w-full">
            <TabsContent value="templates" className="py-4">
              <SettingsTemplates />
            </TabsContent>
            
            <TabsContent value="general">
              <div className="text-center py-8 text-muted-foreground">
                Configurações gerais em desenvolvimento
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="text-center py-8 text-muted-foreground">
                Configurações de notificações em desenvolvimento
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
