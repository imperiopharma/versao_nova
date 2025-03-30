
# Integrações com Serviços Externos

Esta pasta contém o código para integrações com serviços externos utilizados pela Imperio Pharma.

## Estrutura

- `/supabase`: Integração com o Supabase para backend-as-a-service

## Supabase

A integração com o Supabase fornece:
- Cliente configurado para comunicação com o projeto Supabase
- Tipos TypeScript gerados a partir do esquema do banco de dados
- Funções utilitárias para operações comuns

### Configuração

O cliente Supabase está configurado em `/supabase/client.ts` e utiliza as variáveis de ambiente:
- `VITE_SUPABASE_URL`: URL do projeto Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave anônima/pública para autenticação inicial

### Uso

Para utilizar o cliente Supabase em qualquer parte da aplicação:

```tsx
import { supabase } from '@/integrations/supabase/client';

// Exemplo de busca de produtos/combos
async function fetchProducts(includeCombo = false) {
  let query = supabase
    .from('products')
    .select('*');
    
  // Se quisermos apenas combos
  if (includeCombo) {
    query = query.eq('is_combo', true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
  
  return data;
}
```

## Sistema de Combos no Supabase

A estrutura do banco de dados no Supabase suporta o sistema de combos através da tabela `products` com campos específicos:

### Campos para Combos

- `is_combo` (boolean): Indica se o produto é um combo
- `combo_discount` (numeric): Porcentagem do desconto aplicado
- `original_price` (numeric): Preço original antes do desconto
- `price` (numeric): Preço final já com o desconto aplicado
- `combo_items` (JSONB, opcional): Lista de IDs dos produtos incluídos no combo

### Consultas para Combos

```tsx
// Buscar todos os combos disponíveis
const { data: combos } = await supabase
  .from('products')
  .select('*')
  .eq('is_combo', true)
  .gt('stock', 0);

// Buscar detalhes de um combo específico
const { data: combo } = await supabase
  .from('products')
  .select('*')
  .eq('id', comboId)
  .eq('is_combo', true)
  .single();
```

## Row Level Security (RLS)

Todas as tabelas utilizam políticas RLS para garantir segurança:
- Produtos e combos públicos são acessíveis sem autenticação
- Operações de criação/edição de combos requerem perfil de administrador
- Dados de vendas e relatórios são protegidos por políticas de acesso
