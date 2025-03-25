
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useCheckout } from '@/contexts/CheckoutContext';

interface ShippingMethodFormProps {
  setShippingMethod: (method: string) => void;
  formErrors: Record<string, string>;
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export const ShippingMethodForm: React.FC<ShippingMethodFormProps> = ({
  setShippingMethod,
  formErrors
}) => {
  const { customerData } = useCheckout();
  const { setShipping } = useCart();
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([
    { id: 'sedex', name: 'Sedex', price: 25.90, estimatedDays: '2-3 dias úteis' },
    { id: 'pac', name: 'PAC', price: 18.50, estimatedDays: '5-8 dias úteis' },
    { id: 'transportadora', name: 'Transportadora', price: 32.00, estimatedDays: '3-5 dias úteis' }
  ]);
  
  // Calcular frete com base no estado do cliente
  useEffect(() => {
    if (customerData.state) {
      let stateFactor = 1;
      
      // Ajustar preço com base na região
      switch (customerData.state.toUpperCase()) {
        case 'SP':
        case 'RJ':
        case 'MG':
        case 'ES':
          stateFactor = 1; // Sudeste (preço base)
          break;
        case 'PR':
        case 'SC':
        case 'RS':
          stateFactor = 1.1; // Sul
          break;
        case 'MT':
        case 'MS':
        case 'GO':
        case 'DF':
          stateFactor = 1.2; // Centro-Oeste
          break;
        case 'BA':
        case 'SE':
        case 'AL':
        case 'PE':
        case 'PB':
        case 'RN':
        case 'CE':
        case 'PI':
        case 'MA':
          stateFactor = 1.3; // Nordeste
          break;
        case 'AM':
        case 'PA':
        case 'AC':
        case 'RO':
        case 'RR':
        case 'AP':
        case 'TO':
          stateFactor = 1.5; // Norte
          break;
        default:
          stateFactor = 1;
      }
      
      // Atualizar opções de frete com o fator regional
      const updatedOptions = shippingOptions.map(option => ({
        ...option,
        price: parseFloat((option.price * stateFactor).toFixed(2))
      }));
      
      setShippingOptions(updatedOptions);
    }
  }, [customerData.state]);
  
  const handleShippingChange = (value: string) => {
    setShippingMethod(value);
    
    // Encontrar a opção selecionada e atualizar o preço do frete
    const selectedOption = shippingOptions.find(option => option.id === value);
    if (selectedOption) {
      setShipping(selectedOption.price);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
      <h2 className="text-xl font-medium mb-6">Frete (Envio)</h2>
      
      <div>
        <Label htmlFor="shipping" className="mb-1 block">
          Método de Envio *
        </Label>
        <Select
          onValueChange={handleShippingChange}
        >
          <SelectTrigger className={formErrors.shipping ? 'border-imperio-red' : ''}>
            <SelectValue placeholder="Selecione o método de envio" />
          </SelectTrigger>
          <SelectContent>
            {shippingOptions.map(option => (
              <SelectItem key={option.id} value={option.id}>
                {option.name} - {option.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                ({option.estimatedDays})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formErrors.shipping && (
          <p className="text-imperio-red text-sm mt-1">{formErrors.shipping}</p>
        )}
        
        <p className="text-sm text-gray-500 mt-2">
          O valor do frete é calculado com base no seu estado e no método de envio selecionado.
        </p>
      </div>
    </div>
  );
};
