
# Guia de Conexão Frontend-Backend Imperio Pharma

Este guia explica detalhadamente como o frontend (loja) se conecta ao backend (Supabase) e como configurar corretamente esses serviços.

## Visão Geral da Arquitetura

O projeto Imperio Pharma utiliza a seguinte arquitetura:

- **Frontend**: Aplicação React que se comunica com o backend via cliente Supabase
- **Backend**: Supabase (Backend as a Service) que fornece:
  - Banco de dados PostgreSQL
  - Sistema de autenticação
  - Storage para arquivos
  - Edge Functions para lógica de negócio personalizada

## Configuração do Supabase

### 1. Criar um Projeto Supabase

1. Acesse [https://supabase.com/](https://supabase.com/) e crie uma conta ou faça login
2. Crie um novo projeto e anote:
   - URL do projeto (ex: `https://ajlkwpneviaifmtwmxmv.supabase.co`)
   - Chave anon/publica (`anon key`) - usada no frontend
   - Chave de serviço (`service_role key`) - usada apenas em scripts administrativos

### 2. Configurar Autenticação

1. No painel do Supabase, vá para Authentication > Settings
2. Configure o "Site URL" para a URL do seu frontend (desenvolvimento ou produção)
3. Em Email Auth, habilite "Enable Email Signup"
4. **IMPORTANTE**: Desabilite "Confirm Email" para permitir cadastro sem verificação de email

### 3. Configurar Banco de Dados

1. Execute o script `BANCO_DE_DADOS.sql` através da ferramenta "SQL Editor" no painel do Supabase
2. Isso criará todas as tabelas e configurações necessárias para o funcionamento da aplicação

## Configuração do Frontend

### 1. Configurar Variáveis de Ambiente

No arquivo `.env` ou `.env.local` do seu projeto, adicione:

```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

Substitua pelos valores obtidos ao criar seu projeto Supabase.

### 2. Cliente Supabase

O cliente Supabase já está configurado em `src/integrations/supabase/client.ts`. Ele importa as variáveis de ambiente e exporta uma instância do cliente Supabase pronta para uso.

Para usar o cliente em qualquer componente:

```typescript
import { supabase } from '@/integrations/supabase/client';

// Exemplo de uso
const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
  
  return data;
};
```

## Row Level Security (RLS)

O Supabase utiliza políticas RLS (Row Level Security) para controlar o acesso aos dados. As políticas já estão configuradas para:

- Permitir leitura pública de produtos, categorias e marcas
- Restringir operações de escrita apenas para usuários autenticados com função administrativa
- Permitir que usuários vejam apenas seus próprios pedidos e dados pessoais

## Autenticação

O sistema foi configurado para:
- Permitir cadastro de usuários sem verificação de email
- Login imediato após o cadastro
- Acesso imediato ao conteúdo protegido após autenticação

## Implantação em Produção

### 1. Implantação do Frontend

1. Construa a aplicação para produção:
```bash
npm run build
```

2. O resultado da build estará na pasta `dist/`, que pode ser implantada em qualquer servidor estático ou serviço de hospedagem.

### 2. Variáveis de Ambiente em Produção

Certifique-se de configurar as variáveis de ambiente em seu servidor de produção:

- Para servidores tradicionais: use arquivos `.env` ou variáveis de ambiente do sistema
- Para serviços de hospedagem: use o painel de configuração do serviço para adicionar as variáveis

### 3. Configuração Supabase para Produção

1. No painel do Supabase, atualize o "Site URL" para a URL de produção
2. **Mantenha "Confirm Email" desabilitado** para permitir entrada rápida dos usuários
3. Configure domínios permitidos em CORS se necessário

## Troubleshooting

### Problemas de Autenticação

- Verifique se o "Site URL" no Supabase corresponde à URL do seu frontend
- Verifique as configurações de CORS no Supabase
- Certifique-se de que as chaves API estão corretas
- Confirme que "Confirm Email" está desabilitado para permitir login imediato

### Problemas de Acesso a Dados

- Verifique as políticas RLS no banco de dados
- Verifique se o usuário está autenticado corretamente
- Certifique-se de que o usuário tem as permissões necessárias

### Erros de Console

- Verifique o console do navegador para erros
- Os erros do Supabase geralmente fornecem detalhes precisos sobre o problema
