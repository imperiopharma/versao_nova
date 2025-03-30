
# Integração com APIs Externas

Esta pasta contém a configuração e código para integração com APIs externas que fornecem dados para a aplicação.

## Estrutura

Esta pasta está organizada para facilitar a comunicação com diferentes APIs externas:

- `client.ts`: Configurações básicas para clientes HTTP
- `types.ts`: Definições de tipos para respostas de APIs externas

## Uso

Este módulo facilita a comunicação com APIs externas:

```tsx
import { configureApiClient } from '@/integrations/client';

// Configurar cliente para uma API externa
const apiClient = configureApiClient('https://api.exemplo.com', {
  headers: {
    'Authorization': 'Bearer token'
  }
});

// Usar o cliente configurado
async function fetchData() {
  try {
    const response = await apiClient.get('/endpoint');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return null;
  }
}
```

## Funcionalidades

Os módulos nesta pasta oferecem:
- Configuração centralizada para clientes de API
- Interceptores para tratamento uniforme de erros
- Transformadores para padronização de respostas
- Gerenciamento de tokens e autenticação
- Tipos TypeScript para respostas de API

## Integração com Serviços

Os serviços da aplicação utilizam estas integrações para se comunicar com o backend:
- `productService` usa o cliente API para buscar produtos
- `categoryService` para gerenciar categorias
- `brandService` para gerenciar marcas
- `customerService` para gerenciar clientes
