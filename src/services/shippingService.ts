
// Objeto com os valores de frete para cada método e estado
export const shippingData = {
  SEDEX: {
    SP: 45.0, DF: 65.0, RJ: 75.0, MG: 75.0, GO: 75.0, PR: 65.0, SC: 75.0,
    ES: 75.0, RS: 130.0, MS: 90.0, MT: 95.0, BA: 95.0, CE: 110.0, SE: 130.0,
    PE: 120.0, AL: 130.0, PB: 130.0, RN: 130.0, PI: 130.0, MA: 130.0, PA: 110.0,
    AP: 130.0, AM: 130.0, TO: 110.0
  },
  PAC: {
    SP: 35.0, DF: 50.0, RJ: 50.0, ES: 50.0, MG: 50.0, GO: 50.0, PR: 50.0,
    SC: 50.0, RS: 50.0, MS: 50.0, MT: 60.0, BA: 60.0, CE: 75.0, SE: 105.0,
    AL: 115.0, PB: 105.0, RN: 105.0, PI: 105.0, AP: 105.0, TO: 95.0, PE: 95.0,
    MA: 105.0, AM: 105.0, PA: 95.0, RO: 105.0
  },
  TRANSPORTADORA: {
    SP: 53.0, RJ: 75.0, ES: 75.0, MG: 75.0, DF: 75.0, SC: 75.0, PR: 75.0,
    RS: 105.0, SE: 90.0, AL: 90.0, BA: 85.0, PB: 105.0, CE: 85.0, PI: 115.0,
    PA: 115.0, GO: 80.0, TO: 115.0, MS: 85.0, RN: 105.0, MA: 95.0, MT: 80.0,
    PE: 90.0, AM: 110.0, AP: 125.0, AC: 150.0
  }
};

// Tipo para método de envio
export type ShippingMethod = 'SEDEX' | 'PAC' | 'TRANSPORTADORA';

// Função para calcular o frete com base no método e estado
export const calculateShipping = (
  method: ShippingMethod,
  state: string
): number | null => {
  if (!method || !state) return null;
  
  const methodData = shippingData[method];
  if (!methodData) return null;
  
  return methodData[state] || null;
};

// Função para obter todos os métodos disponíveis para um estado
export const getAvailableMethodsForState = (
  state: string
): { method: ShippingMethod; cost: number }[] => {
  if (!state) return [];
  
  const availableMethods: { method: ShippingMethod; cost: number }[] = [];
  
  Object.keys(shippingData).forEach((method) => {
    const cost = shippingData[method as ShippingMethod][state];
    if (cost !== undefined) {
      availableMethods.push({
        method: method as ShippingMethod,
        cost
      });
    }
  });
  
  return availableMethods;
};

// Função para formatar valores em formato BRL
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Tempo estimado de entrega por método
export const getDeliveryEstimate = (method: ShippingMethod): string => {
  switch (method) {
    case 'SEDEX':
      return '1-2 dias úteis';
    case 'PAC':
      return '3-7 dias úteis';
    case 'TRANSPORTADORA':
      return '3-5 dias úteis';
    default:
      return '';
  }
};

// Converter método de envio para formato legível
export const getMethodDisplayName = (method: ShippingMethod): string => {
  switch (method) {
    case 'SEDEX':
      return 'Sedex';
    case 'PAC':
      return 'PAC';
    case 'TRANSPORTADORA':
      return 'Transportadora';
    default:
      return method;
  }
};

// Função para mapear os métodos de frete da loja para a API
export const mapStoreMethodToApiMethod = (storeMethod: string): ShippingMethod | null => {
  switch (storeMethod.toLowerCase()) {
    case 'sedex':
      return 'SEDEX';
    case 'pac':
      return 'PAC';
    case 'transportadora':
      return 'TRANSPORTADORA';
    default:
      return null;
  }
};

// Função para mapear os métodos da API para os métodos da loja 
export const mapApiMethodToStoreMethod = (apiMethod: ShippingMethod): string => {
  switch (apiMethod) {
    case 'SEDEX':
      return 'sedex';
    case 'PAC':
      return 'pac';
    case 'TRANSPORTADORA':
      return 'transportadora';
    default:
      return '';
  }
};
