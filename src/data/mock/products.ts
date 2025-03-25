
import { Product, FlashSaleItem } from '@/types/product';

export const mockFeaturedProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Suplemento Emagrecedor',
    brand: 'HealthMax',
    price: 89.90,
    image: 'https://via.placeholder.com/300x300?text=Produto+1',
    category: 'emagrecedores',
    discount: 15
  },
  {
    id: 'prod2',
    name: 'Vitamina C 1000mg',
    brand: 'VitaForce',
    price: 49.90,
    image: 'https://via.placeholder.com/300x300?text=Produto+2',
    category: 'vitaminas',
    discount: 10
  },
  {
    id: 'prod3',
    name: 'Proteína Isolada',
    brand: 'PowerNutrition',
    price: 129.90,
    image: 'https://via.placeholder.com/300x300?text=Produto+3',
    category: 'suplementos',
    discount: 20
  },
  {
    id: 'prod4',
    name: 'Colágeno Hidrolisado',
    brand: 'BeautyHealth',
    price: 79.90,
    image: 'https://via.placeholder.com/300x300?text=Produto+4',
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
    image: 'https://via.placeholder.com/300x300?text=Kit+1'
  },
  {
    id: 'combo2',
    name: 'Kit Imunidade - Vitaminas Essenciais',
    brand: 'Império Pharma',
    price: 149.90,
    originalPrice: 199.90,
    image: 'https://via.placeholder.com/300x300?text=Kit+2'
  }
];
