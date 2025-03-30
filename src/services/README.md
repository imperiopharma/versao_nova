
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

## Serviços Disponíveis

- `apiService.ts`: Funções para comunicação com APIs REST
- `storageService.ts`: Gerenciamento de arquivos e upload
- `analyticsService.ts`: Integração com serviços de analytics

## Integrações

Os serviços utilizam principalmente o Supabase como backend, mas podem ser configurados para outras APIs conforme necessário.
