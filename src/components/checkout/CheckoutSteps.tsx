
import React from 'react';
import { Check } from 'lucide-react';

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
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full shadow-sm
                  ${step.id < currentStep 
                    ? 'bg-imperio-navy text-white' 
                    : step.id === currentStep 
                      ? 'border-2 border-imperio-navy text-imperio-navy bg-white' 
                      : 'border-2 border-gray-300 text-gray-300 bg-white'
                  }
                  transition-all duration-300
                `}
              >
                {step.id < currentStep ? (
                  <Check size={20} className="stroke-[3]" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <span 
                className={`
                  text-xs mt-2 text-center font-medium
                  ${step.id === currentStep 
                    ? 'text-imperio-navy'
                    : step.id < currentStep
                      ? 'text-imperio-light-navy'
                      : 'text-gray-500'
                  }
                `}
              >
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`
                  h-[2px] flex-1 mx-2 
                  ${index < currentStep - 1 
                    ? 'bg-imperio-navy' 
                    : 'bg-gray-300'
                  }
                  transition-all duration-300
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
