
import React, { useState, useEffect } from 'react';
import { Truck, AlertTriangle, PackageCheck, LucideTruck, Timer, BadgeCheck, Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

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
  
  const getDeliveryEstimate = (method: string) => {
    switch (method) {
      case 'sedex': return '1-2 dias úteis';
      case 'pac': return '3-7 dias úteis';
      case 'transportadora': return '3-5 dias úteis';
      default: return '';
    }
  };
  
  return (
    <div className="tech-card p-6 mb-8 group">
      {/* Efeito de partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-blue-500 rounded-full floating-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-gradient-to-r from-imperio-navy to-imperio-light-navy p-3 rounded-xl shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <Truck size={22} className="text-white relative z-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent">
            Método de Envio
          </h2>
          <p className="text-xs text-imperio-navy/60 mt-1">Escolha a melhor opção para receber seu pedido</p>
        </div>
      </div>
      
      <div className="space-y-6 relative z-10">
        <div>
          <Label htmlFor="shipping-method" className="font-medium mb-2 block">
            Selecione o método de envio *
          </Label>
          <Select
            value={selectedMethod || ""}
            onValueChange={handleMethodChange}
          >
            <SelectTrigger className={`border-imperio-navy/20 bg-white/80 backdrop-blur-sm shadow-md rounded-xl transition-all ${formErrors.shippingMethod ? 'border-imperio-red' : ''}`}>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-lg border-imperio-navy/20 rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-imperio-extra-light-navy/20 pointer-events-none"></div>
              
              <SelectItem value="sedex" className="focus:bg-imperio-extra-light-navy mb-2 rounded-lg group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Zap size={18} className="mr-2 text-imperio-navy group-hover:scale-110 transition-transform" />
                    <span className="text-imperio-navy font-medium">Sedex</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Rápido</Badge>
                </div>
              </SelectItem>
              
              <SelectItem value="pac" className="focus:bg-imperio-extra-light-navy mb-2 rounded-lg group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <PackageCheck size={18} className="mr-2 text-imperio-navy group-hover:scale-110 transition-transform" />
                    <span className="text-imperio-navy font-medium">PAC</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Econômico</Badge>
                </div>
              </SelectItem>
              
              <SelectItem value="transportadora" className="focus:bg-imperio-extra-light-navy rounded-lg group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Truck size={18} className="mr-2 text-imperio-navy group-hover:scale-110 transition-transform" />
                    <span className="text-imperio-navy font-medium">Transportadora</span>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Robusto</Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          {formErrors.shippingMethod && (
            <p className="text-imperio-red text-sm mt-2">{formErrors.shippingMethod}</p>
          )}
        </div>
        
        {/* Mostrar o valor do frete calculado */}
        {selectedMethod && (
          <div className="mt-4 p-5 bg-gradient-to-r from-imperio-extra-light-navy/70 to-imperio-extra-light-navy/30 rounded-xl border border-imperio-navy/20 shadow-md backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] animate-[shimmer_3s_infinite] pointer-events-none"></div>
            
            <div className="flex items-center mb-3">
              <BadgeCheck size={20} className="text-imperio-navy mr-2" />
              <h3 className="font-medium text-imperio-navy">Detalhes do Envio</h3>
            </div>
            
            {calculatingShipping ? (
              <div className="flex items-center justify-center py-3">
                <div className="w-5 h-5 border-t-2 border-b-2 border-imperio-navy rounded-full animate-spin mr-2"></div>
                <span className="text-imperio-navy/70">Calculando...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-imperio-navy/10">
                  <div className="flex items-center">
                    <Truck size={16} className="mr-2 text-imperio-navy/70" />
                    <span className="text-imperio-navy/80">Método:</span>
                  </div>
                  <span className="font-medium text-imperio-navy">
                    {selectedMethod === 'sedex' ? 'Sedex' : 
                     selectedMethod === 'pac' ? 'PAC' : 'Transportadora'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-imperio-navy/10">
                  <div className="flex items-center">
                    <Timer size={16} className="mr-2 text-imperio-navy/70" />
                    <span className="text-imperio-navy/80">Prazo estimado:</span>
                  </div>
                  <span className="font-medium text-imperio-navy">
                    {getDeliveryEstimate(selectedMethod)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-1">
                  <span className="text-imperio-navy font-medium">Total do frete:</span>
                  <span className="font-bold text-imperio-navy text-lg">
                    {shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Aviso sobre prazo de entrega */}
        <Alert className="mt-4 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 backdrop-blur-sm border border-yellow-200/70 shadow-sm">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-sm text-amber-800">
            Os prazos de entrega são estimados e podem variar de acordo com a região e disponibilidade.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
