
# Componentes de Layout Administrativo

Esta pasta contém os componentes que definem a estrutura base do painel administrativo da Imperio Pharma.

## Componentes

- `AdminLayout.tsx`: Layout principal do painel administrativo
- `Sidebar.tsx`: Barra lateral de navegação
- `TopBar.tsx`: Barra superior com pesquisa e ações rápidas
- `MenuItems.tsx`: Definição dos itens de menu administrativo

## Funcionalidades

Estes componentes estabelecem:
- Estrutura consistente para todas as páginas administrativas
- Navegação entre seções do painel
- Acesso rápido a funcionalidades comuns
- Adaptação responsiva para diferentes dispositivos

## Uso

O componente `AdminLayout` deve envolver todas as páginas administrativas:

```tsx
import { AdminLayout } from '@/admin/layout/AdminLayout';

export const AdminPage = () => {
  return (
    <AdminLayout>
      {/* Conteúdo da página administrativa */}
    </AdminLayout>
  );
};
```

## Estrutura do Layout

O layout administrativo segue uma estrutura moderna:
- Barra lateral fixa à esquerda (colapsável em dispositivos móveis)
- Barra superior com informações do usuário e ações rápidas
- Área de conteúdo principal
- Design responsivo que se adapta a todos os tamanhos de tela

## Menu de Navegação

O menu lateral é definido em `MenuItems.tsx` e inclui:
- Dashboard (visão geral)
- Produtos, Categorias e Marcas
- Pedidos
- Clientes
- Financeiro
- Configurações
- Logout

## Personalização

Para personalizar o layout administrativo:

1. **AdminLayout**: 
   - Edite a estrutura básica do layout
   - Modifique o comportamento responsivo

2. **Sidebar**: 
   - Ajuste a largura e comportamento da barra lateral
   - Personalize o logotipo e cores

3. **MenuItems**: 
   - Adicione, remova ou reorganize itens de menu
   - Configure ícones e permissões por item

## Autenticação e Segurança

O layout administrativo integra-se ao sistema de autenticação:
- Verifica se o usuário está autenticado
- Confirma permissões administrativas
- Redireciona para login quando necessário
- Permite logout seguro

## Observações Importantes

- O layout é totalmente responsivo, adaptando-se a desktops, tablets e smartphones
- Em dispositivos móveis, a barra lateral torna-se um menu colapsável
- O estado de expansão da barra lateral é persistido localmente
- Apenas usuários com função "admin" podem acessar o painel administrativo
