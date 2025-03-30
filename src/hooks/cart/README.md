
# Hooks do Carrinho de Compras

Este diretório contém hooks personalizados relacionados à funcionalidade do carrinho de compras.

## Hooks disponíveis

### `useCartState`

Gerencia o estado do carrinho, incluindo itens, cupons, método de envio e seguro.

```typescript
const {
  items,
  setItems,
  couponCode,
  setCouponCode,
  discountType,
  setDiscountType,
  shippingMethod,
  setShippingMethod,
  shippingCost,
  shipping,
  setShipping,
  hasInsurance,
  setHasInsurance
} = useCartState();
```

### `useCartOperations`

Fornece operações para manipular itens no carrinho.

```typescript
const { addItem, updateQuantity, removeItem, clearCart } = useCartOperations({ 
  items, 
  setItems 
});
```

### `useCartCalculations`

Calcula valores derivados do carrinho como subtotal, desconto e total.

```typescript
const { itemCount, subtotal, discount, total } = useCartCalculations({
  items,
  couponCode,
  discountType,
  shipping,
  hasInsurance
});
```

### `useCouponManager`

Gerencia a validação e aplicação de cupons de desconto.

```typescript
const { validateCoupon, applyCoupon, removeCoupon, availableCoupons } = useCouponManager({
  subtotal,
  shippingMethod,
  setCouponCode,
  setDiscountType
});
```

## Fluxo de Dados

O fluxo de dados entre esses hooks é gerenciado pelo `CartContext`, que:
1. Inicializa os estados com `useCartState`
2. Configura as operações com `useCartOperations`
3. Calcula valores derivados com `useCartCalculations`
4. Gerencia cupons com `useCouponManager`

Todos esses valores e funções são então disponibilizados por meio do hook `useCart()` para qualquer componente filho.
