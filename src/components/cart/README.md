
# Componentes do Carrinho de Compras

Esta pasta contém os componentes relacionados ao carrinho de compras da Imperio Pharma.

## Componentes

- `CartItem.tsx`: Item individual no carrinho
- `CartSummary.tsx`: Resumo do carrinho (subtotal, frete, total)
- `CartEmpty.tsx`: Estado vazio do carrinho
- `CartSidebar.tsx`: Carrinho em formato de sidebar
- `AddedToCartModal.tsx`: Modal de confirmação ao adicionar item ao carrinho

## Funcionalidades

Estes componentes permitem:
- Visualização dos itens adicionados ao carrinho
- Atualização de quantidades
- Remoção de itens
- Cálculo automático de subtotal, frete e total
- Navegação para o checkout
- Persistência dos itens entre sessões

## Suporte a Combos no Carrinho

O sistema de carrinho foi adaptado para lidar corretamente com combos:

### Identificação Visual de Combos

- `CartItem.tsx` exibe um badge "Combo" para itens que são combos
- Preço original (sem desconto) é exibido riscado
- Preço com desconto é destacado

### Cálculo de Valores para Combos

- `CartSummary.tsx` calcula corretamente o valor total considerando os descontos dos combos
- Exibe seção de "Economia" mostrando quanto o cliente está economizando com os combos

## Exemplo de Implementação para Combos

```tsx
// Trecho de código simplificado do CartItem.tsx
const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const isCombo = item.isCombo;
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
        {isCombo && (
          <span className="combo-badge">Combo</span>
        )}
      </div>
      
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <div className="price-container">
          {isCombo && item.originalPrice && (
            <span className="original-price">{formatCurrency(item.originalPrice)}</span>
          )}
          <span className="final-price">{formatCurrency(item.price)}</span>
        </div>
        
        {/* Controles de quantidade */}
        <div className="quantity-controls">
          {/* ... */}
        </div>
      </div>
    </div>
  );
};
```

## Integração com Contexto

Todos os componentes do carrinho utilizam o `CartContext` para:
- Acessar a lista de itens (incluindo combos)
- Obter valores calculados (total, quantidade, economia)
- Executar ações (adicionar, remover, atualizar)

## Integração com Serviços

Os componentes do carrinho utilizam:
- `productService` para verificar disponibilidade e informações atualizadas
- `shippingService` para cálculo de frete
