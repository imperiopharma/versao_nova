
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerData } from '@/contexts/CheckoutContext';

interface ShippingAddressCardProps {
  customerData: CustomerData;
}

export const ShippingAddressCard: React.FC<ShippingAddressCardProps> = ({ 
  customerData 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-imperio-navy">Endereço de Entrega</h2>
        <Button variant="ghost" size="sm" className="text-imperio-navy" asChild>
          <Link to="/checkout/dados">
            <Edit2 size={18} className="mr-2" />
            Editar
          </Link>
        </Button>
      </div>
      
      <div className="bg-imperio-extra-light-navy rounded-lg p-4 border border-imperio-navy/10">
        <p className="font-medium">{customerData.name}</p>
        <p>{customerData.street}, {customerData.number}</p>
        {customerData.complement && <p>{customerData.complement}</p>}
        <p>{customerData.neighborhood}, {customerData.city} - {customerData.state}</p>
        <p>CEP: {customerData.cep}</p>
        <div className="mt-3 pt-3 border-t border-imperio-navy/10">
          <p>CPF: {customerData.cpf}</p>
          <p>WhatsApp: {customerData.whatsapp}</p>
          <p>Email: {customerData.email}</p>
        </div>
      </div>
    </div>
  );
};
