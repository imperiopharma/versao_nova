
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const PaymentWarning: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex">
        <AlertTriangle className="text-yellow-600 flex-shrink-0 mr-3 mt-1" size={20} />
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> O pedido só será processado após a confirmação do pagamento.
          Você receberá um aviso por WhatsApp quando o pagamento for verificado.
        </p>
      </div>
    </div>
  );
};
