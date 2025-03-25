
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BrandCategories } from '@/types/brand';
import { mockBrands } from '@/data/mock/brands';
import { Pill, Heart } from 'lucide-react';

export const useBrands = () => {
  const [brands, setBrands] = useState<BrandCategories>({
    imported: [],
    premium: [],
    national: [],
    various: [],
    categories: [
      { id: 'emagrecedores', name: 'Emagrecedores', icon: () => <Pill className="w-8 h-8 mb-2 text-white" /> },
      { id: 'farmacia', name: 'Produtos de Farmácia', icon: () => <Heart className="w-8 h-8 mb-2 text-white" /> },
    ],
  });
  
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data: brandsData, error: brandsError } = await supabase
          .from('brands')
          .select('*')
          .eq('status', 'active');
        
        if (brandsError) throw brandsError;
        
        // Processamento dos dados
        const importedBrands = brandsData
          .filter(brand => brand.category === 'imported')
          .map(brand => ({
            id: brand.id,
            name: brand.name,
            logo: brand.logo_url || `https://via.placeholder.com/150x100?text=${brand.name}`
          }));
        
        const premiumBrands = brandsData
          .filter(brand => brand.category === 'premium')
          .map(brand => ({
            id: brand.id,
            name: brand.name,
            logo: brand.logo_url || `https://via.placeholder.com/150x100?text=${brand.name}`
          }));
        
        const nationalBrands = brandsData
          .filter(brand => brand.category === 'national')
          .map(brand => ({
            id: brand.id,
            name: brand.name,
            logo: brand.logo_url || `https://via.placeholder.com/150x100?text=${brand.name}`
          }));
        
        const variousBrands = brandsData
          .filter(brand => brand.category === 'various' || !brand.category)
          .map(brand => ({
            id: brand.id,
            name: brand.name,
            logo: brand.logo_url || `https://via.placeholder.com/150x100?text=${brand.name}`
          }));
        
        setBrands({
          ...brands,
          imported: importedBrands.length > 0 ? importedBrands : mockBrands.imported,
          premium: premiumBrands.length > 0 ? premiumBrands : mockBrands.premium,
          national: nationalBrands.length > 0 ? nationalBrands : mockBrands.national,
          various: variousBrands.length > 0 ? variousBrands : mockBrands.various
        });
        
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
        // Fallback para dados mockados
        setBrands({
          ...brands,
          imported: mockBrands.imported,
          premium: mockBrands.premium,
          national: mockBrands.national,
          various: mockBrands.various
        });
      }
    };
    
    fetchBrands();
  }, []);

  return brands;
};
