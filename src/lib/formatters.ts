
// Formatador de moeda
export const formatCurrency = (value: number): string => {
  if (value === undefined || value === null) {
    return 'R$ 0,00';
  }
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

// Formatador de data
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Formatador de data e hora
export const formatDateTime = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Formatador de CPF
export const formatCPF = (cpf: string): string => {
  if (!cpf) return '';
  
  // Remove caracteres não numéricos
  const numericCPF = cpf.replace(/\D/g, '');
  
  // Formata como CPF: 000.000.000-00
  return numericCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Formatador de CEP
export const formatCEP = (cep: string): string => {
  if (!cep) return '';
  
  // Remove caracteres não numéricos
  const numericCEP = cep.replace(/\D/g, '');
  
  // Formata como CEP: 00000-000
  return numericCEP.replace(/(\d{5})(\d{3})/, '$1-$2');
};

// Formatador de telefone
export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  
  // Remove caracteres não numéricos
  const numericPhone = phone.replace(/\D/g, '');
  
  // Formata como telefone: (00) 00000-0000
  return numericPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};
