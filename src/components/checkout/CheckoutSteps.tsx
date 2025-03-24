
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
                  flex items-center justify-center w-8 h-8 rounded-full 
                  ${step.id < currentStep 
                    ? 'bg-imperio-navy text-white' 
                    : step.id === currentStep 
                      ? 'border-2 border-imperio-navy text-imperio-navy' 
                      : 'border-2 border-gray-300 text-gray-300'
                  }
                  transition-all duration-300
                `}
              >
                {step.id < currentStep ? (
                  <Check size={16} />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span 
                className={`
                  text-xs mt-2 text-center 
                  ${step.id === currentStep 
                    ? 'font-medium text-imperio-navy'
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
