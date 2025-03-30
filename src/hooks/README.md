
# Hooks Personalizados

Esta pasta contém todos os hooks React personalizados utilizados no projeto Imperio Pharma.

## Hooks Principais

- `useAuth.tsx`: Gerencia autenticação e controle de acesso
- `useBrands.tsx`: Gerencia dados de marcas
- `useCategories.tsx`: Gerencia dados de categorias
- `useProducts.tsx`: Gerencia dados de produtos e combos
- `useHomeData.tsx`: Centraliza dados para a página inicial
- `useProductStore.tsx`: Hook completo para o gerenciamento de produtos no painel administrativo
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

### Em useProductStore.tsx (painel administrativo)

```typescript
export const useProductStore = () => {
  // ... state e outras funções
  
  // Criar/atualizar um combo
  const saveCombo = async (comboData) => {
    // Garantir que é marcado como combo
    const dataToSave = {
      ...comboData,
      isCombo: true,
      // Calcular preço final com base no desconto
      price: calculateDiscountedPrice(comboData.originalPrice, comboData.comboDiscount)
    };
    
    const { data, error } = await supabase
      .from('products')
      .upsert(dataToSave)
      .select();
      
    // ... tratamento de erro e retorno
  };
  
  // Obter estatísticas de combos
  const getComboStats = async () => {
    const { data, error } = await supabase
      .rpc('get_combo_performance_stats');
      
    // ... tratamento de resultado
  };
  
  return {
    // ... outros métodos
    saveCombo,
    getComboStats,
  };
};
```

## Integração com Backend

Os hooks que se comunicam com o backend (Supabase) seguem um padrão consistente:
- Funções para buscar dados (`fetch...`)
- Funções para adicionar dados (`add...`)
- Funções para atualizar dados (`update...`)
- Funções para excluir dados (`delete...`)
- Estados para controlar carregamento e erros

## Personalização

Para personalizar ou criar novos hooks:

1. Siga o padrão dos hooks existentes
2. Mantenha a separação de responsabilidades (um hook por domínio)
3. Implemente tratamento de erros adequado
4. Documente o hook claramente, especialmente se tiver comportamentos complexos
5. Mantenha o estado loading para feedback ao usuário
