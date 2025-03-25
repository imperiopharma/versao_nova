
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShippingMethodFormProps {
  setShippingMethod: (method: string) => void;
  formErrors: Record<string, string>;
}

export const ShippingMethodForm: React.FC<ShippingMethodFormProps> = ({
  setShippingMethod,
  formErrors
}) => {
  return (
    <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
      <h2 className="text-xl font-medium mb-6">Frete (Envio)</h2>
      
      <div>
        <Label htmlFor="shipping" className="mb-1 block">
          Método de Envio *
        </Label>
        <Select
          onValueChange={(value) => setShippingMethod(value)}
        >
          <SelectTrigger className={formErrors.shipping ? 'border-imperio-red' : ''}>
            <SelectValue placeholder="Selecione o método de envio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedex">Sedex</SelectItem>
            <SelectItem value="pac">PAC</SelectItem>
            <SelectItem value="transportadora">Transportadora</SelectItem>
          </SelectContent>
        </Select>
        {formErrors.shipping && (
          <p className="text-imperio-red text-sm mt-1">{formErrors.shipping}</p>
        )}
        
        <p className="text-sm text-gray-500 mt-2">
          O valor do frete será calculado com base no seu estado e no método de envio selecionado.
        </p>
      </div>
    </div>
  );
};
