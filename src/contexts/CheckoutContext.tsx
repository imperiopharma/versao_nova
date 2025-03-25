
import React, { createContext, useContext, useState } from 'react';

export type CustomerData = {
  name: string;
  cpf: string;
  whatsapp: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  howDidYouFindUs?: string;
};

export type CheckoutContextType = {
  customerData: CustomerData;
  updateCustomerData: (data: Partial<CustomerData>) => void;
  resetCustomerData: () => void;
  paymentProofFile: File | null;
  setPaymentProofFile: (file: File | null) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  validateCPF: (cpf: string) => boolean;
};

const initialCustomerData: CustomerData = {
  name: '',
  cpf: '',
  whatsapp: '',
  email: '',
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  howDidYouFindUs: '',
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customerData, setCustomerData] = useState<CustomerData>(initialCustomerData);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<number>(1); // 1 = cart, 2 = customer data, 3 = summary, 4 = payment

  const updateCustomerData = (data: Partial<CustomerData>) => {
    setCustomerData(prev => ({ ...prev, ...data }));
    
    // Store state in localStorage for shipping calculations
    if (data.state) {
      localStorage.setItem('shipmentState', data.state);
    }
  };

  const resetCustomerData = () => {
    setCustomerData(initialCustomerData);
    setPaymentProofFile(null);
  };
  
  // Função para validar CPF 
  const validateCPF = (cpf: string): boolean => {
    // Remove qualquer caractere que não seja número
    cpf = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = (remainder === 10 || remainder === 11) ? 0 : remainder;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = (remainder === 10 || remainder === 11) ? 0 : remainder;
    
    // Verificar se os dígitos calculados conferem com os dígitos informados
    return (parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2);
  };

  return (
    <CheckoutContext.Provider
      value={{
        customerData,
        updateCustomerData,
        resetCustomerData,
        paymentProofFile,
        setPaymentProofFile,
        checkoutStep,
        setCheckoutStep,
        validateCPF,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
