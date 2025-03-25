
export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  costPrice: number;
  sellingPrice: number;
  promoPrice: number;
  stock: number;
  status: string;
  image: string;
}

export interface ProductInputData {
  id?: string;
  name: string;
  description?: string;
  sku?: string;
  brand: string;
  category: string;
  price?: number;
  originalPrice?: number;
  costPrice?: number | string;
  sellingPrice?: number | string;
  promoPrice?: number | string;
  stock?: number | string;
  status?: string;
  image?: string;
}
