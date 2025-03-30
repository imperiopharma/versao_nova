
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

// Exemplo de busca de dados
async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
  
  return data;
}

// Exemplo de autenticação
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth
    .signInWithPassword({ email, password });
    
  if (error) throw error;
  return data;
}
```

## Tabelas Disponíveis

O Supabase está configurado com as seguintes tabelas principais:
- `products`: Produtos da loja
- `categories`: Categorias de produtos
- `brands`: Marcas de produtos
- `customers`: Clientes registrados
- `orders`: Pedidos realizados
- `order_items`: Itens de cada pedido
- `profiles`: Perfis de usuários vinculados à autenticação

## Row Level Security (RLS)

Todas as tabelas utilizam políticas RLS para garantir segurança:
- Dados públicos são acessíveis sem autenticação (produtos, categorias, marcas)
- Dados sensíveis requerem autenticação e autorização
- Usuários administradores têm acesso completo aos dados

## Tipos

Os tipos TypeScript para o esquema do Supabase estão em `/supabase/types.ts` e são gerados automaticamente a partir do esquema do banco de dados. Estes tipos são utilizados em toda a aplicação para garantir consistência na manipulação de dados.
