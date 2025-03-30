
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

### Integrações

- Configuração para exportação de relatórios de desempenho de combos
- Integração com sistemas de notificação para novos combos
- Configurações para compartilhamento em redes sociais

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

## Integração com Backend

Os componentes de configurações:
- Salvam configurações no Supabase
- Aplicam mudanças em tempo real
- Utilizam políticas RLS para garantir acesso apenas a administradores
- Validam dados antes de salvar

## Configurações de Templates para Combos

O componente `SettingsTemplates.tsx` inclui templates específicos para combos:
- Email de lançamento de novo combo
- Notificação de combo com estoque limitado
- Lembretes sobre combos visualizados mas não comprados
- Templates para promoções especiais de combos
