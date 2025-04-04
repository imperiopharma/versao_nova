
# Componentes de Métodos de Envio

Esta pasta contém componentes relacionados aos métodos de envio na Farmácia Imperio.

## Componentes

- `ShippingMethodForm.tsx`: Componente principal para seleção de método de envio
- `ShippingMethodSelector.tsx`: Seletor de método de envio
- `ShippingMethodDetails.tsx`: Exibe detalhes do método selecionado
- `ShippingMethodWarning.tsx`: Exibe avisos relacionados ao envio
- `ShippingParticles.tsx`: Efeito visual de partículas para o card de envio
- `ShippingFormHeader.tsx`: Cabeçalho do formulário de envio

## Funcionalidades

Estes componentes gerenciam:
- Seleção de método de envio
- Cálculo de frete
- Exibição de prazos estimados
- Feedback visual ao usuário
- Avisos específicos para métodos de envio

## Integração com Checkout

Estes componentes são parte crucial do processo de checkout:
- Integram-se ao `CheckoutContext` para armazenar método selecionado
- Calculam frete baseado no endereço e itens no carrinho
- Afetam o valor total do pedido, incluindo combos
- Fornecem feedback visual sobre tempos de entrega

## Avisos Específicos por Método

Cada método de envio pode apresentar avisos específicos:
- PAC: Informações sobre prazos estendidos
- SEDEX: Avisos sobre áreas de cobertura
- Transportadoras: Restrições e requisitos especiais

## Integração com Serviços

Utiliza serviços da API para:
- Calcular valores de frete
- Verificar disponibilidade por região
- Obter prazos de entrega
