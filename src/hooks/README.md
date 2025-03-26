
# Hooks

Esta pasta contém hooks personalizados que encapsulam lógica reutilizável.

## Estrutura

- `/products`: Hooks relacionados a produtos
- Hooks gerais para funcionalidades diversas

## Hooks Disponíveis

- `useAuth.tsx`: Gerencia autenticação
- `useBrands.tsx`: Recupera dados de marcas
- `useCategories.tsx`: Gerencia categorias
- `useHomeData.tsx`: Agrega dados para a página inicial
- `useProducts.tsx`: Gerencia dados de produtos
- `useProductStore.ts`: Gerencia estado da loja de produtos
- `use-mobile.tsx`: Detecta se o dispositivo é móvel
- Entre outros...

## Uso

Os hooks devem ser usados em componentes funcionais para compartilhar lógica:

```tsx
import { useProducts } from '@/hooks/useProducts';

function ProductList() {
  const { products, loading, error } = useProducts();
  // Renderizar lista de produtos
}
```
