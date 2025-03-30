
# Componentes de Autenticação

Esta pasta contém componentes relacionados à autenticação, login, registro e autorização.

## Componentes

- `AdminAuthGuard.tsx`: Protege rotas administrativas, redirecionando usuários não autenticados
- `AdminLogout.tsx`: Componente para realizar logout do painel administrativo

## Funcionalidades

Estes componentes gerenciam:
- Proteção de rotas baseadas em autenticação
- Redirecionamento para login quando necessário
- Validação de sessões de usuário
- Separação de acesso entre clientes e administradores

## Integração com API

A autenticação é gerenciada por APIs implementadas em:
- `authService.ts` (comunicação com endpoints de autenticação)
- Cookies ou localStorage para persistência de sessão

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
