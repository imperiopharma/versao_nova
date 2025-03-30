
# Componentes de Cupom

Esta pasta contém componentes relacionados a cupons de desconto na Farmácia Imperio.

## Componentes

- `AppliedCoupon.tsx`: Exibe informações sobre um cupom já aplicado
- `CouponForm.tsx`: Componente principal para gerenciar aplicação de cupons
- `CouponInput.tsx`: Campo de entrada para código de cupom
- `CouponValidationMessage.tsx`: Exibe mensagens de validação de cupom
- `PromotionalInfo.tsx`: Exibe informações promocionais sobre cupons disponíveis

## Funcionalidades

Estes componentes gerenciam:
- Exibição de cupons aplicados
- Aplicação de novos cupons
- Validação de cupons
- Remoção de cupons aplicados
- Feedback visual sobre a validade dos cupons

## Integração com Combos

O sistema de cupons é totalmente compatível com o sistema de combos:
- Cupons podem ser aplicados em cima de combos já com desconto
- Existem cupons exclusivos para combos específicos
- O sistema impede a aplicação de múltiplos descontos incompatíveis
- A lógica de validação verifica a elegibilidade do cupom com o conteúdo do carrinho

## Tipos de Cupons

A aplicação suporta diferentes tipos de cupons:
- Percentual: Desconto percentual sobre o valor total
- Valor fixo: Desconto de valor fixo
- Frete grátis: Remove o custo de frete
- Combo específico: Válido apenas para determinados combos
- Primeira compra: Válido apenas para novos clientes

## Serviços de Cupons

Os componentes se integram com serviços da API:
- Validação de cupom pelo `couponService`
- Aplicação de descontos no carrinho
- Verificação de limites e restrições
