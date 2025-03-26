
# Estrutura do Frontend

Esta é a estrutura principal do projeto frontend da loja Imperio. Aqui estão as principais pastas e suas funções:

- `/components`: Todos os componentes React da aplicação
- `/contexts`: Gerenciadores de estado global usando React Context API
- `/data`: Dados estáticos e mocks para desenvolvimento
- `/hooks`: Custom hooks React para lógica reutilizável
- `/lib`: Utilidades e funções auxiliares
- `/pages`: Componentes de página completa
- `/services`: Integrações com serviços externos
- `/types`: Definições de tipos TypeScript

## Arquitetura Frontend

O projeto segue uma arquitetura baseada em componentes usando React 18, com Typescript para tipagem estática. O estilo é gerenciado principalmente com Tailwind CSS, complementado por componentes shadcn/ui para consistência visual.

O estado global é gerenciado através de React Context (principalmente para o carrinho e checkout), com estados locais gerenciados via React hooks.

## Convenções de Código

- Todos os componentes devem ser funcionais (Function Components)
- Componentes maiores devem ser divididos em subcomponentes menores
- Custom hooks devem ser usados para extrair lógica complexa dos componentes
- Tipagem explícita é priorizada para melhor documentação e segurança de tipo
