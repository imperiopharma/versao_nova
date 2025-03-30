
# Componentes de Checkout

Esta pasta contém componentes relacionados ao processo de checkout na Farmácia Imperio, integrados com o Supabase para persistência de dados.

## Componentes

- `AddressForm.tsx`: Formulário de endereço do cliente
- `CartSummary.tsx`: Resumo do carrinho durante o checkout
- `CheckoutNavigation.tsx`: Navegação entre etapas do checkout
- `CheckoutPageHeader.tsx`: Cabeçalho das páginas de checkout
- `CheckoutSteps.tsx`: Indicador visual das etapas do checkout
- `CouponForm.tsx`: Formulário para aplicação de cupons de desconto
- `CustomerInfoForm.tsx`: Formulário de informações do cliente
- `FormInput.tsx`: Input estilizado para formulários de checkout
- `FormInputMask.tsx`: Input com máscara para dados formatados
- `HowFoundUsForm.tsx`: Formulário sobre como o cliente conheceu a loja
- `OrderItemsCard.tsx`: Card com itens do pedido
- `SecurityBadge.tsx`: Badge de segurança do checkout
- `ShippingAddressCard.tsx`: Card com endereço de entrega
- `ShippingMethodCard.tsx`: Card com método de envio selecionado
- `ShippingMethodForm.tsx`: Formulário para seleção de método de envio

## Integração com Supabase

Estes componentes se integram com o Supabase para:
- Salvar pedidos no banco de dados
- Verificar e aplicar cupons de desconto
- Validar informações de clientes
- Persistir endereços para uso futuro
- Processar pagamentos de forma segura

## Fluxo de Checkout

O processo de checkout é dividido em etapas:
1. **Dados**: Coleta de informações pessoais e endereço
2. **Resumo**: Visualização do resumo do pedido e aplicação de cupons
3. **Pagamento**: Seleção e processamento de pagamento

Os dados são enviados para o Supabase após a confirmação do pedido, criando registros nas tabelas:
- `orders`: Informações gerais do pedido
- `order_items`: Itens individuais do pedido
- `customers`: Dados do cliente (se novo cliente)

## Uso do CheckoutContext

O `CheckoutContext` gerencia o estado global do checkout, permitindo que os componentes:
- Acessem informações do cliente
- Vejam itens do carrinho
- Apliquem e validem cupons
- Calculem valores de frete e descontos
- Finalizem o pedido enviando dados para o Supabase

## Segurança

Todas as interações com o backend Supabase são protegidas por:
- Validação de dados no frontend e backend
- Políticas de segurança no banco de dados (RLS)
- Transações atômicas para garantir integridade dos dados
- Autenticação para operações que requerem privilégios
