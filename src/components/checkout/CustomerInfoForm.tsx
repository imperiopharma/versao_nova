
import React from 'react';
import { User, Phone, Mail, CreditCard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
      <h2 className="text-xl font-medium mb-6">Informações Pessoais</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="name" className="mb-1 block">
            Nome Completo *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <User size={18} />
            </div>
            <Input
              id="name"
              placeholder="Digite seu nome completo"
              className={`pl-10 ${formErrors.name ? 'border-imperio-red' : ''}`}
              value={customerData.name}
              onChange={(e) => handleChangeInput('name', e.target.value)}
            />
          </div>
          {formErrors.name && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.name}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="cpf" className="mb-1 block">
            CPF *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <CreditCard size={18} />
            </div>
            <InputMask
              id="cpf"
              placeholder="000.000.000-00"
              mask="999.999.999-99"
              className={`pl-10 ${formErrors.cpf ? 'border-imperio-red' : ''}`}
              value={customerData.cpf}
              onValueChange={(value) => handleChangeInput('cpf', value)}
            />
          </div>
          {formErrors.cpf && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.cpf}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="whatsapp" className="mb-1 block">
            WhatsApp *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Phone size={18} />
            </div>
            <InputMask
              id="whatsapp"
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              className={`pl-10 ${formErrors.whatsapp ? 'border-imperio-red' : ''}`}
              value={customerData.whatsapp}
              onValueChange={(value) => handleChangeInput('whatsapp', value)}
            />
          </div>
          {formErrors.whatsapp && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.whatsapp}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="email" className="mb-1 block">
            E-mail *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={`pl-10 ${formErrors.email ? 'border-imperio-red' : ''}`}
              value={customerData.email}
              onChange={(e) => handleChangeInput('email', e.target.value)}
            />
          </div>
          {formErrors.email && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.email}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="howDidYouFindUs" className="mb-1 block">
            Como nos conheceu?
          </Label>
          <Select
            value={customerData.howDidYouFindUs}
            onValueChange={(value) => handleChangeInput('howDidYouFindUs', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="friend">Indicação de amigo</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
