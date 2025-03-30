
# Hooks de Produtos

Esta pasta contém hooks específicos para gerenciamento de produtos na Farmácia Imperio.

## Hooks Disponíveis

- `useProductToast.ts`: Gerencia notificações toast relacionadas a ações com produtos
- `useProducts.ts`: Fornece funcionalidades básicas para manipulação de produtos

## Uso

Estes hooks encapsulam lógica específica para manipulação, listagem e filtragem de produtos, tornando os componentes mais enxutos e a lógica reutilizável.

```tsx
import { useProducts } from '@/hooks/products/useProducts';

const ProductsPage = () => {
  const { products, loading, error, addToCart } = useProducts();
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={() => addToCart(product)}
        />
      ))}
    </div>
  );
};
```

## Funcionalidades para Combos

O hook `useProducts` inclui funcionalidades específicas para combos:

- `getCombos()`: Retorna apenas produtos marcados como combos
- `getComboDiscount(productId)`: Retorna o percentual de desconto de um combo
- `isCombo(product)`: Verifica se um produto é um combo
- `filterByCombosOnly(products)`: Filtra uma lista retornando apenas combos

## Integração com Serviços

Estes hooks utilizam o `productService` para comunicação com a API:
- Busca de produtos e informações
- Gerenciamento de estoque
- Operações de CRUD em produtos
