
# Integração Supabase

Esta pasta contém a configuração e tipos para integração com o Supabase, que serve como backend da aplicação.

## Arquivos

- `client.ts`: Configuração do cliente Supabase
- `types.ts`: Definições de tipos para tabelas e respostas do Supabase

## Uso

O Supabase fornece funcionalidades de backend como:
- Autenticação de usuários
- Banco de dados PostgreSQL
- Storage para arquivos
- Funções serverless
- Realtime subscriptions

Para usar o cliente Supabase em qualquer parte da aplicação:

```tsx
import { supabase } from '@/integrations/supabase/client';

async function fetchData() {
  const { data, error } = await supabase
    .from('table_name')
    .select('*');
  
  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }
  
  return data;
}
```
