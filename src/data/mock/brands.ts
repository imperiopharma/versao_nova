
import { Brand, BrandCategory } from '@/types/brand';

export const mockBrands: Record<BrandCategory, Brand[]> = {
  imported: [
    { id: 'universal', name: 'Universal', logo: '/lovable-uploads/416a2e5d-6d33-4904-9792-2d94c332c8c0.png' },
    { id: 'lifepronutrition', name: 'Life Pro Nutrition', logo: 'https://via.placeholder.com/150x80?text=Life+Pro+Nutrition' },
    { id: 'vitalabs', name: 'Vita Labs', logo: 'https://via.placeholder.com/150x80?text=Vita+Labs' },
    { id: 'blackskull', name: 'Black Skull', logo: 'https://via.placeholder.com/150x80?text=Black+Skull' }
  ],
  premium: [
    { id: 'alpha', name: 'Alpha Pharma', logo: 'https://via.placeholder.com/150x80?text=Alpha+Pharma' },
    { id: 'canada', name: 'Canadá Pharma', logo: 'https://via.placeholder.com/150x80?text=Canada+Pharma' },
    { id: 'cooper', name: 'Cooper', logo: 'https://via.placeholder.com/150x80?text=Cooper' },
    { id: 'oxygen', name: 'Oxygen', logo: 'https://via.placeholder.com/150x80?text=Oxygen' },
    { id: 'farmacom', name: 'Farmacom', logo: 'https://via.placeholder.com/150x80?text=Farmacom' },
    { id: 'zdhc', name: 'ZDHC', logo: 'https://via.placeholder.com/150x80?text=ZDHC' }
  ],
  national: [
    { id: 'growth', name: 'Growth', logo: 'https://via.placeholder.com/150x80?text=Growth' },
    { id: 'rhodia', name: 'Rhodia', logo: 'https://via.placeholder.com/150x80?text=Rhodia' }
  ],
  various: [
    { id: 'cbd', name: 'CBD Canabidiol', logo: 'https://via.placeholder.com/150x80?text=CBD+Canabidiol' },
    { id: 'produtos', name: 'Produtos Manipulados', logo: 'https://via.placeholder.com/150x80?text=Produtos+Manipulados' },
    { id: 'produtos-farm', name: 'Produtos Farmacêuticos', logo: 'https://via.placeholder.com/150x80?text=Produtos+Farmacêuticos' },
    { id: 'receitas', name: 'Receitas Manipuladas', logo: 'https://via.placeholder.com/150x80?text=Receitas+Manipuladas' },
    { id: 'toxicos', name: 'Produtos Tóxicos', logo: 'https://via.placeholder.com/150x80?text=Produtos+Tóxicos' },
    { id: 'sarmar', name: 'Sarmar', logo: 'https://via.placeholder.com/150x80?text=Sarmar' }
  ]
};
