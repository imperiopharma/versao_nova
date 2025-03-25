
import React from 'react';
import { User, Phone, Mail, CreditCard } from 'lucide-react';
import { CustomerData } from '@/contexts/CheckoutContext';
import { FormInput } from './FormInput';
import { FormInputMask } from './FormInputMask';
import { SectionHeader } from './SectionHeader';
import { SecurityBadge } from './SecurityBadge';

interface CustomerInfoFormProps {
  customerData: CustomerData;
  handleChangeInput: (field: string, value: string) => void;
  formErrors: Record<string, string>;
}

export const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  customerData,
  handleChangeInput,
  formErrors,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-imperio-navy/5 p-6 mb-8 transition-all duration-300 hover:shadow-xl overflow-hidden relative group">
      {/* Elementos decorativos - linha diagonal nas cores do Paraguai */}
      <div className="absolute -right-32 -top-32 w-64 h-64 bg-gradient-to-b from-red-500 via-white to-blue-500 rotate-45 opacity-10 rounded-full blur-md transform transition-transform duration-500 group-hover:rotate-90"></div>
      
      {/* Efeito de partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
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
      
      <SectionHeader 
        icon={<User />}
        title="Informações Pessoais"
        description="Preencha seus dados para finalizar seu pedido"
      />
      
      <SecurityBadge />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="md:col-span-2">
          <FormInput
            id="name"
            label="Nome Completo *"
            icon={<User size={16} className="mr-2 text-imperio-navy/60" />}
            placeholder="Digite seu nome completo"
            value={customerData.name}
            onChange={(e) => handleChangeInput('name', e.target.value)}
            error={formErrors.name}
          />
        </div>
        
        <div>
          <FormInputMask
            id="cpf"
            label="CPF *"
            icon={<CreditCard size={16} className="mr-2 text-imperio-navy/60" />}
            placeholder="000.000.000-00"
            mask="999.999.999-99"
            value={customerData.cpf}
            onValueChange={(value) => handleChangeInput('cpf', value)}
            error={formErrors.cpf}
          />
        </div>
        
        <div className="relative">
          <div className="absolute -z-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl -right-10 -bottom-10"></div>
          <FormInputMask
            id="whatsapp"
            label="WhatsApp *"
            icon={<Phone size={16} className="mr-2 text-imperio-navy/60" />}
            placeholder="(00) 00000-0000"
            mask="(99) 99999-9999"
            value={customerData.whatsapp}
            onValueChange={(value) => handleChangeInput('whatsapp', value)}
            error={formErrors.whatsapp}
          />
        </div>
        
        <div className="relative">
          <div className="absolute -z-10 w-32 h-32 bg-red-500/5 rounded-full blur-xl -left-10 -bottom-10"></div>
          <FormInput
            id="email"
            label="E-mail *"
            icon={<Mail size={16} className="mr-2 text-imperio-navy/60" />}
            placeholder="seu@email.com"
            value={customerData.email}
            onChange={(e) => handleChangeInput('email', e.target.value)}
            error={formErrors.email}
            type="email"
          />
        </div>
      </div>
      
      {/* Efeito de brilho ao passar o mouse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
      
      {/* Elemento decorativo - linha horizontal com gradiente nos pés */}
      <div className="w-full h-0.5 bg-gradient-to-r from-imperio-navy via-white to-imperio-light-navy opacity-20 absolute bottom-0 left-0"></div>
    </div>
  );
};
