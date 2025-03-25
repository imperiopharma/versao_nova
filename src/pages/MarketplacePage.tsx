
import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProductStore } from '@/hooks/useProductStore';

export const MarketplacePage: React.FC = () => {
  const { brands } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtrar marcas de acordo com a pesquisa
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const importedBrands = filteredBrands.filter(brand => brand.category === 'imported');
  const premiumBrands = filteredBrands.filter(brand => brand.category === 'premium');
  const nationalBrands = filteredBrands.filter(brand => brand.category === 'national');
  const variousBrands = filteredBrands.filter(brand => brand.category === 'various');
  
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {importedBrands.length > 0 && (
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
                    src={brand.logoUrl} 
                    alt={brand.name} 
                    className="max-h-20 transition-transform group-hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {premiumBrands.length > 0 && (
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
                    src={brand.logoUrl} 
                    alt={brand.name} 
                    className="max-h-20 transition-transform group-hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {nationalBrands.length > 0 && (
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
                    src={brand.logoUrl} 
                    alt={brand.name} 
                    className="max-h-20 transition-transform group-hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {variousBrands.length > 0 && (
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
                    src={brand.logoUrl} 
                    alt={brand.name} 
                    className="max-h-20 transition-transform group-hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        {filteredBrands.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhuma marca encontrada com o termo "{searchQuery}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
