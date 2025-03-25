
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
      {/* Barra de progresso avançada com gradiente */}
      <div className="mb-2">
        <Progress 
          value={calculateProgress()} 
          className="h-2 bg-gray-200 overflow-hidden rounded-full"
        />
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
                step.id <= currentStep ? 'opacity-20' : 'opacity-0'
              }`}></div>
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
