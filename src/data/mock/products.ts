
import { Product, FlashSaleItem } from '@/types/product';

export const mockFeaturedProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Suplemento Emagrecedor',
    brand: 'HealthMax',
    price: 89.90,
    image: 'https://via.placeholder.com/300x300/e53e3e/ffffff?text=Emagrecedor',
    category: 'emagrecedores',
    discount: 15
  },
  {
    id: 'prod2',
    name: 'Vitamina C 1000mg',
    brand: 'VitaForce',
    price: 49.90,
    image: 'https://via.placeholder.com/300x300/ed8936/ffffff?text=Vitamina+C',
    category: 'vitaminas',
    discount: 10
  },
  {
    id: 'prod3',
    name: 'Proteína Isolada',
    brand: 'PowerNutrition',
    price: 129.90,
    image: 'https://via.placeholder.com/300x300/38a169/ffffff?text=Proteína',
    category: 'suplementos',
    discount: 20
  },
  {
    id: 'prod4',
    name: 'Colágeno Hidrolisado',
    brand: 'BeautyHealth',
    price: 79.90,
    image: 'https://via.placeholder.com/300x300/9f7aea/ffffff?text=Colágeno',
    category: 'beleza',
    discount: 5
  }
];

export const mockFlashSaleItems: FlashSaleItem[] = [
  {
    id: 'combo1',
    name: 'Kit Emagrecedor - 3 produtos',
    brand: 'Império Pharma',
    price: 199.90,
    originalPrice: 299.90,
    image: 'https://via.placeholder.com/300x300/e53e3e/ffffff?text=Kit+Emagrecedor'
  },
  {
    id: 'combo2',
    name: 'Kit Imunidade - Vitaminas Essenciais',
    brand: 'Império Pharma',
    price: 149.90,
    originalPrice: 199.90,
    image: 'https://via.placeholder.com/300x300/38a169/ffffff?text=Kit+Imunidade'
  }
];
