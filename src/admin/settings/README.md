
# Componentes de Configurações Administrativas

Esta pasta contém os componentes utilizados na seção de configurações do painel administrativo da Imperio Pharma.

## Componentes

- `SettingsTemplates.tsx`: Gerenciamento de templates de mensagens
- `SettingsGeneral.tsx`: Configurações gerais da loja
- `SettingsNotifications.tsx`: Configurações de notificações
- `SettingsIntegrations.tsx`: Integrações com serviços externos
- `SettingsCombos.tsx`: Configurações específicas para combos

## Configurações de Combos

O componente `SettingsCombos.tsx` permite configurar aspectos globais do sistema de combos:

### Políticas de Desconto

- Percentual máximo de desconto permitido para combos
- Regras para aplicação de cupons em cima de combos
- Configuração de descontos escalonados (por quantidade)

### Regras de Exibição

- Número de combos exibidos na seção de destaque da home
- Período de exibição de badges "Novo Combo"
- Priorização de combos em resultados de busca
- Configurações de destaque visual para combos

## Uso

Estes componentes são utilizados na página de configurações do painel administrativo (`SettingsPage.tsx`), organizados em abas.

```tsx
import { SettingsTemplates } from '@/admin/settings/SettingsTemplates';
import { SettingsCombos } from '@/admin/settings/SettingsCombos';

function SettingsPage() {
  return (
    <AdminLayout>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="combos">Combos</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <SettingsGeneral />
        </TabsContent>
        
        <TabsContent value="combos">
          <SettingsCombos />
        </TabsContent>
        
        <TabsContent value="templates">
          <SettingsTemplates />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
```

## Integração com Serviços

Os componentes de configurações:
- Salvam configurações através do `settingsService`
- Aplicam mudanças em tempo real
- Validam dados antes de salvar
