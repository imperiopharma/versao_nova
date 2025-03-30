
# Componentes de Layout

Esta pasta contém componentes estruturais que definem o layout básico da aplicação.

## Componentes

- `Layout.tsx`: Wrapper principal que envolve todas as páginas
- `Header.tsx`: Cabeçalho principal com navegação, logo e funcionalidades (carrinho, busca)
- `Footer.tsx`: Rodapé do site com links institucionais, contatos, etc.
- `MobileNavBar.tsx`: Barra de navegação específica para dispositivos móveis

## Header

O `Header.tsx` inclui:
- Logo da empresa
- Menu de navegação principal
- Busca de produtos
- Ícone de carrinho com indicador de quantidade
- Menu de usuário (login/cadastro/perfil)
- Menu de categorias expansível

### Menu de Combos

O Header inclui um link destacado para a página de Combos Especiais, permitindo:
- Acesso rápido às ofertas promocionais
- Navegação direta para todos os combos disponíveis
- Destaque visual para chamar atenção do usuário

## Footer

O `Footer.tsx` contém:
- Links institucionais (Sobre Nós, Política de Privacidade)
- Informações de contato
- Redes sociais
- Newsletter
- Formas de pagamento aceitas
- Copyright

## MobileNavBar

A `MobileNavBar.tsx` oferece:
- Navegação adaptada para dispositivos móveis
- Acesso rápido às principais seções
- Ícone de carrinho
- Acesso ao perfil do usuário
- Link destacado para combos promocionais

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
