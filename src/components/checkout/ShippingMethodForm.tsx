
import React, { useState, useEffect } from 'react';
import { ShippingFormHeader } from './shipping/ShippingFormHeader';
import { ShippingParticles } from './shipping/ShippingParticles';
import { ShippingMethodSelector } from './shipping/ShippingMethodSelector';
import { ShippingMethodDetails } from './shipping/ShippingMethodDetails';
import { ShippingMethodWarning } from './shipping/ShippingMethodWarning';
import { calculateShipping, mapStoreMethodToApiMethod } from '@/services/shippingService';
import { useCart } from '@/contexts/CartContext';

interface ShippingMethodFormProps {
  setShippingMethod: (method: string | null) => void;
  formErrors: Record<string, string>;
}

export const ShippingMethodForm: React.FC<ShippingMethodFormProps> = ({
  setShippingMethod,
  formErrors,
}) => {
  const { shippingMethod: cartShippingMethod, setShippingMethod: setCartShippingMethod } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(cartShippingMethod);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  
  // Cálculo de frete baseado no método selecionado e estado do cliente
  useEffect(() => {
    if (!selectedMethod) {
      setShippingCost(0);
      return;
    }
    
    setCalculatingShipping(true);
    
    // Simulação de tempo de cálculo (para melhor UX)
    setTimeout(() => {
      // Obter o estado do localStorage
      const state = localStorage.getItem('shipmentState') || 'SP';
      
      // Converter o método da loja para o formato da API
      const apiMethod = mapStoreMethodToApiMethod(selectedMethod);
      
      if (apiMethod) {
        // Calcular o frete
        const cost = calculateShipping(apiMethod, state);
        setShippingCost(cost || 0);
      } else {
        setShippingCost(0);
      }
      
      setCalculatingShipping(false);
    }, 500);
  }, [selectedMethod]);
  
  // Atualizar o método de frete no contexto pai
  useEffect(() => {
    if (!selectedMethod) {
      return;
    }
    
    // Salvar o custo do frete no localStorage para recuperação posterior
    localStorage.setItem('shippingCost', shippingCost.toString());
  }, [shippingCost, selectedMethod]);
  
  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    setShippingMethod(value);
    setCartShippingMethod(value); // Atualizar também no contexto do carrinho
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
