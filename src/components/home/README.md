
# Componentes da Página Inicial

Esta pasta contém os componentes específicos da página inicial da loja Imperio Pharma.

## Componentes

- `BrandsSection.tsx`: Seção de marcas parceiras exibidas em uma grade responsiva, organizadas por categorias (Importadas, Premium, Nacionais, Diversos)
- `CategoryCards.tsx`: Cards navegáveis para as principais categorias de produtos
- `FlashSaleSection.tsx`: Seção de combos e promoções em destaque
- `HeroBanner.tsx`: Banner principal rotativo com imagens, títulos, subtítulos e botões de chamada para ação

## Funcionalidades

Estes componentes formam a estrutura principal da página inicial, organizados para:
- Destacar produtos e ofertas principais
- Apresentar categorias navegáveis de forma visual
- Exibir as principais marcas disponíveis na loja
- Comunicar promoções e combos atrativos

## Uso

Todos estes componentes são utilizados na página inicial (`HomePage.tsx`), que define a ordem e visibilidade de cada seção.

## Dependências

- Os componentes utilizam dados fornecidos pelos hooks:
  - `useHomeData()`: Centraliza a busca de dados para a página inicial
  - `useBrands()`: Fornece os dados de marcas
  - `useCategories()`: Fornece os dados de categorias
  - `useProducts()`: Fornece os dados de produtos

## Personalização

Para personalizar estes componentes:

1. **BrandsSection**: 
   - Edite as categorias de marcas no hook `useBrands()`
   - Ajuste o layout alterando as classes de grid

2. **CategoryCards**: 
   - Modifique as categorias no hook `useCategories()`
   - Personalize as cores e ícones no componente

3. **FlashSaleSection**: 
   - Atualize os itens em promoção no hook `useProducts()`
   - Ajuste a estrutura e estilos conforme necessário

4. **HeroBanner**: 
   - Edite os slides no arquivo `src/data/mock/hero.ts`
   - Ajuste a altura e comportamento responsivo através das classes Tailwind
