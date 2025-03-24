
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
