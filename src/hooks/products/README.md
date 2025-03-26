
# Hooks de Produtos

Esta pasta contém hooks específicos para gerenciamento de produtos na Farmácia Imperio.

## Hooks Disponíveis

- `useProductToast.ts`: Gerencia notificações toast relacionadas a ações com produtos
- `useProducts.ts`: Fornece funcionalidades básicas para manipulação de produtos

## Uso

Estes hooks encapsulam lógica específica para manipulação, listagem e filtragem de produtos, tornando os componentes mais enxutos e a lógica reutilizável.

## Funcionalidades

- Carregamento de dados de produtos do backend ou mock
- Filtragem por categoria, marca ou características
- Ordenação por preço, popularidade, etc.
- Notificações para ações como adicionar ao carrinho, adicionar à lista de desejos
- Estado de carregamento e tratamento de erros

## Benefícios

- Separação de lógica e apresentação
- Reutilização de código entre componentes
- Consistência no comportamento relacionado a produtos
- Facilidade de manutenção e testes
