
# Componentes de Layout Administrativo

Esta pasta contém os componentes que definem a estrutura base do painel administrativo da Imperio Pharma.

## Componentes

- `AdminLayout.tsx`: Layout principal do painel administrativo
- `SidebarMenu.tsx`: Componente de navegação lateral
- `MenuItem.tsx`: Item do menu lateral
- `MobileSidebar.tsx`: Versão responsiva da barra lateral para dispositivos móveis
- `LogoutButton.tsx`: Botão para sair do painel administrativo

## Menu Administrativo

O componente `SidebarMenu.tsx` define a navegação principal do painel, incluindo:

- Dashboard (visão geral)
- Pedidos (gerenciamento de vendas)
- Produtos (produtos individuais)
- Combos (gerenciamento específico de combos promocionais)
- Categorias (organização de produtos)
- Clientes (gerenciamento de clientes)
- Cupons (descontos promocionais)
- Financeiro (relatórios e análises)
- Configurações (configurações do sistema)

### Gerenciamento de Combos

O menu inclui uma seção dedicada para gerenciamento de combos, permitindo:
- Acesso rápido à criação e edição de combos
- Visualização de relatórios específicos de combos
- Análise de desempenho de combos

## Estrutura do Layout

O layout administrativo segue uma estrutura moderna:
- Barra lateral fixa à esquerda (colapsável em dispositivos móveis)
- Área de conteúdo principal para exibição de componentes
- Design responsivo que se adapta a todos os tamanhos de tela

## Integração com Autenticação

O layout administrativo integra-se ao sistema de autenticação:
- Verifica se o usuário está autenticado
- Confirma permissões administrativas
- Redireciona para login quando necessário
- Permite logout seguro
