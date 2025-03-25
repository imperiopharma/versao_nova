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
