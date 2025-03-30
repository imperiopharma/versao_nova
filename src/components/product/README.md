
# Componentes de Produto

Esta pasta contém os componentes relacionados à exibição e interação com produtos na loja Imperio Pharma.

## Componentes

- `ProductCard.tsx`: Card de produto utilizado em listagens e grades
- `ProductDetails.tsx`: Exibição detalhada de um produto específico
- `ProductList.tsx`: Lista ou grade de produtos com filtragem e paginação
- `ProductRating.tsx`: Componente de avaliação de produtos (estrelas)
- `ProductGallery.tsx`: Galeria de imagens para o produto

## Visualização de Combos

Os componentes de produto foram adaptados para exibir corretamente os combos promocionais:

### ProductCard para Combos

- Exibe badge "Combo" para identificação visual
- Mostra o percentual de desconto aplicado
- Apresenta preço original (riscado) e preço com desconto
- Utiliza estilo diferenciado para destacar combos na interface

### ProductDetails para Combos

- Mostra informações detalhadas sobre o combo
- Exibe claramente o desconto aplicado
- Apresenta informações de economia para o cliente
- Possui chamadas para ação específicas para combos

## Integração com Carrinho

Os componentes de produto integram-se com o `CartContext` para:
- Adicionar produtos ou combos ao carrinho
- Verificar se um produto ou combo já está no carrinho
- Atualizar a quantidade de um produto ou combo no carrinho
- Exibir feedback apropriado para adição de combos

## Comportamento Responsivo

Todos os componentes são totalmente responsivos:
- Cards adaptam-se ao espaço disponível
- Detalhes reorganizam-se para exibição em dispositivos móveis
- Galeria de imagens funciona em touch e mouse

## Exemplo de Uso com Combos

```tsx
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const CombosSection = () => {
  const { products } = useProducts();
  const combos = products.filter(product => product.isCombo);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {combos.map(combo => (
        <ProductCard 
          key={combo.id} 
          product={combo} 
          // O componente detecta automaticamente que é um combo
          // e exibe as informações apropriadas
        />
      ))}
    </div>
  );
};
```
