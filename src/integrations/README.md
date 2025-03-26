
# Integrações

Esta pasta contém código para integração com serviços externos utilizados pela Farmácia Imperio.

## Estrutura

- `/supabase`: Integração com o Supabase para backend-as-a-service, incluindo autenticação, banco de dados e armazenamento

## Uso

Estas integrações fornecem interfaces limpas para comunicação com serviços externos, abstraindo detalhes de implementação. Os componentes e páginas da aplicação utilizam estas integrações para:

- Autenticação de usuários
- Armazenamento e recuperação de dados (produtos, pedidos, etc.)
- Upload e gerenciamento de arquivos
- Funcionalidades em tempo real

## Benefícios

- Código mais organizado com separação de responsabilidades
- Facilidade para trocar provedores de serviços se necessário
- Centralização da lógica de comunicação externa
- Possibilidade de mock para testes e desenvolvimento
