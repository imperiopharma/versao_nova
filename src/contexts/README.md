
# Contextos React

Esta pasta contém os contextos React utilizados para gerenciar estado global no projeto Imperio Pharma.

## Contextos Disponíveis

- `CartContext.tsx`: Gerencia o estado do carrinho de compras
- `CheckoutContext.tsx`: Gerencia o estado do processo de checkout

## CartContext

O `CartContext` fornece:
- Lista de produtos no carrinho (incluindo combos)
- Quantidade total de itens
- Valor total do carrinho
- Funções para adicionar, remover e atualizar itens
- Persistência local (localStorage)

Funções específicas para combos:
- `addComboToCart`: Adiciona um combo ao carrinho, preservando suas propriedades especiais
- `isComboInCart`: Verifica se um combo específico já está no carrinho
- `getComboDiscount`: Retorna o desconto aplicado a um combo
- `getTotalWithDiscounts`: Calcula o total considerando todos os descontos (combos e cupons)

## CheckoutContext

O `CheckoutContext` fornece:
- Dados do cliente para entrega
- Método de pagamento selecionado
- Estado do progresso de checkout
- Funções para avançar e retroceder etapas
- Validação de dados de checkout

Integração com combos no checkout:
- Exibição clara de itens de combo no resumo do pedido
- Cálculo correto dos descontos aplicados
- Compatibilidade com cupons adicionais
- Validações específicas para combos com disponibilidade limitada

## Uso

Para utilizar um contexto:

1. Importe o provider no ponto mais alto necessário da árvore de componentes (geralmente em `App.tsx`)
2. Envolva os componentes que precisam acessar o contexto
3. Use o hook correspondente nos componentes filhos para acessar o contexto

```tsx
// Em um componente filho
import { useCart } from '@/contexts/CartContext';

function ProductCard({ product }) {
  const { addToCart, isComboInCart } = useCart();
  
  const isCombo = product.isCombo;
  const inCart = isComboInCart(product.id);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button 
        onClick={() => isCombo ? addComboToCart(product) : addToCart(product)}
        disabled={inCart}
      >
        {inCart ? 'No Carrinho' : 'Adicionar ao Carrinho'}
      </button>
    </div>
  );
}
```
