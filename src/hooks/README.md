
# Hooks Personalizados

Esta pasta contém hooks customizados React para gerenciar estado, lógica de negócios e integração com o Supabase.

## Hooks Disponíveis

### Hooks de Autenticação
- `useAuth.tsx`: Gerencia autenticação com o Supabase, login, cadastro e logout

### Hooks de Dados
- `useBrandsData.ts`: Gerencia dados de marcas do Supabase
- `useCategoriesData.ts`: Gerencia dados de categorias do Supabase
- `useProductsData.ts`: Gerencia dados de produtos do Supabase
- `useOrdersData.ts`: Gerencia dados de pedidos do Supabase

### Hooks de UI
- `use-mobile.tsx`: Detecta se a visualização atual é em dispositivo móvel
- `use-toast.ts`: Gerencia notificações toast na UI

### Hooks de Negócios
- `useProducts.tsx`: Gerencia a lógica de negócios relacionada a produtos
- `useCheckoutForm.tsx`: Gerencia formulários de checkout
- `useCheckoutSubmit.ts`: Gerencia submissão de checkout
- `useProductToast.ts`: Gerencia notificações relacionadas a produtos

## Como Usar

### Exemplo de Autenticação
```tsx
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, signIn, signOut, loading } = useAuth();
  
  const handleLogin = async () => {
    await signIn('user@example.com', 'password');
  };
  
  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sair</button>
      ) : (
        <button onClick={handleLogin} disabled={loading}>
          Entrar
        </button>
      )}
    </div>
  );
};
```

### Exemplo de Dados
```tsx
import { useProductsData } from '@/hooks/useProductsData';

const ProductsList = () => {
  const { products, loading, error } = useProductsData();
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

## Integração com Supabase

Muitos dos hooks nesta pasta interagem com o Supabase para:
- Buscar e modificar dados
- Gerenciar autenticação de usuários
- Realizar operações CRUD nas tabelas do banco de dados
- Implementar regras de negócio que dependem de dados do backend
