
# Componentes de Autenticação

Esta pasta contém componentes relacionados à autenticação, login, registro e autorização usando o Supabase Auth.

## Componentes

- `AdminAuthGuard.tsx`: Protege rotas administrativas, redirecionando usuários não autenticados
- `AdminLogout.tsx`: Componente para realizar logout do painel administrativo

## Funcionalidades

Estes componentes gerenciam:
- Proteção de rotas baseadas em autenticação
- Redirecionamento para login quando necessário
- Validação de sessões de usuário
- Separação de acesso entre clientes e administradores

## Integração com Supabase Auth

A autenticação é gerenciada pelo Supabase Auth, permitindo:
- Login com email/senha
- Registro de novos usuários **sem verificação de email**
- Persistência de sessão entre recarregamentos de página
- Proteção de rotas baseada em perfis de usuário

## Uso no Sistema de Administração

O componente `AdminAuthGuard` é crucial para o gerenciamento de recursos administrativos:
- Protege todas as rotas `/admin/*`
- Verifica se o usuário possui o perfil de administrador
- Redireciona para página de login quando não autenticado
- Mantém as funcionalidades administrativas protegidas

## Fluxo de Autenticação Administrativa

1. Usuário tenta acessar rota administrativa
2. `AdminAuthGuard` verifica sessão 
3. Se autenticado como admin, permite acesso
4. Se não autenticado, redireciona para `/admin/login`
5. Após login bem-sucedido, redireciona para a rota original

## Configuração do Supabase Auth

Para o sistema de autenticação funcionar corretamente, foi configurado:
1. Cliente Supabase (`src/integrations/supabase/client.ts`) corretamente configurado
2. Supabase Auth configurado para **não exigir verificação de email**
3. Suporte para login imediato após cadastro
