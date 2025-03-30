
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

/**
 * Valida um CPF
 */
export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const strCPF = cpf.replace(/\D/g, '');
  
  if (strCPF.length !== 11) return false;
  
  // Verifica CPFs com todos os dígitos iguais (inválidos)
  if (/^(\d)\1{10}$/.test(strCPF)) return false;
  
  // Validação do algoritmo do CPF
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(strCPF.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(strCPF.substring(10, 11))) return false;
  
  return true;
};

/**
 * Função para formatar data para Supabase
 */
export const formatDateForSupabase = (): string => {
  return new Date().toISOString();
};

/**
 * Configurações de status para pedidos
 */
export const getStatusConfig = (status: string): { color: string; label: string } => {
  const statusConfigs: Record<string, { color: string; label: string }> = {
    'pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Aguardando Pagamento' },
    'paid': { color: 'bg-blue-100 text-blue-800', label: 'Pagamento Aprovado' },
    'preparing': { color: 'bg-purple-100 text-purple-800', label: 'Em Preparação' },
    'shipped': { color: 'bg-indigo-100 text-indigo-800', label: 'Enviado' },
    'delivered': { color: 'bg-green-100 text-green-800', label: 'Entregue' },
    'canceled': { color: 'bg-red-100 text-red-800', label: 'Cancelado' }
  };
  
  return statusConfigs[status] || { color: 'bg-gray-100 text-gray-800', label: 'Status Desconhecido' };
};
