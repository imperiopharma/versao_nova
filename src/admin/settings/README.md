
# Componentes de Configurações Administrativas

Esta pasta contém os componentes utilizados na seção de configurações do painel administrativo da Imperio Pharma.

## Componentes

- `SettingsTemplates.tsx`: Gerenciamento de templates de mensagens
- `SettingsGeneral.tsx`: Configurações gerais da loja
- `SettingsNotifications.tsx`: Configurações de notificações
- `SettingsIntegrations.tsx`: Integrações com serviços externos

## Funcionalidades

Estes componentes permitem:
- Personalização de templates de emails e mensagens
- Configuração de informações básicas da loja
- Gerenciamento de notificações para clientes e administradores
- Configuração de integrações com serviços externos

## Uso

Estes componentes são utilizados na página de configurações do painel administrativo (`SettingsPage.tsx`).

```tsx
import { SettingsTemplates } from '@/admin/settings/SettingsTemplates';
import { SettingsGeneral } from '@/admin/settings/SettingsGeneral';

function SettingsPage() {
  return (
    <AdminLayout>
      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <SettingsTemplates />
        </TabsContent>
        
        <TabsContent value="general">
          <SettingsGeneral />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
```

## Templates de Mensagens

O componente `SettingsTemplates` permite configurar:
- Emails de confirmação de pedido
- Emails de recuperação de senha
- Mensagens de boas-vindas
- Notificações de envio
- Outros tipos de comunicação com o cliente

## Integração com Backend

Os componentes de configurações:
- Salvam configurações no Supabase
- Aplicam mudanças em tempo real
- Utilizam políticas RLS para garantir acesso apenas a administradores
- Validam dados antes de salvar

## Personalização

Para personalizar estes componentes:

1. **SettingsTemplates**: 
   - Adicione novos tipos de template
   - Modifique o editor de templates

2. **SettingsGeneral**: 
   - Adicione ou remova configurações gerais
   - Personalize os formulários de configuração

3. **SettingsNotifications**: 
   - Configure novos tipos de notificação
   - Ajuste os canais de envio disponíveis

## Observações Importantes

- Todas as configurações são persistidas no Supabase
- As alterações são aplicadas imediatamente após salvar
- Existe validação para evitar configurações inválidas
- Apenas usuários administrativos podem acessar estas configurações
- Modificações sensíveis (pagamentos, emails) exigem confirmação
