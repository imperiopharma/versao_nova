
import React from 'react';
import { User, Phone, Mail, CreditCard, Shield, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { CustomerData } from '@/contexts/CheckoutContext';

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
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-gradient-to-r from-imperio-navy to-imperio-light-navy p-3 rounded-xl shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <User size={22} className="text-white relative z-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent">
            Informações Pessoais
          </h2>
          <p className="text-xs text-imperio-navy/60 mt-1">Preencha seus dados para finalizar seu pedido</p>
        </div>
      </div>
      
      {/* Badge de segurança com efeito de brilho */}
      <div className="absolute top-6 right-6 bg-gradient-to-r from-imperio-extra-light-navy/80 to-imperio-extra-light-navy/30 backdrop-blur-sm rounded-full px-3 py-1 inline-flex items-center gap-1 border border-white/30 shadow-md relative overflow-hidden group z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] animate-[shimmer_2s_infinite] pointer-events-none"></div>
        <Shield size={14} className="text-imperio-navy" />
        <span className="text-xs text-imperio-navy font-medium">Dados protegidos</span>
        
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="md:col-span-2">
          <Label htmlFor="name" className="mb-2 block font-medium text-imperio-navy/80 flex items-center">
            <User size={16} className="mr-2 text-imperio-navy/60" />
            Nome Completo *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-imperio-navy/40">
              <User size={18} />
            </div>
            <Input
              id="name"
              placeholder="Digite seu nome completo"
              className={`pl-10 border-imperio-navy/20 bg-white shadow-md rounded-xl transition-all hover:border-imperio-navy/40 focus:ring-imperio-navy/30 relative overflow-hidden ${formErrors.name ? 'border-imperio-red' : ''}`}
              value={customerData.name}
              onChange={(e) => handleChangeInput('name', e.target.value)}
            />
            <span className="absolute inset-0 bg-gradient-to-r from-imperio-extra-light-navy to-transparent opacity-10 rounded-xl pointer-events-none"></span>
          </div>
          {formErrors.name && (
            <p className="text-imperio-red text-sm mt-1 flex items-center">
              <Sparkles size={14} className="mr-1 text-imperio-red" />
              {formErrors.name}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="cpf" className="mb-2 block font-medium text-imperio-navy/80 flex items-center">
            <CreditCard size={16} className="mr-2 text-imperio-navy/60" />
            CPF *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-imperio-navy/40">
              <CreditCard size={18} />
            </div>
            <InputMask
              id="cpf"
              placeholder="000.000.000-00"
              mask="999.999.999-99"
              className={`pl-10 border-imperio-navy/20 bg-white shadow-md rounded-xl transition-all hover:border-imperio-navy/40 focus:ring-imperio-navy/30 relative overflow-hidden ${formErrors.cpf ? 'border-imperio-red' : ''}`}
              value={customerData.cpf}
              onValueChange={(value) => handleChangeInput('cpf', value)}
            />
            <span className="absolute inset-0 bg-gradient-to-r from-imperio-extra-light-navy to-transparent opacity-10 rounded-xl pointer-events-none"></span>
          </div>
          {formErrors.cpf && (
            <p className="text-imperio-red text-sm mt-1 flex items-center">
              <Sparkles size={14} className="mr-1 text-imperio-red" />
              {formErrors.cpf}
            </p>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute -z-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl -right-10 -bottom-10"></div>
          <Label htmlFor="whatsapp" className="mb-2 block font-medium text-imperio-navy/80 flex items-center">
            <Phone size={16} className="mr-2 text-imperio-navy/60" />
            WhatsApp *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-imperio-navy/40">
              <Phone size={18} />
            </div>
            <InputMask
              id="whatsapp"
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              className={`pl-10 border-imperio-navy/20 bg-white shadow-md rounded-xl transition-all hover:border-imperio-navy/40 focus:ring-imperio-navy/30 relative overflow-hidden ${formErrors.whatsapp ? 'border-imperio-red' : ''}`}
              value={customerData.whatsapp}
              onValueChange={(value) => handleChangeInput('whatsapp', value)}
            />
            <span className="absolute inset-0 bg-gradient-to-r from-imperio-extra-light-navy to-transparent opacity-10 rounded-xl pointer-events-none"></span>
          </div>
          {formErrors.whatsapp && (
            <p className="text-imperio-red text-sm mt-1 flex items-center">
              <Sparkles size={14} className="mr-1 text-imperio-red" />
              {formErrors.whatsapp}
            </p>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute -z-10 w-32 h-32 bg-red-500/5 rounded-full blur-xl -left-10 -bottom-10"></div>
          <Label htmlFor="email" className="mb-2 block font-medium text-imperio-navy/80 flex items-center">
            <Mail size={16} className="mr-2 text-imperio-navy/60" />
            E-mail *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-imperio-navy/40">
              <Mail size={18} />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={`pl-10 border-imperio-navy/20 bg-white shadow-md rounded-xl transition-all hover:border-imperio-navy/40 focus:ring-imperio-navy/30 relative overflow-hidden ${formErrors.email ? 'border-imperio-red' : ''}`}
              value={customerData.email}
              onChange={(e) => handleChangeInput('email', e.target.value)}
            />
            <span className="absolute inset-0 bg-gradient-to-r from-imperio-extra-light-navy to-transparent opacity-10 rounded-xl pointer-events-none"></span>
          </div>
          {formErrors.email && (
            <p className="text-imperio-red text-sm mt-1 flex items-center">
              <Sparkles size={14} className="mr-1 text-imperio-red" />
              {formErrors.email}
            </p>
          )}
        </div>
      </div>
      
      {/* Efeito de brilho ao passar o mouse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
      
      {/* Elemento decorativo - linha horizontal com gradiente nos pés */}
      <div className="w-full h-0.5 bg-gradient-to-r from-imperio-navy via-white to-imperio-light-navy opacity-20 absolute bottom-0 left-0"></div>
    </div>
  );
};
