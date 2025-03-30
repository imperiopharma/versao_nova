
# Assistente Virtual (Chatbot)

Esta pasta contém o componente do assistente virtual (chatbot) da Imperio Pharma.

## Componentes

- `VirtualAssistant.tsx`: Implementação completa do assistente virtual da loja

## Funcionalidades

Este componente oferece:
- Interface de chat flutuante na interface da loja
- Respostas para perguntas frequentes
- Assistência na navegação pelo site
- Recomendações de produtos
- Suporte inicial ao cliente

## Uso

O componente `VirtualAssistant` é incluído no layout principal da loja, estando disponível em todas as páginas:

```tsx
import { VirtualAssistant } from '@/components/chatbot/VirtualAssistant';

export const Layout = ({ children }) => {
  return (
    <div>
      {/* Conteúdo do site */}
      {children}
      
      {/* Assistente virtual sempre disponível */}
      <VirtualAssistant />
    </div>
  );
};
```

## Personalização

Para personalizar o assistente virtual:

1. Edite as respostas pré-programadas no componente
2. Ajuste o estilo visual conforme a identidade da marca
3. Configure ações especiais (como redirecionamento para produtos ou seções)
4. Modifique o comportamento de abertura/fechamento automático

## Comportamento Responsivo

O assistente se adapta automaticamente a diferentes tamanhos de tela:
- Em desktop: Posicionado no canto inferior direito como janela flutuante
- Em mobile: Versão mais compacta, expandindo apenas quando necessário

## Observações Importantes

- O assistente é puramente frontend, implementado com React
- As respostas são baseadas em regras simples e correspondência de palavras-chave
- Para funcionalidades mais avançadas, seria necessário integrar com uma API de IA
- O componente é projetado para ser leve e não afetar o desempenho geral do site
