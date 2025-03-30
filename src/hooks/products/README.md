
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

Exemplo de uso com combos:

```tsx
import { useProducts } from '@/hooks/products/useProducts';

const CombosPage = () => {
  const { getCombos, loading } = useProducts();
  const combos = getCombos();
  
  return (
    <div>
      <h1>Combos Especiais</h1>
      {loading ? (
        <p>Carregando combos...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {combos.map(combo => (
            <ProductCard key={combo.id} product={combo} isCombo />
          ))}
        </div>
      )}
    </div>
  );
};
```

## Integração com Carrinho

Estes hooks também fornecem funcionalidades para adicionar produtos e combos ao carrinho:
- Validação de estoque
- Cálculo de preço com desconto para combos
- Feedback ao usuário (toast notifications)
- Redirecionamento para checkout
