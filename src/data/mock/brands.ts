
import { Brand, BrandCategory } from '@/types/brand';

export const mockBrands: Record<BrandCategory, Brand[]> = {
  imported: [
    { id: 'universal', name: 'Universal', logo: '/lovable-uploads/416a2e5d-6d33-4904-9792-2d94c332c8c0.png' },
    { id: 'lifepronutrition', name: 'Life Pro Nutrition', logo: 'https://via.placeholder.com/150x80/001f3f/ffffff?text=Life+Pro' },
    { id: 'vitalabs', name: 'Vita Labs', logo: 'https://via.placeholder.com/150x80/e53e3e/ffffff?text=Vita+Labs' },
    { id: 'blackskull', name: 'Black Skull', logo: 'https://via.placeholder.com/150x80/000000/ffffff?text=Black+Skull' }
  ],
  premium: [
    { id: 'alpha', name: 'Alpha Pharma', logo: 'https://via.placeholder.com/150x80/9f7aea/ffffff?text=Alpha' },
    { id: 'canada', name: 'Canadá Pharma', logo: 'https://via.placeholder.com/150x80/ed8936/ffffff?text=Canada' },
    { id: 'cooper', name: 'Cooper', logo: 'https://via.placeholder.com/150x80/38a169/ffffff?text=Cooper' },
    { id: 'oxygen', name: 'Oxygen', logo: 'https://via.placeholder.com/150x80/3182ce/ffffff?text=Oxygen' },
    { id: 'farmacom', name: 'Farmacom', logo: 'https://via.placeholder.com/150x80/f56565/ffffff?text=Farmacom' },
    { id: 'zdhc', name: 'ZDHC', logo: 'https://via.placeholder.com/150x80/667eea/ffffff?text=ZDHC' }
  ],
  national: [
    { id: 'growth', name: 'Growth', logo: 'https://via.placeholder.com/150x80/f6ad55/ffffff?text=Growth' },
    { id: 'rhodia', name: 'Rhodia', logo: 'https://via.placeholder.com/150x80/f687b3/ffffff?text=Rhodia' }
  ],
  various: [
    { id: 'cbd', name: 'CBD Canabidiol', logo: 'https://via.placeholder.com/150x80/68d391/ffffff?text=CBD' },
    { id: 'produtos', name: 'Produtos Manipulados', logo: 'https://via.placeholder.com/150x80/bee3f8/ffffff?text=Manipulados' },
    { id: 'produtos-farm', name: 'Produtos Farmacêuticos', logo: 'https://via.placeholder.com/150x80/9ae6b4/ffffff?text=Farmacêuticos' },
    { id: 'receitas', name: 'Receitas Manipuladas', logo: 'https://via.placeholder.com/150x80/fbd38d/ffffff?text=Receitas' },
    { id: 'toxicos', name: 'Produtos Tóxicos', logo: 'https://via.placeholder.com/150x80/fc8181/ffffff?text=Tóxicos' },
    { id: 'sarmar', name: 'Sarmar', logo: 'https://via.placeholder.com/150x80/b794f4/ffffff?text=Sarmar' }
  ]
};
