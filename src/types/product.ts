
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
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
}
