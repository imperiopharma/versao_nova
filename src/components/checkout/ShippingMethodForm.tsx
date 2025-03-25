
import React, { useState, useEffect } from 'react';
import { Truck, AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShippingMethodFormProps {
  setShippingMethod: (method: string | null) => void;
  formErrors: Record<string, string>;
}

export const ShippingMethodForm: React.FC<ShippingMethodFormProps> = ({
  setShippingMethod,
  formErrors,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  
  // Cálculo simulado de frete com base no método selecionado
  useEffect(() => {
    if (!selectedMethod) {
      setShippingCost(0);
      return;
    }
    
    setCalculatingShipping(true);
    
    // Simulação de cálculo de frete
    setTimeout(() => {
      const state = localStorage.getItem('shipmentState') || 'SP';
      
      if (state === 'SP' || state === 'RJ') {
        if (selectedMethod === 'sedex') setShippingCost(20);
        else if (selectedMethod === 'pac') setShippingCost(15);
        else if (selectedMethod === 'transportadora') setShippingCost(40);
      } else {
        if (selectedMethod === 'sedex') setShippingCost(30);
        else if (selectedMethod === 'pac') setShippingCost(20);
        else if (selectedMethod === 'transportadora') setShippingCost(40);
      }
      
      setCalculatingShipping(false);
    }, 500);
  }, [selectedMethod]);
  
  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    setShippingMethod(value);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-imperio-navy border-b pb-3">Método de Envio</h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="shipping-method" className="font-medium mb-2 block">
            Selecione o método de envio *
          </Label>
          <Select
            value={selectedMethod || ""}
            onValueChange={handleMethodChange}
          >
            <SelectTrigger className={formErrors.shippingMethod ? 'border-imperio-red' : ''}>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedex">Sedex</SelectItem>
              <SelectItem value="pac">PAC</SelectItem>
              <SelectItem value="transportadora">Transportadora</SelectItem>
            </SelectContent>
          </Select>
          
          {formErrors.shippingMethod && (
            <p className="text-imperio-red text-sm mt-2">{formErrors.shippingMethod}</p>
          )}
        </div>
        
        {/* Mostrar o valor do frete calculado */}
        {selectedMethod && (
          <div className="mt-4 p-4 bg-imperio-extra-light-navy rounded-lg border border-imperio-navy/20">
            <h3 className="font-medium mb-2">Valor do Frete</h3>
            {calculatingShipping ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-imperio-navy rounded-full animate-spin mr-2"></div>
                <span>Calculando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>Total do frete:</span>
                <span className="font-semibold text-imperio-navy text-lg">
                  {shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            )}
          </div>
        )}
        
        {/* Aviso sobre prazo de entrega */}
        <Alert className="mt-4 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-sm text-yellow-800">
            Os prazos de entrega são estimados e podem variar de acordo com a região.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
