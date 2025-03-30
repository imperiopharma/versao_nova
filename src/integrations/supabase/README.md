
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

## Tabelas Principais

O Supabase é configurado com as seguintes tabelas principais:
- `products`: Produtos e combos
- `categories`: Categorias de produtos
- `brands`: Marcas de produtos
- `orders`: Pedidos realizados
- `order_items`: Itens de pedido
- `customers`: Informações de clientes
- `coupons`: Cupons de desconto

## Estrutura para Gerenciamento de Combos

A tabela `products` inclui campos específicos para combos:
- `is_combo`: Boolean indicando se o produto é um combo
- `combo_discount`: Percentual de desconto do combo
- `original_price`: Preço original antes do desconto
- `price`: Preço final após aplicação do desconto
- `combo_items`: Referência aos produtos incluídos no combo (opcional)

Consultas para listagens de combos:

```tsx
// Buscar todos os combos
const { data: combos } = await supabase
  .from('products')
  .select('*')
  .eq('is_combo', true);

// Buscar combo específico
const { data: combo } = await supabase
  .from('products')
  .select('*')
  .eq('id', comboId)
  .eq('is_combo', true)
  .single();
```

## Segurança

As tabelas utilizam Row Level Security (RLS) para garantir:
- Produtos públicos são visíveis para todos
- Informações sensíveis são protegidas
- Apenas administradores podem gerenciar produtos, combos e cupons
