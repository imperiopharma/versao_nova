
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useToast } from '@/hooks/use-toast';

export const useCheckoutForm = () => {
  const { customerData, updateCustomerData, setCheckoutStep, validateCPF } = useCheckout();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Check if user is logged in (in real app, this would use Clerk)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login?next=/checkout/dados');
    }
  }, [navigate]);
  
  const handleChangeInput = (field: string, value: string) => {
    updateCustomerData({ [field]: value });
    
    // Clear error for this field if it exists
    if (formErrors[field]) {
      const newErrors = { ...formErrors };
      delete newErrors[field];
      setFormErrors(newErrors);
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
      
      // Encontrar o primeiro campo com erro e rolar até ele
      const firstErrorField = document.querySelector('[class*="border-imperio-red"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    // Proceed to next step
    setCheckoutStep(3);
    
    // Navegar para a próxima página e garantir que a rolagem seja para o topo
    navigate('/checkout/resumo');
  };
  
  return {
    formErrors,
    handleChangeInput,
    handleSubmit
  };
};
