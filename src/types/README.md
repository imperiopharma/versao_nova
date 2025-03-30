
# Definições de Tipos TypeScript

Esta pasta contém todas as interfaces e tipos TypeScript utilizados no projeto Imperio Pharma.

## Arquivos

- `product.ts`: Tipos relacionados a produtos
- `category.ts`: Tipos relacionados a categorias
- `brand.ts`: Tipos relacionados a marcas
- `order.ts`: Tipos relacionados a pedidos
- `customer.ts`: Tipos relacionados a clientes
- `hero.ts`: Tipos para o banner principal
- `user.ts`: Tipos relacionados a usuários e autenticação

## Uso

Estas definições de tipos são utilizadas em todo o projeto para garantir consistência e segurança de tipos. Elas:

- Definem a estrutura dos dados utilizados na aplicação
- Facilitam a autocomplete e verificação de tipos durante o desenvolvimento
- Servem como documentação sobre a estrutura de dados esperada
- Garantem que os componentes recebam e manipulem os dados corretamente

## Exemplos

### Exemplo de uso de tipos de produtos:

```tsx
import { Product } from '@/types/product';

// Componente com tipagem forte
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.price}</span>
    </div>
  );
};
```

### Exemplo de uso de tipos de pedidos:

```tsx
import { Order, OrderStatus } from '@/types/order';

// Função com tipagem forte
const updateOrderStatus = (order: Order, newStatus: OrderStatus) => {
  // Implementação da função
};
```

## Correspondência com Backend

Os tipos definidos aqui correspondem às estruturas de dados da API. Ao alterar os endpoints ou resposta da API, atualize também os tipos correspondentes nesta pasta.

## Personalização

Para adicionar ou modificar tipos:

1. Edite o arquivo correspondente ou crie um novo arquivo para um novo domínio de tipos
2. Mantenha a nomenclatura consistente com o resto do projeto
3. Documente campos complexos com comentários quando necessário
4. Atualize as importações em componentes que utilizam os tipos alterados
