
import React from 'react';
import { Info } from 'lucide-react';

export const PromotionalInfo: React.FC = () => {
  return (
    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-100">
      <Info size={18} className="flex-shrink-0 mt-0.5" />
      <p>
        Experimente alguns cupons como <span className="font-mono bg-white px-1 py-0.5 rounded">DESCONTO10</span> para 10% de desconto 
        ou <span className="font-mono bg-white px-1 py-0.5 rounded">FRETEGRATIS</span> para compras acima de R$ 300.
      </p>
    </div>
  );
};
