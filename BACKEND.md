
# Documentação Backend (Supabase)

## Arquitetura

O backend da loja Imperio Farmácia utiliza Supabase como Backend-as-a-Service (BaaS), oferecendo:

- **Banco de Dados PostgreSQL**: Armazenamento relacional
- **Autenticação**: Sistema completo de login/registro
- **Storage**: Armazenamento de arquivos (imagens de produtos)
- **Edge Functions**: Funcionalidades serverless
- **Realtime**: Atualizações em tempo real

Esta abordagem "serverless" permite desenvolvimento rápido e escalabilidade sem gerenciar infraestrutura.

## Estrutura do Banco de Dados

### Tabelas Principais

1. **products**
   - id (PK)
   - name
   - description
   - price
   - sale_price
   - stock_quantity
   - category_id (FK)
   - brand_id (FK)
   - images
   - created_at
   - updated_at
   - status

2. **categories**
   - id (PK)
   - name
   - description
   - slug
   - icon
   - status
   - created_at
   - updated_at

3. **brands**
   - id (PK)
   - name
   - logo_url
   - description
   - status
   - created_at
   - updated_at

4. **customers**
   - id (PK, relacionado ao auth.users)
   - first_name
   - last_name
   - email
   - phone
   - address
   - created_at
   - updated_at

5. **orders**
   - id (PK)
   - customer_id (FK)
   - status
   - total_amount
   - shipping_address
   - payment_method
   - created_at
   - updated_at

6. **order_items**
   - id (PK)
   - order_id (FK)
   - product_id (FK)
   - quantity
   - price
   - subtotal
   - created_at

## Autenticação e Autorização

O sistema usa Supabase Auth com:

- Login por email/senha
- Login social (opcional)
- Níveis de acesso:
  - Cliente: Acesso à loja e próprios pedidos
  - Admin: Acesso ao painel administrativo completo

Políticas RLS (Row Level Security) controlam acesso aos dados:
- Clientes acessam apenas seus próprios dados
- Admins têm acesso completo às tabelas

## Fluxo de Dados

1. **Listagem de Produtos**:
   ```sql
   SELECT * FROM products 
   WHERE status = 'active' 
   ORDER BY created_at DESC;
   ```

2. **Filtro por Categoria**:
   ```sql
   SELECT p.* FROM products p
   JOIN categories c ON p.category_id = c.id
   WHERE c.slug = 'categoria-slug' AND p.status = 'active';
   ```

3. **Criação de Pedido**:
   ```sql
   -- 1. Inserir pedido
   INSERT INTO orders (customer_id, status, total_amount, ...) 
   VALUES (...) RETURNING id;
   
   -- 2. Inserir itens do pedido
   INSERT INTO order_items (order_id, product_id, quantity, price, ...)
   VALUES (...);
   
   -- 3. Atualizar estoque
   UPDATE products 
   SET stock_quantity = stock_quantity - [quantidade_comprada]
   WHERE id = [product_id];
   ```

## Integrações

O backend se integra com:

1. **Processadores de Pagamento**:
   - Via Edge Functions que se comunicam com APIs de pagamento

2. **Notificações**:
   - Emails automáticos usando Supabase Edge Functions
   - SMS para atualizações de pedido (opcional)

3. **Relatórios**:
   - Consultas SQL para gerar relatórios de vendas, estoque, etc.

## Segurança

- Todas as senhas são armazenadas com hash via Supabase Auth
- Dados sensíveis são protegidos por RLS
- Validação de entrada tanto no frontend quanto no backend
- CORS configurado para permitir apenas origens confiáveis

## Ambiente de Desenvolvimento

O projeto usa:
- Supabase CLI para desenvolvimento local
- Migrations para versionamento de esquema
- Seed scripts para popular dados iniciais

## Monitoramento e Logs

- Logs de acesso e erros via Supabase
- Monitoramento de performance de consultas
- Alertas para operações críticas

## Backups e Recuperação

- Backups automáticos diários via Supabase
- Procedimento de recuperação documentado para emergências

## Escalabilidade

A arquitetura Supabase escala automaticamente:
- Banco de dados PostgreSQL com otimização de consultas
- CDN para assets estáticos
- Funções serverless que escalam sob demanda
