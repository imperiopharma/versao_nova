
/**
 * Formata um valor numérico como moeda brasileira (BRL)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Formata uma data no formato brasileiro (dia/mês/ano)
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj);
};

/**
 * Formata um número de telefone no formato brasileiro
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  
  // Remove caracteres não numéricos
  const numbers = phone.replace(/\D/g, '');
  
  // Formata de acordo com o comprimento
  if (numbers.length === 11) {
    // Celular com DDD
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (numbers.length === 10) {
    // Telefone fixo com DDD
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  // Retorna formatado como está
  return numbers;
};

/**
 * Formata um CPF no formato brasileiro
 */
export const formatCPF = (cpf: string): string => {
  if (!cpf) return '';
  
  // Remove caracteres não numéricos
  const numbers = cpf.replace(/\D/g, '');
  
  // Formata CPF: 123.456.789-01
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata um CEP no formato brasileiro
 */
export const formatCEP = (cep: string): string => {
  if (!cep) return '';
  
  // Remove caracteres não numéricos
  const numbers = cep.replace(/\D/g, '');
  
  // Formata CEP: 12345-678
  return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
};
