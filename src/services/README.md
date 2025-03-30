
# Serviços da API

Esta pasta contém os serviços para comunicação com APIs externas e outras integrações da Farmácia Imperio.

## Estrutura

Os serviços foram organizados em arquivos individuais por entidade, seguindo boas práticas de modularização:

- `apiClient.ts`: Cliente axios configurado para comunicação com a API
- `productService.ts`: Serviço para gerenciamento de produtos
- `categoryService.ts`: Serviço para gerenciamento de categorias
- `brandService.ts`: Serviço para gerenciamento de marcas
- `customerService.ts`: Serviço para gerenciamento de clientes
- `apiService.ts`: Exporta todos os serviços para compatibilidade

## Uso

Os serviços encapsulam lógica de comunicação com APIs e outros serviços externos, separando a lógica de negócio da comunicação:

```tsx
// Importando um serviço específico
import { productService } from '@/services/productService';

async function handleProducts() {
  const products = await productService.getAll();
  // Processar produtos
}

// Ou usando o serviço centralizado
import { categoryService } from '@/services/apiService';

async function handleCategories() {
  const categories = await categoryService.getAll();
  // Processar categorias
}
```

## Cliente API

Todos os serviços utilizam o `apiClient.ts`, que é um cliente axios configurado com a URL base e cabeçalhos padrão:

```tsx
import { apiClient } from '@/services/apiClient';

// Uso direto do cliente (se necessário)
const customRequest = async () => {
  const response = await apiClient.get('/endpoint-personalizado');
  return response.data;
};
```

## Implementação de Novos Serviços

Para adicionar um novo serviço:

1. Crie um novo arquivo seguindo o padrão `nomeEntidadeService.ts`
2. Importe o `apiClient`
3. Exporte um objeto com métodos CRUD e outros necessários
4. Atualize o `apiService.ts` para incluir o novo serviço

## Integração com Hooks

Cada serviço é utilizado por hooks específicos na pasta `src/hooks/`, que encapsulam a lógica de estado e interação com os serviços.
