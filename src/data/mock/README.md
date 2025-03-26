
# Dados Mock

Esta pasta contém dados fictícios usados para desenvolvimento e demonstração da Farmácia Imperio.

## Arquivos

- `brands.ts`: Lista de marcas parceiras com nome, logo e descrição
- `categories.tsx`: Categorias e subcategorias de produtos com ícones e descrições
- `faq.ts`: Perguntas frequentes agrupadas por temas
- `hero.ts`: Dados para os banners principais rotativos da home
- `products.ts`: Catálogo completo de produtos fictícios com todas as propriedades

## Uso

Estes dados são usados principalmente durante as fases de desenvolvimento ou quando:
- O backend ainda não está completamente implementado
- É necessário trabalhar offline
- Deseja-se demonstrar a interface sem configurar todos os dados reais
- Realizam-se testes de interface e usabilidade

Em ambiente de produção, estes dados seriam substituídos por chamadas de API reais ao Supabase ou outro sistema de backend.

## Estrutura dos Dados

Cada arquivo segue a estrutura de tipos definida em `/src/types`, garantindo consistência entre os dados mock e os dados reais da aplicação.
