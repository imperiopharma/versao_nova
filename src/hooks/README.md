
# Hooks Personalizados

Esta pasta contém todos os hooks React personalizados utilizados no projeto Imperio Pharma.

## Hooks Principais

- `useAuth.tsx`: Gerencia autenticação e controle de acesso
- `useBrands.tsx`: Gerencia dados de marcas
- `useCategories.tsx`: Gerencia dados de categorias
- `useProducts.tsx`: Gerencia dados de produtos
- `useHomeData.tsx`: Centraliza dados para a página inicial
- `useProductStore.tsx`: Hook completo para o gerenciamento de produtos no painel administrativo
- `useOrdersData.ts`: Gerencia dados de pedidos
- `useFaq.tsx`: Gerencia dados de perguntas frequentes
- `useHero.tsx`: Gerencia dados do banner principal

## Funcionalidades

Estes hooks:
- Encapsulam lógica de busca e manipulação de dados
- Gerenciam estados locais relevantes para cada domínio
- Estabelecem conexão com o Supabase para persistência de dados
- Fornecem funções utilitárias para manipulação de dados
- Centralizam lógica de negócio reutilizável

## Uso

Os hooks são utilizados nos componentes para acessar e manipular dados:

```tsx
import { useProducts } from '@/hooks/useProducts';

const MyComponent = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
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

## Observações Importantes

- Os hooks que acessam o Supabase respeitam as políticas de Row Level Security
- A autenticação é gerenciada pelo hook `useAuth` e fornecida pelos contextos correspondentes
- Os hooks de admin (`useProductStore`, `useOrdersData`, etc.) verificam permissões de administrador
