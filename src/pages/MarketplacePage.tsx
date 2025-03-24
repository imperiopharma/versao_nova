
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const MarketplacePage: React.FC = () => {
  // Mock data for brands - would come from Supabase in a real app
  const brands = [
    // Imported Brands
    { id: 'dragon-pharma', name: 'Dragon Pharma', logo: 'https://via.placeholder.com/200x100?text=Dragon+Pharma', category: 'imported' },
    { id: 'universal-nutrition', name: 'Universal Nutrition', logo: 'https://via.placeholder.com/200x100?text=Universal+Nutrition', category: 'imported' },
    { id: 'dymatize', name: 'Dymatize', logo: 'https://via.placeholder.com/200x100?text=Dymatize', category: 'imported' },
    { id: 'optimum', name: 'Optimum Nutrition', logo: 'https://via.placeholder.com/200x100?text=Optimum', category: 'imported' },
    { id: 'muscletech', name: 'MuscleTech', logo: 'https://via.placeholder.com/200x100?text=MuscleTech', category: 'imported' },
    
    // Premium Brands
    { id: 'king-pharma', name: 'King Pharma', logo: 'https://via.placeholder.com/200x100?text=King+Pharma', category: 'premium' },
    { id: 'cooper-pharma', name: 'Cooper Pharma', logo: 'https://via.placeholder.com/200x100?text=Cooper+Pharma', category: 'premium' },
    { id: 'muscle-labs', name: 'Muscle Labs', logo: 'https://via.placeholder.com/200x100?text=Muscle+Labs', category: 'premium' },
    { id: 'ultra-pharma', name: 'Ultra Pharma', logo: 'https://via.placeholder.com/200x100?text=Ultra+Pharma', category: 'premium' },
    { id: 'prime-labs', name: 'Prime Labs', logo: 'https://via.placeholder.com/200x100?text=Prime+Labs', category: 'premium' },
    
    // National Brands
    { id: 'growth', name: 'Growth', logo: 'https://via.placeholder.com/200x100?text=Growth', category: 'national' },
    { id: 'r-pharm', name: 'R.Pharm', logo: 'https://via.placeholder.com/200x100?text=R.Pharm', category: 'national' },
    { id: 'bio-pharma', name: 'Bio Pharma', logo: 'https://via.placeholder.com/200x100?text=Bio+Pharma', category: 'national' },
    { id: 'life-pharma', name: 'Life Pharma', logo: 'https://via.placeholder.com/200x100?text=Life+Pharma', category: 'national' },
    { id: 'max-power', name: 'Max Power', logo: 'https://via.placeholder.com/200x100?text=Max+Power', category: 'national' },
    
    // Various Brands
    { id: 'vitafor', name: 'Vitafor', logo: 'https://via.placeholder.com/200x100?text=Vitafor', category: 'various' },
    { id: 'integral-medica', name: 'Integral Médica', logo: 'https://via.placeholder.com/200x100?text=Integral+Medica', category: 'various' },
    { id: 'midway', name: 'Midway', logo: 'https://via.placeholder.com/200x100?text=Midway', category: 'various' },
    { id: 'probiotica', name: 'Probiótica', logo: 'https://via.placeholder.com/200x100?text=Probiotica', category: 'various' },
    { id: 'max-titanium', name: 'Max Titanium', logo: 'https://via.placeholder.com/200x100?text=Max+Titanium', category: 'various' },
  ];
  
  const importedBrands = brands.filter(brand => brand.category === 'imported');
  const premiumBrands = brands.filter(brand => brand.category === 'premium');
  const nationalBrands = brands.filter(brand => brand.category === 'national');
  const variousBrands = brands.filter(brand => brand.category === 'various');
  
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
          <h2 className="text-xl font-medium text-imperio-navy mb-6 border-b pb-2">Marcas Importadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {importedBrands.map((brand) => (
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
        
        <div className="mb-12">
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
        
        <div>
          <h2 className="text-xl font-medium text-imperio-navy mb-6 border-b pb-2">Diversos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {variousBrands.map((brand) => (
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
