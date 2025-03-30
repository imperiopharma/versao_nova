
# Componentes de Checkout

Esta pasta contém os componentes relacionados ao processo de checkout (finalização de compra) da Imperio Pharma.

## Componentes

- `CheckoutForm.tsx`: Formulário para coleta de dados do cliente
- `OrderSummary.tsx`: Resumo do pedido durante o checkout
- `PaymentOptions.tsx`: Opções de pagamento disponíveis
- `AddressForm.tsx`: Formulário para endereço de entrega
- `CheckoutSteps.tsx`: Indicador de progresso do checkout

## Funcionalidades

Estes componentes permitem:
- Coleta e validação de dados do cliente
- Seleção de endereço de entrega
- Escolha de método de pagamento
- Visualização do resumo do pedido
- Confirmação e finalização da compra

## Fluxo de Checkout

O processo de checkout é dividido em três etapas principais:
1. **Dados do Cliente**: Informações pessoais e endereço de entrega
2. **Resumo do Pedido**: Revisão dos itens, frete e valores
3. **Pagamento**: Seleção do método de pagamento e finalização

## Uso

Os componentes são utilizados nas páginas de checkout:

```tsx
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';

// Na primeira etapa do checkout
function CheckoutDadosPage() {
  return (
    <Layout>
      <CheckoutSteps currentStep={1} />
      <CheckoutForm />
    </Layout>
  );
}

// Na segunda etapa do checkout
function CheckoutResumoPage() {
  return (
    <Layout>
      <CheckoutSteps currentStep={2} />
      <OrderSummary />
    </Layout>
  );
}
```

## Integração com Contextos

Os componentes utilizam:
- `CartContext`: Para acessar itens e valores do carrinho
- `CheckoutContext`: Para gerenciar o estado entre etapas do checkout

## Validação de Dados

Os formulários incluem validação completa de:
- Dados pessoais (nome, email, telefone)
- Endereço completo
- CEP com busca automática
- Campos obrigatórios

## Personalização

Para personalizar estes componentes:

1. **CheckoutForm**: 
   - Adicione ou remova campos no formulário
   - Modifique as regras de validação

2. **OrderSummary**: 
   - Ajuste as informações exibidas no resumo
   - Altere o cálculo de frete ou descontos

3. **PaymentOptions**: 
   - Adicione ou remova métodos de pagamento
   - Personalize o layout e descrições

## Observações Importantes

- Os dados de checkout são mantidos no `CheckoutContext` durante a navegação entre etapas
- Existe validação em cada etapa para evitar avançar com dados incompletos
- O checkout integra-se ao backend ao finalizar para registrar o pedido
- A navegação entre etapas é controlada, impedindo acesso direto sem completar etapas anteriores
