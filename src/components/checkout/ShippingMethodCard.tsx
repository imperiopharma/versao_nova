
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShippingMethodCardProps {
  shippingMethod: string | null;
  shippingCost: number;
}

export const ShippingMethodCard: React.FC<ShippingMethodCardProps> = ({ 
  shippingMethod, 
  shippingCost 
}) => {
  const getShippingMethodDisplay = () => {
    switch (shippingMethod) {
      case 'sedex':
        return 'Sedex';
      case 'pac':
        return 'PAC';
      case 'transportadora':
        return 'Transportadora';
      default:
        return 'Não selecionado';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-imperio-navy">Frete escolhido</h2>
        <Button variant="ghost" size="sm" className="text-imperio-navy" asChild>
          <Link to="/checkout/dados">
            <Edit2 size={18} className="mr-2" />
            Editar
          </Link>
        </Button>
      </div>
      
      <div className="bg-imperio-extra-light-navy rounded-lg p-4 border border-imperio-navy/10">
        <div className="flex justify-between items-center">
          <span className="font-medium">{getShippingMethodDisplay()}</span>
          <span className="font-semibold text-imperio-navy text-lg">
            {shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>
    </div>
  );
};
