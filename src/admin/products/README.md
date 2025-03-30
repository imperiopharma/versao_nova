
# Componentes de Gerenciamento de Produtos

Esta pasta contém os componentes relacionados ao gerenciamento de produtos, marcas e categorias no painel administrativo.

## Componentes

- `ProductsList.tsx`: Lista dos produtos com opções para adicionar, editar e excluir
- `BrandsList.tsx`: Lista das marcas com opções para adicionar, editar e excluir
- `CategoriesList.tsx`: Lista das categorias com opções para adicionar, editar e excluir

## Funcionalidades

Estes componentes permitem:
- Visualização completa de produtos, marcas e categorias
- Adição de novos itens
- Edição de itens existentes
- Exclusão de itens
- Filtragem e pesquisa
- Upload de imagens
- Gerenciamento de combos e kits promocionais
- Aplicação de descontos em combos

## Uso

Estes componentes são utilizados na página de gerenciamento de produtos (`ProductsPage.tsx`), organizados em abas.

## Dependências

- Os componentes utilizam:
  - `useProductStore()`: Hook centralizado para gerenciar produtos, marcas e categorias
  - Supabase para operações de CRUD e armazenamento de imagens
  - Componentes UI da biblioteca Shadcn

## Integração com Backend

Todos os componentes estão integrados com o Supabase para:
- Buscar dados atualizados
- Persistir alterações no banco de dados
- Fazer upload de imagens
- Aplicar políticas de segurança (RLS)

## Personalização

Para personalizar estes componentes:

1. **ProductsList**: 
   - Edite os campos do formulário de produto em `ProductDialog.tsx`
   - Modifique as colunas e informações exibidas na lista

2. **BrandsList**: 
   - Ajuste os campos do formulário de marca
   - Personalize as categorias de marcas disponíveis

3. **CategoriesList**: 
   - Altere os campos do formulário de categoria
   - Modifique as opções de status disponíveis

## Combos e Kits

Os produtos podem ser configurados como combos ou kits promocionais:

1. Na janela de edição de produtos, selecione o tipo "Combo/Kit"
2. Defina o percentual de desconto aplicado ao combo
3. Configure preços e estoque normalmente
4. Os combos são exibidos na página de combos e em promoções especiais

## Observações Importantes

- Todos os componentes respeitam as políticas de Row Level Security do Supabase
- Apenas usuários com função "admin" podem acessar estas funcionalidades
- As alterações são refletidas em tempo real na loja
