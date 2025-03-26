
# Imperio Farmácia - Documentação Backend

## Visão Geral

O backend da Imperio Farmácia é implementado utilizando o Supabase, uma plataforma de Backend as a Service (BaaS) baseada em PostgreSQL. Esta abordagem serverless nos permite concentrar o desenvolvimento nas funcionalidades de negócio, enquanto o Supabase gerencia a infraestrutura, segurança e escalabilidade.

## Arquitetura Supabase

### Banco de Dados PostgreSQL

O coração do backend é um banco de dados PostgreSQL, estruturado com as seguintes tabelas principais:

- `products`: Catálogo de produtos
- `categories`: Categorias de produtos
- `brands`: Marcas de produtos
- `orders`: Pedidos realizados
- `order_items`: Itens individuais de cada pedido
- `customers`: Informações dos clientes
- `profiles`: Dados de perfil estendidos
- `addresses`: Endereços de entrega
- `coupons`: Cupons de desconto
- `inventory`: Controle de estoque

### Autenticação e Autorização

- Sistema de login/registro via e-mail/senha
- Autenticação por provedores sociais (Google, Facebook)
- Redefinição de senha
- Confirmação de e-mail
- Perfis de acesso (cliente, administrador)
- Políticas de segurança baseadas em Row Level Security (RLS)

### Storage

- Armazenamento de imagens de produtos
- Documentos (notas fiscais, comprovantes)
- Avatares de usuários
- Organização em buckets por tipo de arquivo

### Funções Edge Functions

Funções serverless para lógica de negócio complexa:

- Processamento de pagamentos
- Validação de cupons
- Cálculo de frete
- Notificações e e-mails automatizados
- Geração de relatórios

### Realtime

Funcionalidades em tempo real:

- Atualizações de status de pedidos
- Notificações para administradores
- Atualizações de estoque
- Chat de suporte ao cliente

## Integração Frontend-Backend

A comunicação entre o frontend e o Supabase é gerenciada através:

- Cliente Supabase (`src/integrations/supabase/client.ts`)
- Hooks personalizados para operações específicas
- React Query para cache e gerenciamento de estado servidor

## Fluxos de Dados Principais

### Catálogo de Produtos

1. Produtos, categorias e marcas são armazenados nas respectivas tabelas
2. Imagens são armazenadas no bucket `product-images`
3. Consultas são otimizadas com índices e joins eficientes
4. Cache de dados frequentes via React Query

### Processo de Compra

1. Carrinho mantido no estado do cliente (CartContext)
2. No checkout, os dados do cliente e endereço são validados
3. Ao finalizar, um registro é criado em `orders` e `order_items`
4. Webhook dispara para processamento de pagamento
5. Status do pedido é atualizado em tempo real

### Autenticação

1. Login/registro via métodos do Supabase Auth
2. Token JWT armazenado e gerenciado automaticamente
3. Sessão persistida entre visitas
4. Permissões baseadas em claims e RLS

### Painel Administrativo

1. Acesso protegido por autenticação e verificação de papel
2. CRUD completo para todas as entidades
3. Relatórios gerados via consultas SQL ou funções serverless
4. Notificações em tempo real para novos pedidos

## Segurança

- Todas as requisições autenticadas via JWT
- Políticas RLS para controle granular de acesso
- Validação de dados no servidor
- Proteção contra SQL injection nativa do Supabase
- Sanitização de inputs no cliente e servidor
- CORS configurado corretamente

## Escalabilidade

- Modelo serverless escala automaticamente
- Cache implementado para consultas frequentes
- Paginação em todas as listagens
- Consultas otimizadas com índices apropriados
- Monitoramento de performance via Supabase Dashboard

## Ambiente de Desenvolvimento

- Projeto Supabase local para desenvolvimento
- Migrações para controle de versão do esquema
- Seed data para testes e desenvolvimento
- Variáveis de ambiente para configurações
