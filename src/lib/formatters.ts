
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

// Configurações de status para pedidos
export const getStatusConfig = (status: string) => {
  const statusMap: Record<string, { color: string; label: string; bgColor: string }> = {
    'pending': { 
      color: 'text-amber-700', 
      bgColor: 'bg-amber-100', 
      label: 'Pendente' 
    },
    'paid': { 
      color: 'text-blue-700', 
      bgColor: 'bg-blue-100', 
      label: 'Pago' 
    },
    'preparing': { 
      color: 'text-indigo-700', 
      bgColor: 'bg-indigo-100', 
      label: 'Preparando' 
    },
    'shipped': { 
      color: 'text-purple-700', 
      bgColor: 'bg-purple-100', 
      label: 'Enviado' 
    },
    'delivered': { 
      color: 'text-green-700', 
      bgColor: 'bg-green-100', 
      label: 'Entregue' 
    },
    'canceled': { 
      color: 'text-red-700', 
      bgColor: 'bg-red-100', 
      label: 'Cancelado' 
    },
    'default': { 
      color: 'text-gray-700', 
      bgColor: 'bg-gray-100', 
      label: 'Desconhecido' 
    }
  };

  return statusMap[status] || statusMap.default;
};
