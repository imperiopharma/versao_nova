
# Componentes de Gerenciamento de Produtos

Esta pasta contém os componentes relacionados ao gerenciamento de produtos, marcas, categorias e combos no painel administrativo.

## Componentes

- `ProductsList.tsx`: Lista dos produtos com opções para adicionar, editar e excluir
- `ProductDialog.tsx`: Formulário para adicionar ou editar produtos/combos
- `ProductTableRow.tsx`: Linha de tabela para exibição resumida de produto
- `BrandsList.tsx`: Lista das marcas com opções para adicionar, editar e excluir
- `CategoriesList.tsx`: Lista das categorias com opções para adicionar, editar e excluir
- `DeleteProductDialog.tsx`: Confirmação para exclusão de produtos

## Sistema de Gerenciamento de Combos

### Criação/Edição de Combos

Os combos são criados/editados usando o mesmo componente `ProductDialog.tsx`, que foi adaptado para suportar configurações específicas de combos:

1. Campo `isCombo`: Toggle para indicar se o produto é um combo
2. Campo `comboDiscount`: Input para o percentual de desconto (habilitado quando isCombo=true)
3. Campo `originalPrice`: Preço original antes do desconto
4. Campo `price`: Campo calculado automaticamente baseado no preço original e desconto

### Fluxo de Criação de Combos

1. Administrador acessa a seção "Produtos"
2. Clica em "Adicionar Produto"
3. Preenche informações básicas (nome, marca, categoria, etc.)
4. Ativa a opção "É um Combo?"
5. Define o percentual de desconto
6. Informa o preço original
7. O sistema calcula automaticamente o preço final
8. Administrador salva o combo

### Visualização de Combos

- `ProductsTable.tsx` exibe indicador visual para combos
- Coluna especial mostra o percentual de desconto aplicado
- Filtro permite visualizar apenas combos

## Integração com Serviços

Todos os componentes estão integrados com:
- `productService` para gerenciamento de produtos
- `categoryService` para gerenciamento de categorias
- `brandService` para gerenciamento de marcas
