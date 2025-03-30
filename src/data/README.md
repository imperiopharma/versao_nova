
# Dados Estáticos e Mocks

Esta pasta contém dados estáticos e mocks utilizados no desenvolvimento da aplicação Imperio Pharma.

## Estrutura

- `/mock`: Dados fictícios para desenvolvimento e testes

## Dados Disponíveis

A pasta `/mock` contém os seguintes conjuntos de dados:

- `products.ts`: Produtos de exemplo
- `categories.tsx`: Categorias de produtos
- `brands.ts`: Marcas de produtos
- `hero.ts`: Slides para o banner principal
- `faq.ts`: Perguntas frequentes

## Uso em Desenvolvimento

Estes dados são utilizados durante o desenvolvimento e em ambientes de teste onde não há conexão com o backend. Os hooks correspondentes a cada tipo de dado utilizam esses mocks como fallback:

```tsx
// Exemplo em useProducts.tsx
import { useState } from 'react';
import { mockFeaturedProducts } from '@/data/mock/products';

export const useProducts = () => {
  const [featuredProducts] = useState(mockFeaturedProducts);
  
  return {
    featuredProducts
  };
};
```

## Uso em Produção

Em produção, estes dados servem como fallback ou são substituídos por dados reais do backend (Supabase).

Os hooks podem alternar entre dados mockados e reais dependendo da disponibilidade da conexão com o backend:

```tsx
// Exemplo simplificado
const [products, setProducts] = useState(mockProducts);

useEffect(() => {
  const fetchRealProducts = async () => {
    try {
      const data = await supabase.from('products').select('*');
      if (data.data) {
        setProducts(data.data);
      }
    } catch (error) {
      // Em caso de falha, já estamos usando os dados mockados
      console.error('Erro ao buscar produtos reais:', error);
    }
  };
  
  fetchRealProducts();
}, []);
```

## Personalização

Para personalizar ou adicionar novos mocks:

1. Edite ou crie arquivos na pasta `/mock`
2. Siga o formato e estrutura dos mocks existentes
3. Certifique-se de que os dados mockados correspondam às interfaces TypeScript definidas em `/types`
4. Atualize os hooks correspondentes para utilizar os novos mocks quando necessário

## Observações Importantes

- Utilize dados mockados apenas para desenvolvimento e testes
- Mantenha a estrutura dos mocks idêntica à estrutura esperada da API
- Utilize os mesmos tipos definidos em `/types` para garantir consistência
- Considere a remoção de mocks desnecessários em builds de produção
