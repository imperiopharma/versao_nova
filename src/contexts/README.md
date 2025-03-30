
# Contextos React

Esta pasta contém os contextos React utilizados para gerenciar estado global no projeto Imperio Pharma.

## Contextos Disponíveis

- `CartContext.tsx`: Gerencia o estado do carrinho de compras
- `CheckoutContext.tsx`: Gerencia o estado do processo de checkout

## Funcionalidades

Estes contextos permitem:
- Compartilhar estado entre componentes sem prop drilling
- Persistir dados importantes entre navegações
- Centralizar lógica de negócio relacionada a cada domínio
- Fornecer funções utilitárias para manipulação de dados

## Uso

Para utilizar um contexto:

1. Importe o provider no ponto mais alto necessário da árvore de componentes (geralmente em `App.tsx`)
2. Envolva os componentes que precisam acessar o contexto
3. Use o hook correspondente nos componentes filhos para acessar o contexto

```tsx
// Em App.tsx ou outro componente de alto nível
import { CartProvider } from '@/contexts/CartContext';

function App() {
  return (
    <CartProvider>
      {/* Componentes filhos que precisam acessar o carrinho */}
      <Layout>
        <Routes>
          {/* ... */}
        </Routes>
      </Layout>
    </CartProvider>
  );
}

// Em um componente filho
import { useCart } from '@/contexts/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => addToCart(product)}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
```

## Personalização

Para personalizar ou criar novos contextos:

1. Crie um novo arquivo na pasta `contexts/`
2. Defina o tipo de dados do contexto
3. Crie o context com `createContext`
4. Implemente o provider como um componente React
5. Exporte o provider e um hook personalizado para acessar o contexto

## CartContext

O `CartContext` fornece:
- Lista de produtos no carrinho
- Quantidade total de itens
- Valor total do carrinho
- Funções para adicionar, remover e atualizar itens
- Persistência local (localStorage)

## CheckoutContext

O `CheckoutContext` fornece:
- Dados do cliente para entrega
- Método de pagamento selecionado
- Estado do progresso de checkout
- Funções para avançar e retroceder etapas
- Validação de dados de checkout
