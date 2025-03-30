
# Componentes de Produto

Esta pasta contém os componentes relacionados à exibição e interação com produtos na loja Imperio Pharma.

## Componentes

- `ProductCard.tsx`: Card de produto utilizado em listagens e grades
- `ProductDetails.tsx`: Exibição detalhada de um produto específico
- `ProductList.tsx`: Lista ou grade de produtos com filtragem e paginação
- `ProductRating.tsx`: Componente de avaliação de produtos (estrelas)
- `ProductGallery.tsx`: Galeria de imagens para o produto

## Funcionalidades

Estes componentes permitem:
- Exibição de produtos em diferentes formatos (cards, listas, detalhes)
- Adição de produtos ao carrinho
- Visualização de detalhes e especificações
- Navegação entre produtos relacionados
- Visualização de imagens em galeria

## Uso

```tsx
import { ProductCard } from '@/components/product/ProductCard';
import { ProductList } from '@/components/product/ProductList';
import { ProductDetails } from '@/components/product/ProductDetails';

// Uso de um card individual
<ProductCard product={product} />

// Uso de uma lista de produtos
<ProductList products={products} />

// Uso dos detalhes de um produto
<ProductDetails product={product} />
```

## Integração com Carrinho

Os componentes de produto integram-se com o `CartContext` para:
- Adicionar produtos ao carrinho
- Verificar se um produto já está no carrinho
- Atualizar a quantidade de um produto no carrinho

## Comportamento Responsivo

Todos os componentes são totalmente responsivos:
- Cards adaptam-se ao espaço disponível
- Detalhes reorganizam-se para exibição em dispositivos móveis
- Galeria de imagens funciona em touch e mouse

## Personalização

Para personalizar estes componentes:

1. **ProductCard**: 
   - Edite o layout e informações exibidas no card
   - Personalize o comportamento de hover e interações

2. **ProductDetails**: 
   - Modifique as seções e informações exibidas
   - Ajuste o layout responsivo

3. **ProductList**: 
   - Altere as opções de filtragem
   - Modifique o sistema de grade ou lista

## Observações Importantes

- Todos os componentes lidam adequadamente com estados de carregamento
- Existem fallbacks para imagens não disponíveis
- O formato de preço é consistente em todo o site
- Produtos sem estoque mostram indicação visual clara
