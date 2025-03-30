
# Serviços

Esta pasta contém serviços para comunicação com APIs externas e outras integrações.

## Uso

Os serviços encapsulam lógica de comunicação com APIs e outros serviços externos, separando a lógica de negócio da de comunicação:

```tsx
import { getApiService } from '@/services/apiService';

async function handleData(data) {
  const response = await getApiService(data);
  // Processar resposta
}
```
