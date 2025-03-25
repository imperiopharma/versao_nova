
import React, { useState } from 'react';
import { MapPin, Loader } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CustomerData } from '@/contexts/CheckoutContext';

interface AddressFormProps {
  customerData: CustomerData;
  handleChangeInput: (field: string, value: string) => void;
  formErrors: Record<string, string>;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  customerData,
  handleChangeInput,
  formErrors
}) => {
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const fetchAddressFromCep = async (cep: string) => {
    // Remove caracteres não numéricos
    const numericCep = cep.replace(/\D/g, '');
    
    if (numericCep.length !== 8) {
      return;
    }
    
    setLoadingCep(true);
    setCepError(null);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${numericCep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setCepError('CEP não encontrado. Verifique o número informado.');
        return;
      }
      
      handleChangeInput('street', data.logradouro || '');
      handleChangeInput('neighborhood', data.bairro || '');
      handleChangeInput('city', data.localidade || '');
      handleChangeInput('state', data.uf || '');
      
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      setCepError('Erro ao buscar o CEP. Tente novamente.');
    } finally {
      setLoadingCep(false);
    }
  };
  
  const handleCepBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    if (cep && cep.replace(/\D/g, '').length === 8) {
      fetchAddressFromCep(cep);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-imperio-navy border-b pb-3">Endereço de Entrega</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="cep" className="mb-1 block font-medium">
            CEP *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <MapPin size={18} />
            </div>
            <InputMask
              id="cep"
              placeholder="00000-000"
              mask="99999-999"
              className={`pl-10 ${formErrors.cep || cepError ? 'border-imperio-red' : ''}`}
              value={customerData.cep}
              onValueChange={(value) => handleChangeInput('cep', value)}
              onBlur={handleCepBlur}
            />
            {loadingCep && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Loader size={18} className="animate-spin text-imperio-navy" />
              </div>
            )}
          </div>
          {cepError && (
            <Alert variant="destructive" className="mt-2 py-2">
              <AlertDescription>{cepError}</AlertDescription>
            </Alert>
          )}
          {formErrors.cep && !cepError && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.cep}</p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="street" className="mb-1 block font-medium">
            Endereço (Rua) *
          </Label>
          <Input
            id="street"
            placeholder="Digite seu endereço"
            className={formErrors.street ? 'border-imperio-red' : ''}
            value={customerData.street}
            onChange={(e) => handleChangeInput('street', e.target.value)}
          />
          {formErrors.street && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.street}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="number" className="mb-1 block font-medium">
            Número *
          </Label>
          <Input
            id="number"
            placeholder="Número"
            className={formErrors.number ? 'border-imperio-red' : ''}
            value={customerData.number}
            onChange={(e) => handleChangeInput('number', e.target.value)}
          />
          {formErrors.number && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.number}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="complement" className="mb-1 block font-medium">
            Complemento
          </Label>
          <Input
            id="complement"
            placeholder="Apto, Bloco, etc (opcional)"
            value={customerData.complement}
            onChange={(e) => handleChangeInput('complement', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="neighborhood" className="mb-1 block font-medium">
            Bairro *
          </Label>
          <Input
            id="neighborhood"
            placeholder="Bairro"
            className={formErrors.neighborhood ? 'border-imperio-red' : ''}
            value={customerData.neighborhood}
            onChange={(e) => handleChangeInput('neighborhood', e.target.value)}
          />
          {formErrors.neighborhood && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.neighborhood}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="city" className="mb-1 block font-medium">
            Cidade *
          </Label>
          <Input
            id="city"
            placeholder="Cidade"
            className={formErrors.city ? 'border-imperio-red' : ''}
            value={customerData.city}
            onChange={(e) => handleChangeInput('city', e.target.value)}
          />
          {formErrors.city && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.city}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="state" className="mb-1 block font-medium">
            Estado *
          </Label>
          <Select
            value={customerData.state}
            onValueChange={(value) => handleChangeInput('state', value)}
          >
            <SelectTrigger className={formErrors.state ? 'border-imperio-red' : ''}>
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AC">Acre</SelectItem>
              <SelectItem value="AL">Alagoas</SelectItem>
              <SelectItem value="AP">Amapá</SelectItem>
              <SelectItem value="AM">Amazonas</SelectItem>
              <SelectItem value="BA">Bahia</SelectItem>
              <SelectItem value="CE">Ceará</SelectItem>
              <SelectItem value="DF">Distrito Federal</SelectItem>
              <SelectItem value="ES">Espírito Santo</SelectItem>
              <SelectItem value="GO">Goiás</SelectItem>
              <SelectItem value="MA">Maranhão</SelectItem>
              <SelectItem value="MT">Mato Grosso</SelectItem>
              <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
              <SelectItem value="MG">Minas Gerais</SelectItem>
              <SelectItem value="PA">Pará</SelectItem>
              <SelectItem value="PB">Paraíba</SelectItem>
              <SelectItem value="PR">Paraná</SelectItem>
              <SelectItem value="PE">Pernambuco</SelectItem>
              <SelectItem value="PI">Piauí</SelectItem>
              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
              <SelectItem value="RN">Rio Grande do Norte</SelectItem>
              <SelectItem value="RS">Rio Grande do Sul</SelectItem>
              <SelectItem value="RO">Rondônia</SelectItem>
              <SelectItem value="RR">Roraima</SelectItem>
              <SelectItem value="SC">Santa Catarina</SelectItem>
              <SelectItem value="SP">São Paulo</SelectItem>
              <SelectItem value="SE">Sergipe</SelectItem>
              <SelectItem value="TO">Tocantins</SelectItem>
            </SelectContent>
          </Select>
          {formErrors.state && (
            <p className="text-imperio-red text-sm mt-1">{formErrors.state}</p>
          )}
        </div>
      </div>
    </div>
  );
};
