
// Função para formatar data para Supabase
export const formatDateForSupabase = () => {
  return new Date().toISOString();
};

// Função para formatar moeda
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Função para formatar data em formato legível
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

// Configuração de status para ordens
export const getStatusConfig = (status: string) => {
  const statusConfig: Record<string, { color: string; label: string }> = {
    pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Aguardando Pagamento' },
    paid: { color: 'bg-blue-100 text-blue-800', label: 'Pagamento Aprovado' },
    preparing: { color: 'bg-purple-100 text-purple-800', label: 'Em Preparação' },
    shipped: { color: 'bg-indigo-100 text-indigo-800', label: 'Enviado' },
    delivered: { color: 'bg-green-100 text-green-800', label: 'Entregue' },
    canceled: { color: 'bg-red-100 text-red-800', label: 'Cancelado' }
  };

  return statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: 'Desconhecido' };
};

// Funções para máscaras brasileiras
export const formatCPF = (value: string) => {
  // Remove tudo que não é número
  const cpf = value.replace(/\D/g, '');
  
  // Aplica a máscara 000.000.000-00
  return cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const formatPhone = (value: string) => {
  // Remove tudo que não é número
  const phone = value.replace(/\D/g, '');
  
  // Aplica a máscara (00) 00000-0000
  return phone
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const formatCEP = (value: string) => {
  // Remove tudo que não é número
  const cep = value.replace(/\D/g, '');
  
  // Aplica a máscara 00000-000
  return cep
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

// Função para validar CPF
export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit1 = (remainder === 10 || remainder === 11) ? 0 : remainder;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let digit2 = (remainder === 10 || remainder === 11) ? 0 : remainder;
  
  // Verificar se os dígitos calculados conferem com os dígitos informados
  return (parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2);
};
