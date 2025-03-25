
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

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

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-center relative">
        {/* Barra de progresso de fundo */}
        <div className="absolute h-1 bg-gray-200 left-0 right-0 top-1/2 -translate-y-1/2 z-0"></div>
        
        {/* Barra de progresso ativa */}
        <div 
          className="absolute h-1 bg-gradient-to-r from-imperio-navy to-imperio-light-navy left-0 top-1/2 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center z-10">
              <div 
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full shadow-lg
                  transition-all duration-500 
                  ${step.id < currentStep 
                    ? 'bg-gradient-to-r from-imperio-navy to-imperio-light-navy text-white scale-100' 
                    : step.id === currentStep 
                      ? 'border-2 border-imperio-navy text-imperio-navy bg-white scale-110' 
                      : 'border-2 border-gray-300 text-gray-300 bg-white scale-90'
                  }
                `}
              >
                {step.id < currentStep ? (
                  <Check size={22} className="stroke-[3]" />
                ) : (
                  <span className="font-bold">{step.id}</span>
                )}
              </div>
              <span 
                className={`
                  text-xs md:text-sm mt-2 text-center font-medium
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
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
