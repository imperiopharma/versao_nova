
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CheckoutStepsProps {
  currentStep: number;
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Carrinho' },
    { id: 2, name: 'Dados' },
    { id: 3, name: 'Resumo' },
    { id: 4, name: 'Pagamento' },
  ];

  const calculateProgress = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  return (
    <div className="mb-10 animate-fade-in">
      {/* Barra de progresso futurista com gradiente nas cores do Paraguai */}
      <div className="mb-3 relative">
        <Progress 
          value={calculateProgress()} 
          className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 overflow-hidden rounded-full border border-white/50 shadow-inner"
        />
        
        {/* Overlay de efeito brilhante */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
        
        {/* Marcas nas etapas na barra de progresso */}
        {steps.map((step, index) => (
          <div 
            key={`mark-${step.id}`}
            className={`absolute top-0 bottom-0 transition-all duration-300 ${
              index === 0 ? 'left-0' : index === steps.length - 1 ? 'right-0' : `left-[${(index / (steps.length - 1)) * 100}%]`
            }`}
            style={{ left: index !== 0 && index !== steps.length - 1 ? `${(index / (steps.length - 1)) * 100}%` : undefined }}
          >
            <div className={`absolute top-1/2 -translate-y-1/2 w-1 h-6 rounded-full ${
              step.id <= currentStep ? 'bg-imperio-navy/30' : 'bg-gray-300/40'
            }`}></div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-4 gap-1 relative">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`
              flex flex-col items-center relative transition-all duration-500
              ${step.id < currentStep ? 'opacity-100' : step.id === currentStep ? 'opacity-100' : 'opacity-60'}
            `}
          >
            {/* Indicador de etapa */}
            <div 
              className={`
                flex items-center justify-center w-12 h-12 rounded-full shadow-lg z-10
                transition-all duration-500 
                ${step.id < currentStep 
                  ? 'bg-gradient-to-br from-imperio-navy via-blue-600 to-imperio-light-navy text-white scale-100 border-2 border-white' 
                  : step.id === currentStep 
                    ? 'bg-gradient-to-br from-blue-600 to-red-500 text-white border-2 border-white scale-110' 
                    : 'bg-white border-2 border-gray-300 text-gray-300 scale-90'}
              `}
            >
              {step.id < currentStep ? (
                <Check size={24} className="stroke-[3]" />
              ) : (
                <span className="font-bold text-lg">{step.id}</span>
              )}
              
              {/* Efeito de brilho dentro do círculo */}
              <div className={`absolute inset-0 rounded-full bg-white/20 z-0 ${
                step.id <= currentStep ? 'opacity-30' : 'opacity-0'
              }`}></div>
              
              {/* Efeito de pulso para etapa atual */}
              {step.id === currentStep && (
                <div className="absolute -inset-1 rounded-full bg-blue-400/30 z-0 animate-pulse"></div>
              )}
            </div>
            
            {/* Nome da etapa */}
            <span 
              className={`
                text-xs md:text-sm mt-2 text-center font-semibold
                transition-all duration-300
                ${step.id === currentStep 
                  ? 'text-imperio-navy font-bold scale-110'
                  : step.id < currentStep
                    ? 'text-imperio-light-navy'
                    : 'text-gray-400'
                }
              `}
            >
              {step.name}
            </span>
            
            {/* Indicador de progresso */}
            {index < steps.length - 1 && (
              <div className="absolute top-6 left-[calc(50%+1.5rem)] right-[calc(50%-1.5rem)] h-0.5 bg-gray-200 z-0">
                <div 
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r from-imperio-navy to-imperio-light-navy transition-all duration-500 ${
                    step.id < currentStep ? 'w-full' : '0'
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
