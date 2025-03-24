
import { OrderStatus, StatusConfig } from '@/types/orders';

// Format currency to Brazilian Real (BRL)
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Format date to Brazilian format
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Get status configuration based on status code
export const getStatusConfig = (status: OrderStatus): StatusConfig => {
  switch (status) {
    case 'pending':
      return { color: 'bg-yellow-100 text-yellow-800', text: 'Aguardando Pagamento' };
    case 'paid':
      return { color: 'bg-blue-100 text-blue-800', text: 'Pagamento Aprovado' };
    case 'preparing':
      return { color: 'bg-purple-100 text-purple-800', text: 'Em Preparação' };
    case 'shipped':
      return { color: 'bg-indigo-100 text-indigo-800', text: 'Enviado' };
    case 'delivered':
      return { color: 'bg-green-100 text-green-800', text: 'Entregue' };
    case 'canceled':
      return { color: 'bg-red-100 text-red-800', text: 'Cancelado' };
    default:
      return { color: 'bg-gray-100 text-gray-800', text: 'Desconhecido' };
  }
};
