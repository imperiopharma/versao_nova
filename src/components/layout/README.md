
# Componentes de Layout

Esta pasta contém componentes estruturais que definem o layout básico da aplicação.

## Componentes

- `Layout.tsx`: Wrapper principal que envolve todas as páginas
- `Header.tsx`: Cabeçalho principal com navegação, logo e funcionalidades (carrinho, busca)
- `Footer.tsx`: Rodapé do site com links institucionais, contatos, etc.
- `MobileNavBar.tsx`: Barra de navegação específica para dispositivos móveis

## Funcionalidades

Estes componentes definem:
- Estrutura básica consistente em todas as páginas
- Navegação principal do site
- Identidade visual da marca
- Adaptação responsiva para diferentes dispositivos

## Uso

O componente `Layout` deve envolver todas as páginas principais do site:

```tsx
import { Layout } from '@/components/layout/Layout';

export const MinhaPage = () => {
  return (
    <Layout>
      {/* Conteúdo da página */}
    </Layout>
  );
};
```

## Dependências

- Os componentes de layout utilizam:
  - Contexto `CartContext` para exibir quantidade de itens no carrinho
  - Router do React Router para navegação
  - Componentes UI da biblioteca Shadcn

## Personalização

Para personalizar estes componentes:

1. **Layout**: 
   - Edite `Layout.tsx` para alterar a estrutura global das páginas
   - Pode-se adicionar mais contextos ou providers neste componente

2. **Header**: 
   - Modifique `Header.tsx` para alterar logotipo, menu principal e funcionalidades
   - Ajuste as opções de navegação conforme necessário

3. **Footer**: 
   - Atualize `Footer.tsx` para alterar informações de contato, links e copyright
   - Personalize a estrutura de colunas e responsividade

4. **MobileNavBar**: 
   - Edite `MobileNavBar.tsx` para ajustar o comportamento em dispositivos móveis
   - Configure quais itens aparecem na navegação mobile
