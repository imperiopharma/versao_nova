
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  sku?: string;
  description?: string;
  status?: string;
  stock?: number;
  originalPrice?: number;
  costPrice?: number;
  sellingPrice?: number;
  promoPrice?: number;
  isCombo?: boolean;
  discountPercentage?: number;
}

export interface ProductInputData extends Product {
  // Campos adicionais específicos para entrada de dados
  costPrice?: number;
  sellingPrice?: number;
  promoPrice?: number;
  isCombo?: boolean;
  discountPercentage?: number;
}

export interface FlashSaleItem {
  id: string;
  name: string;
  brand: string;
  originalPrice?: number;
  price?: number;
  sellingPrice?: number;
  costPrice?: number;
  image: string;
  discountPercentage?: number;
  category?: string; // Adicionado para compatibilidade
  isCombo?: boolean;
}
