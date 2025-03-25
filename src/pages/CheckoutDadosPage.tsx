
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { ChevronLeft, ChevronRight, Loader, User, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export const CheckoutDadosPage: React.FC = () => {
  const { customerData, updateCustomerData, setCheckoutStep, validateCPF } = useCheckout();
  const { setShippingMethod } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loadingCep, setLoadingCep] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Check if user is logged in (in real app, this would use Clerk)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login?next=/checkout/dados');
    }
  }, [navigate]);
  
  const fetchAddressFromCep = async (cep: string) => {
    // Strip non-numeric characters
    const numericCep = cep.replace(/\D/g, '');
    
    if (numericCep.length !== 8) {
      return;
    }
    
    setLoadingCep(true);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${numericCep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setFormErrors({ ...formErrors, cep: 'CEP não encontrado' });
        return;
      }
      
      updateCustomerData({
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      });
      
      // Remove CEP error if it exists
      const newErrors = { ...formErrors };
      delete newErrors.cep;
      setFormErrors(newErrors);
      
    } catch (error) {
      console.error('Error fetching address:', error);
      setFormErrors({ ...formErrors, cep: 'Erro ao buscar endereço' });
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
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    const requiredFields = [
      'name', 'cpf', 'whatsapp', 'email', 'cep', 
      'street', 'number', 'neighborhood', 'city', 'state'
    ];
    
    requiredFields.forEach(field => {
      if (!customerData[field as keyof typeof customerData]) {
        errors[field] = 'Este campo é obrigatório';
      }
    });
    
    // Email validation
    if (customerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      errors.email = 'Email inválido';
    }
    
    // CPF validation (validação completa)
    if (customerData.cpf) {
      const cpfClean = customerData.cpf.replace(/\D/g, '');
      if (cpfClean.length !== 11 || !validateCPF(customerData.cpf)) {
        errors.cpf = 'CPF inválido';
      }
    }
    
    // WhatsApp validation
    if (customerData.whatsapp) {
      const whatsappClean = customerData.whatsapp.replace(/\D/g, '');
      if (whatsappClean.length !== 11) {
        errors.whatsapp = 'Número de WhatsApp inválido';
      }
    }
    
    // CEP validation
    if (customerData.cep) {
      const cepClean = customerData.cep.replace(/\D/g, '');
      if (cepClean.length !== 8) {
        errors.cep = 'CEP inválido';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Formulário incompleto',
        description: 'Por favor, preencha todos os campos obrigatórios corretamente.',
        variant: 'destructive',
      });
      return;
    }
    
    // Proceed to next step
    setCheckoutStep(3);
    navigate('/checkout/resumo');
  };
  
  const handleChangeInput = (field: string, value: string) => {
    updateCustomerData({ [field]: value });
    
    // Clear error for this field if it exists
    if (formErrors[field]) {
      const newErrors = { ...formErrors };
      delete newErrors[field];
      setFormErrors(newErrors);
    }
  };
  
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mb-8">
          <CheckoutSteps currentStep={2} />
        </div>
        
        <h1 className="text-3xl font-semibold text-imperio-navy mb-8">Dados do Cliente e Envio</h1>
        
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
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
                <InputMask
                  id="cpf"
                  placeholder="000.000.000-00"
                  mask="999.999.999-99"
                  className={formErrors.cpf ? 'border-imperio-red' : ''}
                  value={customerData.cpf}
                  onValueChange={(value) => handleChangeInput('cpf', value)}
                />
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
                  Email *
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
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
                <Label htmlFor="source" className="mb-1 block">
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
                    <SelectItem value="indicacao">Indicação</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
            <h2 className="text-xl font-medium mb-6">Endereço de Entrega</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="cep" className="mb-1 block">
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
                    className={`pl-10 ${formErrors.cep ? 'border-imperio-red' : ''}`}
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
                {formErrors.cep && (
                  <p className="text-imperio-red text-sm mt-1">{formErrors.cep}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="street" className="mb-1 block">
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
                <Label htmlFor="number" className="mb-1 block">
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
                <Label htmlFor="complement" className="mb-1 block">
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
                <Label htmlFor="neighborhood" className="mb-1 block">
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
                <Label htmlFor="city" className="mb-1 block">
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
                <Label htmlFor="state" className="mb-1 block">
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
          
          <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
            <h2 className="text-xl font-medium mb-6">Frete (Envio)</h2>
            
            <div>
              <Label htmlFor="shipping" className="mb-1 block">
                Método de Envio *
              </Label>
              <Select
                onValueChange={(value) => setShippingMethod(value)}
              >
                <SelectTrigger className={formErrors.shipping ? 'border-imperio-red' : ''}>
                  <SelectValue placeholder="Selecione o método de envio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedex">Sedex</SelectItem>
                  <SelectItem value="pac">PAC</SelectItem>
                  <SelectItem value="transportadora">Transportadora</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.shipping && (
                <p className="text-imperio-red text-sm mt-1">{formErrors.shipping}</p>
              )}
              
              <p className="text-sm text-gray-500 mt-2">
                O valor do frete será calculado com base no seu estado e no método de envio selecionado.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
              variant="outline"
              asChild
              className="sm:order-1"
            >
              <Link to="/carrinho">
                <ChevronLeft size={18} className="mr-2" />
                Voltar ao Carrinho
              </Link>
            </Button>
            
            <Button 
              type="submit"
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:order-2"
            >
              Continuar
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
