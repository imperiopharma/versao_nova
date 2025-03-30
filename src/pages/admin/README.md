
# Páginas Administrativas

Esta pasta contém todas as páginas do painel administrativo da Imperio Pharma.

## Páginas Disponíveis

- `Dashboard.tsx`: Página principal com visão geral de vendas, pedidos e desempenho
- `ProductsPage.tsx`: Interface para gerenciamento de produtos, marcas e categorias
- `OrdersPage.tsx`: Gerenciamento e acompanhamento de pedidos
- `CustomersPage.tsx`: Visualização e gerenciamento de clientes
- `FinancePage.tsx`: Relatórios financeiros, faturamento e análises
- `SettingsPage.tsx`: Configurações da loja, informações gerais e integrações
- `LoginPage.tsx`: Página de autenticação específica para acesso administrativo

## Uso

Estas páginas são acessíveis apenas para usuários autenticados com privilégios administrativos, protegidas pelo componente `AdminAuthGuard`.

## Funcionalidades

- **Dashboard.tsx**:
  - Visão geral das métricas (vendas, pedidos, clientes)
  - Gráficos de desempenho
  - Lista de pedidos recentes
  - Produtos mais vendidos

- **ProductsPage.tsx**:
  - Listagem, adição, edição e exclusão de produtos
  - Gerenciamento de marcas e categorias
  - Upload e gerenciamento de imagens
  - Controle de estoque

- **OrdersPage.tsx**:
  - Listagem completa de pedidos
  - Filtros por status e período
  - Visualização detalhada de pedidos
  - Atualização de status de pedidos

- **CustomersPage.tsx**:
  - Listagem de clientes registrados
  - Gerenciamento de informações e status
  - Visualização de histórico de pedidos
  - Métricas por cliente

- **FinancePage.tsx**:
  - Relatórios financeiros detalhados
  - Análise de faturamento por período
  - Gráficos de desempenho financeiro
  - Distribuição de vendas por categoria

- **SettingsPage.tsx**:
  - Configurações gerais da loja
  - Templates de mensagens e emails
  - Configurações de envio e frete
  - Integrações com serviços externos

- **LoginPage.tsx**:
  - Formulário de login administrativo
  - Validação de credenciais
  - Redirecionamento após autenticação

## Integração com Backend

Todas as páginas administrativas estão integradas com o Supabase para:
- Buscar dados atualizados
- Persistir alterações
- Aplicar políticas de segurança (RLS)
- Respeitar permissões de usuário

## Acesso

Para acessar o painel administrativo:
1. Navegue para `/admin/login`
2. Use credenciais administrativas (email e senha)
3. Após login bem-sucedido, você será redirecionado para `/admin`

## Observações Importantes

- Todas as páginas exigem autenticação administrativa
- As políticas RLS do Supabase garantem que apenas usuários autorizados possam acessar e modificar dados
- As páginas são responsivas e funcionam em dispositivos móveis
- Existe cache de dados para otimizar desempenho e reduzir requisições
