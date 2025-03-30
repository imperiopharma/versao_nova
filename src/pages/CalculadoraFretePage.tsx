
import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  shippingData, 
  ShippingMethod, 
  formatCurrency, 
  getMethodDisplayName,
  getDeliveryEstimate
} from '../services/shippingService';

export const CalculadoraFretePage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  
  // Lista de estados brasileiros
  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];
  
  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };
  
  // Obtém os métodos de envio disponíveis para o estado selecionado
  const getShippingMethods = () => {
    if (!selectedState) return [];
    
    const methods: { method: ShippingMethod; cost: number }[] = [];
    
    Object.keys(shippingData).forEach((method) => {
      const methodData = shippingData[method as ShippingMethod];
      if (methodData && methodData[selectedState]) {
        methods.push({
          method: method as ShippingMethod,
          cost: methodData[selectedState]
        });
      }
    });
    
    return methods;
  };
  
  const availableMethods = getShippingMethods();
  
  return (
    <Layout>
      <div className="section-container py-10">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="mb-6 text-imperio-navy hover:text-imperio-navy/80"
          >
            <Link to="/">
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </Link>
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-imperio-navy mb-4 text-center">
            Calculadora de Fretes
          </h1>
          
          <p className="text-gray-600 mb-6 text-center">
            Selecione um estado para consultar os valores de frete disponíveis.
          </p>
          
          <div className="mb-8">
            <Label htmlFor="stateSelect" className="mb-2 block font-medium">
              Estado
            </Label>
            <Select value={selectedState} onValueChange={handleStateChange}>
              <SelectTrigger id="stateSelect" className="w-full bg-white border-imperio-navy/20">
                <SelectValue placeholder="Selecione um estado" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedState && (
            <div className="bg-gray-50 rounded-lg p-5 border border-imperio-navy/10">
              <h2 className="text-lg font-semibold text-imperio-navy mb-4">
                Valores de Frete para {selectedState}
              </h2>
              
              {availableMethods.length > 0 ? (
                <div className="space-y-4">
                  {availableMethods.map(({ method, cost }) => (
                    <div 
                      key={method} 
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-imperio-navy">
                          {getMethodDisplayName(method)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {getDeliveryEstimate(method)}
                        </p>
                      </div>
                      <div className="font-bold text-imperio-navy">
                        {formatCurrency(cost)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">
                  Não há métodos de envio disponíveis para este estado.
                </p>
              )}
            </div>
          )}
          
          <div className="mt-8 p-4 bg-imperio-extra-light-navy rounded-lg">
            <h3 className="font-medium mb-2 text-imperio-navy">Importante:</h3>
            <p className="text-sm text-gray-600">
              Os valores apresentados são estimados e podem variar de acordo com promoções, 
              dimensões do pacote ou condições especiais. Para mais informações, entre em 
              contato com nossa equipe de atendimento.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
