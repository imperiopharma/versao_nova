
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Brand, BrandCategory } from '@/types/brand';

export const useBrands = () => {
  const [imported, setImported] = useState<Brand[]>([]);
  const [premium, setPremium] = useState<Brand[]>([]);
  const [national, setNational] = useState<Brand[]>([]);
  const [various, setVarious] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .eq('status', 'active')
          .order('name');
          
        if (error) {
          console.error('Erro ao buscar marcas:', error);
          return;
        }
        
        if (data) {
          const importedBrands: Brand[] = [];
          const premiumBrands: Brand[] = [];
          const nationalBrands: Brand[] = [];
          const variousBrands: Brand[] = [];
          
          data.forEach(brand => {
            const brandItem: Brand = {
              id: brand.id,
              name: brand.name,
              logo: '',
              logoUrl: brand.logo_url
            };
            
            // Classificar marca com base na categoria
            switch(brand.category?.toLowerCase()) {
              case 'imported':
              case 'importada':
              case 'importadas':
                importedBrands.push(brandItem);
                break;
              case 'premium':
                premiumBrands.push(brandItem);
                break;
              case 'national':
              case 'nacional':
              case 'nacionais':
                nationalBrands.push(brandItem);
                break;
              default:
                variousBrands.push(brandItem);
                break;
            }
          });
          
          setImported(importedBrands);
          setPremium(premiumBrands);
          setNational(nationalBrands);
          setVarious(variousBrands);
        }
      } catch (err) {
        console.error('Erro ao processar marcas:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  return {
    imported,
    premium,
    national,
    various,
    loading,
    // Agregado para conveniência ao passar para BrandsSection
    brands: {
      imported,
      premium,
      national,
      various
    }
  };
};
