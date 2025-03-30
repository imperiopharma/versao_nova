
import React from 'react';

export const PaymentInstructions: React.FC<{ total: number }> = ({ total }) => {
  return (
    <div>
      <h3 className="font-medium text-imperio-navy mb-3">Instruções</h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
        <li>Abra o aplicativo do seu banco</li>
        <li>Selecione a opção PIX</li>
        <li>Cole a chave PIX copiada acima</li>
        <li>Digite o valor exato do pedido: <span className="font-medium">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></li>
        <li>Confirme o pagamento e salve o comprovante</li>
        <li>Anexe o comprovante abaixo</li>
      </ol>
    </div>
  );
};
