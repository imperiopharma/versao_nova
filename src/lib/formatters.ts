
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
