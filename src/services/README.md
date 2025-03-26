
# Serviços

Esta pasta contém serviços para comunicação com APIs externas e outras integrações.

## Serviços Disponíveis

- `chatbotService.ts`: Integração com o serviço de chatbot

## Uso

Os serviços encapsulam lógica de comunicação com APIs e outros serviços externos, separando a lógica de negócio da de comunicação:

```tsx
import { getChatbotResponse } from '@/services/chatbotService';

async function handleUserMessage(message) {
  const response = await getChatbotResponse(message);
  // Processar resposta
}
```
