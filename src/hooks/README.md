
# Hooks Personalizados

Esta pasta contém todos os hooks React personalizados utilizados no projeto Imperio Pharma.

## Hooks Principais

- `useAuth.tsx`: Gerencia autenticação e controle de acesso
- `useBrandsData.ts`: Gerencia dados de marcas
- `useCategoriesData.ts`: Gerencia dados de categorias
- `useProductCommon.ts`: Utilitários comuns para produtos
- `useProducts.tsx`: Gerencia dados de produtos e combos
- `useHomeData.tsx`: Centraliza dados para a página inicial
- `useOrdersData.ts`: Gerencia dados de pedidos
- `useFaq.tsx`: Gerencia dados de perguntas frequentes
- `useHero.tsx`: Gerencia dados do banner principal

## Hooks Específicos para Combos

### Em useProducts.tsx

```typescript
export const useProducts = () => {
  // ... state e outras funções
  
  // Obter apenas os combos
  const getCombos = useCallback(() => {
    return products.filter(product => product.isCombo);
  }, [products]);
  
  // Verificar se um produto é combo
  const isCombo = useCallback((productId) => {
    const product = products.find(p => p.id === productId);
    return product ? !!product.isCombo : false;
  }, [products]);
  
  // Calcular desconto do combo
  const getComboDiscount = useCallback((productId) => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.isCombo || !product.originalPrice) return 0;
    
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }, [products]);
  
  // Obter os combos em destaque para a página inicial
  const getFeaturedCombos = useCallback((limit = 4) => {
    return getCombos().slice(0, limit);
  }, [getCombos]);
  
  return {
    products,
    loading,
    error,
    getCombos,
    isCombo,
    getComboDiscount,
    getFeaturedCombos,
    // ... outras funções
  };
};
```

## Hooks de Dados

Hooks que gerenciam comunicação com API e estado:

- `useBrandsData.ts`: Comunicação com brandService
- `useCategoriesData.ts`: Comunicação com categoryService
- `useOrdersData.ts`: Comunicação com orderService
- `useCustomersData.ts`: Comunicação com customerService

## Integração com Serviços

Os hooks que se comunicam com os serviços da API seguem um padrão consistente:
- Estado para dados (`brands`, `categories`, etc.)
- Estado para controle de carregamento (`loading`)
- Funções para buscar dados (`fetchBrands`, `fetchCategories`, etc.)
- Funções para adicionar, atualizar e excluir dados
- Tratamento de erros uniforme

## Uso

```tsx
import { useBrandsData } from '@/hooks/useBrandsData';

function BrandsComponent() {
  const { brands, loading, fetchBrands, addBrand, updateBrand, deleteBrand } = useBrandsData();
  
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);
  
  if (loading) return <p>Carregando...</p>;
  
  return (
    <div>
      {brands.map(brand => (
        <div key={brand.id}>
          <h3>{brand.name}</h3>
          <button onClick={() => updateBrand({ ...brand, name: 'Novo Nome' })}>
            Editar
          </button>
          <button onClick={() => deleteBrand(brand.id)}>
            Excluir
          </button>
        </div>
      ))}
      <button onClick={() => addBrand({ name: 'Nova Marca', slug: 'nova-marca' })}>
        Adicionar Marca
      </button>
    </div>
  );
}
```
