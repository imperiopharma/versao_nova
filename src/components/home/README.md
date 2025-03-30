
# Componentes da Página Inicial

Esta pasta contém os componentes específicos da página inicial da loja Imperio Pharma.

## Componentes

- `BrandsSection.tsx`: Seção de marcas parceiras exibidas em uma grade responsiva, organizadas por categorias (Importadas, Premium, Nacionais, Diversos)
- `CategoryCards.tsx`: Cards navegáveis para as principais categorias de produtos
- `FlashSaleSection.tsx`: Seção de combos e promoções em destaque
- `HeroBanner.tsx`: Banner principal rotativo com imagens, títulos, subtítulos e botões de chamada para ação
- `AboutSection.tsx`: Seção com informações sobre a empresa
- `FaqSection.tsx`: Perguntas frequentes agrupadas por temas
- `GuaranteesSection.tsx`: Seção destacando garantias e diferenciais da loja
- `NewsletterSection.tsx`: Formulário para inscrição em newsletter
- `PromoCardsSection.tsx`: Cards promocionais para ofertas especiais

## Funcionalidades

Estes componentes formam a estrutura principal da página inicial, organizados para:
- Destacar produtos e ofertas principais
- Apresentar categorias navegáveis de forma visual
- Exibir as principais marcas disponíveis na loja
- Comunicar claramente os combos especiais
- Fornecer informações institucionais e criar confiança

## Uso

Todos estes componentes são utilizados na página inicial (`HomePage.tsx`), que define a ordem e visibilidade de cada seção.

## Integração de Combos

A seção `FlashSaleSection.tsx` exibe os combos especiais criados pelo administrador:
- Exibe até 4 combos em destaque na página inicial
- Mostra o desconto percentual aplicado
- Permite navegação direta para a página de combos
- Indica visualmente quais produtos são combos

### Como criar um Combo
Os combos são criados no painel administrativo:
1. Acesse `/admin/produtos`
2. Crie um novo produto marcando a opção "É um combo?"
3. Defina o percentual de desconto para o combo
4. Configure preço original e preço com desconto
5. Adicione imagem representativa do combo

## Personalização

Para personalizar estes componentes:

1. **FlashSaleSection**: 
   - Atualize o título ou subtítulo da seção
   - Modifique a quantidade de combos exibidos
   - Altere as cores e estilos conforme necessário

2. **CategoryCards**: 
   - Modifique as categorias no hook `useCategories()`
   - Personalize as cores e ícones no componente

3. **HeroBanner**: 
   - Edite os slides no arquivo `src/data/mock/hero.ts`
   - Ajuste a altura e comportamento responsivo
