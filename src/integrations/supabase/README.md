
# Integração com Supabase

Esta pasta contém a configuração e código para integração com o Supabase, a plataforma de backend que fornece autenticação, banco de dados e armazenamento para a aplicação Farmácia Imperio.

## Estrutura

Esta pasta está organizada para facilitar a comunicação com o Supabase:

- `client.ts`: Configuração do cliente Supabase
- `types.ts`: Definições de tipos para entidades no banco de dados Supabase

## Uso

Este módulo facilita a comunicação com o Supabase:

```tsx
import { supabase } from '@/integrations/supabase/client';

// Exemplo de consulta ao banco de dados
async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active');
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

// Exemplo de autenticação
async function loginUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro de autenticação:', error);
    throw error;
  }
}
```

## Funcionalidades

Os módulos nesta pasta oferecem:
- Configuração centralizada para o cliente Supabase
- Autenticação de usuários (login, cadastro, recuperação de senha)
- Acesso a dados do banco de dados PostgreSQL
- Upload e gerenciamento de arquivos
- Tipos TypeScript para tabelas do banco de dados

## Segurança

O Supabase utiliza Row Level Security (RLS) para proteger os dados:
- Produtos, categorias e marcas estão disponíveis publicamente
- Pedidos e dados de clientes são protegidos por políticas RLS
- As políticas garantem que usuários só possam ver seus próprios dados
- Operações administrativas exigem autorização especial

## Autenticação

O sistema de autenticação suporta:
- Login com email/senha
- Cadastro de novos usuários
- Recuperação de senha
- Verificação de email (opcional)
- Perfis de usuário personalizados
