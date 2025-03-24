
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const MarketplacePage: React.FC = () => {
  // Mock data for brands - would come from Supabase in a real app
  const brands = [
    { id: 'king-pharma', name: 'King Pharma', logo: 'https://via.placeholder.com/200x100?text=King+Pharma', category: 'premium' },
    { id: 'cooper-pharma', name: 'Cooper Pharma', logo: 'https://via.placeholder.com/200x100?text=Cooper+Pharma', category: 'premium' },
    { id: 'muscle-labs', name: 'Muscle Labs', logo: 'https://via.placeholder.com/200x100?text=Muscle+Labs', category: 'premium' },
    { id: 'growth', name: 'Growth', logo: 'https://via.placeholder.com/200x100?text=Growth', category: 'nacional' },
    { id: 'r-pharm', name: 'R.Pharm', logo: 'https://via.placeholder.com/200x100?text=R.Pharm', category: 'nacional' },
    { id: 'bio-pharma', name: 'Bio Pharma', logo: 'https://via.placeholder.com/200x100?text=Bio+Pharma', category: 'nacional' },
    { id: 'life-pharma', name: 'Life Pharma', logo: 'https://via.placeholder.com/200x100?text=Life+Pharma', category: 'nacional' },
    { id: 'ultra-pharma', name: 'Ultra Pharma', logo: 'https://via.placeholder.com/200x100?text=Ultra+Pharma', category: 'premium' },
    { id: 'max-power', name: 'Max Power', logo: 'https://via.placeholder.com/200x100?text=Max+Power', category: 'nacional' },
    { id: 'prime-labs', name: 'Prime Labs', logo: 'https://via.placeholder.com/200x100?text=Prime+Labs', category: 'premium' },
  ];
  
  const premiumBrands = brands.filter(brand => brand.category === 'premium');
  const nationalBrands = brands.filter(brand => brand.category === 'nacional');
  
  return (
    <Layout>
      <div className="section-container py-12">
        <h1 className="text-3xl font-semibold text-imperio-navy mb-6">Marcas</h1>
        
        <div className="relative mb-10 max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={20} />
          </div>
          <Input
            type="search"
            placeholder="Pesquisar marcas..."
            className="pl-10"
          />
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-medium text-imperio-navy mb-6 border-b pb-2">Marcas Premium</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {premiumBrands.map((brand) => (
              <Link 
                key={brand.id} 
                to={`/marca/${brand.id}`}
                className="imperio-card flex items-center justify-center h-36 hover-lift group animate-fade-in"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-20 transition-transform group-hover:scale-105" 
                />
              </Link>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-medium text-imperio-navy mb-6 border-b pb-2">Marcas Nacionais</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {nationalBrands.map((brand) => (
              <Link 
                key={brand.id} 
                to={`/marca/${brand.id}`}
                className="imperio-card flex items-center justify-center h-36 hover-lift group animate-fade-in"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-20 transition-transform group-hover:scale-105" 
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
