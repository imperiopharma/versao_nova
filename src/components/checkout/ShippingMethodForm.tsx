
import React, { useState, useEffect } from 'react';
import { ShippingFormHeader } from './shipping/ShippingFormHeader';
import { ShippingParticles } from './shipping/ShippingParticles';
import { ShippingMethodSelector } from './shipping/ShippingMethodSelector';
import { ShippingMethodDetails } from './shipping/ShippingMethodDetails';
import { ShippingMethodWarning } from './shipping/ShippingMethodWarning';

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
    <div className="tech-card p-6 mb-8 group">
      {/* Efeito de partículas */}
      <ShippingParticles />
      
      {/* Cabeçalho */}
      <ShippingFormHeader />
      
      <div className="space-y-6 relative z-10">
        {/* Seletor de método de envio */}
        <ShippingMethodSelector 
          selectedMethod={selectedMethod}
          onMethodChange={handleMethodChange}
          formError={formErrors.shippingMethod}
        />
        
        {/* Mostrar o valor do frete calculado */}
        {selectedMethod && (
          <ShippingMethodDetails
            selectedMethod={selectedMethod}
            shippingCost={shippingCost}
            calculatingShipping={calculatingShipping}
          />
        )}
        
        {/* Aviso sobre prazo de entrega */}
        <ShippingMethodWarning />
      </div>
    </div>
  );
};
