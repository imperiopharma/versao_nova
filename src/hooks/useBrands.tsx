
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BrandCategories, Brand, BrandCategory } from '@/types/brand';
import { mockBrands } from '@/data/mock/brands';
import { Pill, Heart } from 'lucide-react';
import { getSafeImageUrl } from '@/lib/utils';

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
        console.log('Buscando marcas do Supabase...');
        const { data: brandsData, error: brandsError } = await supabase
          .from('brands')
          .select('*')
          .eq('status', 'active');
        
        if (brandsError) {
          console.error('Erro ao buscar marcas do Supabase:', brandsError);
          throw brandsError;
        }
        
        if (brandsData && brandsData.length > 0) {
          console.log('Marcas encontradas no Supabase:', brandsData.length);
          
          // Processamento dos dados por categoria
          const importedBrands = brandsData
            .filter(brand => brand.category === 'imported')
            .map(brand => mapBrandData(brand));
          
          const premiumBrands = brandsData
            .filter(brand => brand.category === 'premium')
            .map(brand => mapBrandData(brand));
          
          const nationalBrands = brandsData
            .filter(brand => brand.category === 'national')
            .map(brand => mapBrandData(brand));
          
          const variousBrands = brandsData
            .filter(brand => brand.category === 'various' || !brand.category)
            .map(brand => mapBrandData(brand));
          
          // Atualizar o estado com os dados do Supabase
          setBrands({
            ...brands,
            imported: importedBrands,
            premium: premiumBrands,
            national: nationalBrands,
            various: variousBrands
          });
          
          console.log('Marcas importadas:', importedBrands);
        } else {
          console.log('Nenhuma marca encontrada no Supabase, usando dados mock');
          // Fallback para dados mockados
          setBrands({
            ...brands,
            imported: mockBrands.imported,
            premium: mockBrands.premium,
            national: mockBrands.national,
            various: mockBrands.various
          });
        }
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

  // Função para mapear dados do Supabase para o formato da aplicação
  const mapBrandData = (brandData: any): Brand => {
    // Garantir que todas as propriedades sejam devidamente mapeadas
    const logoUrl = brandData.logo_url || '';
    
    return {
      id: brandData.id,
      name: brandData.name,
      logo: getSafeImageUrl(
        logoUrl,
        `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(brandData.name)}`,
        brandData.name
      ),
      description: brandData.description,
      slug: brandData.slug,
      status: brandData.status,
      category: brandData.category as BrandCategory,
      logoUrl: logoUrl // Garantir que logoUrl seja preenchido
    };
  };

  return brands;
};
