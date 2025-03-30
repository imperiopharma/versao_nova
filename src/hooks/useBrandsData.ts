
import { useState } from 'react';
import { useProductCommon } from './useProductCommon';
import { brandService } from '@/services/apiService';
import { slugify } from '@/lib/utils';

export function useBrandsData() {
  const [brands, setBrands] = useState<any[]>([]);
  const { handleError, showSuccessToast } = useProductCommon();
  const [loading, setLoading] = useState(false);

  // Buscar marcas da API
  const fetchBrands = async () => {
    setLoading(true);
    try {
      console.log('Buscando marcas da API...');
      const brandsData = await brandService.getAll();

      if (brandsData && brandsData.length > 0) {
        // Formatar dados das marcas
        const formattedBrands = brandsData.map(brand => ({
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          description: brand.description || '',
          status: brand.status || 'active',
          logoUrl: brand.logo_url || '',
          category: brand.category || ''
        }));

        console.log(`Encontradas ${formattedBrands.length} marcas na API`);
        setBrands(formattedBrands);
        setLoading(false);
        return formattedBrands;
      }
      
      setLoading(false);
      return [];
    } catch (error) {
      handleError(error, 'Erro ao buscar marcas');
      setLoading(false);
      return [];
    }
  };

  // Adicionar uma marca via API
  const addBrand = async (brand: any) => {
    setLoading(true);
    try {
      // Verificar se o nome existe
      if (!brand.name) {
        throw new Error('Nome da marca é obrigatório');
      }
      
      // Gerar slug automaticamente se não existir
      const slug = brand.slug || slugify(brand.name);
      
      // Preparar dados para API
      const brandData = {
        name: brand.name,
        slug: slug,
        description: brand.description || '',
        logo_url: brand.logoUrl || '',
        category: brand.category || '',
        status: brand.status || 'active'
      };

      console.log('Enviando marca para API:', brandData);

      const newBrand = await brandService.create(brandData);

      if (newBrand) {
        const formattedBrand = {
          id: newBrand.id,
          name: newBrand.name,
          slug: newBrand.slug,
          description: newBrand.description || '',
          category: newBrand.category || '',
          logoUrl: newBrand.logo_url || '',
          status: newBrand.status || 'active'
        };

        setBrands(prev => [...prev, formattedBrand]);
        showSuccessToast('Marca adicionada', 'A marca foi adicionada com sucesso.');
        setLoading(false);
        return formattedBrand;
      }
      
      setLoading(false);
      return null;
    } catch (error) {
      handleError(error, 'Erro ao adicionar marca');
      setLoading(false);
      throw error;
    }
  };

  // Atualizar uma marca via API
  const updateBrand = async (brand: any) => {
    setLoading(true);
    try {
      const { id } = brand;
      
      // Verificar se o ID existe
      if (!id) {
        throw new Error('ID da marca é necessário para atualização');
      }
      
      // Preparar dados para API
      const brandData = {
        name: brand.name,
        slug: brand.slug,
        description: brand.description || '',
        logo_url: brand.logoUrl || '',
        category: brand.category || '',
        status: brand.status || 'active'
      };

      const updatedBrand = await brandService.update(id, brandData);

      if (updatedBrand) {
        // Atualizar a marca na lista local
        setBrands(prev => prev.map(b => b.id === id ? { 
          ...brand,
          id: updatedBrand.id || id,
          name: updatedBrand.name || brand.name,
          slug: updatedBrand.slug || brand.slug,
          description: updatedBrand.description || brand.description,
          category: updatedBrand.category || brand.category,
          logoUrl: updatedBrand.logo_url || brand.logoUrl,
          status: updatedBrand.status || brand.status
        } : b));
        
        showSuccessToast('Marca atualizada', 'A marca foi atualizada com sucesso.');
        setLoading(false);
        return updatedBrand;
      }
      
      setLoading(false);
      return null;
    } catch (error) {
      handleError(error, 'Erro ao atualizar marca');
      setLoading(false);
      throw error;
    }
  };

  // Excluir uma marca via API
  const deleteBrand = async (brandId: string) => {
    setLoading(true);
    try {
      await brandService.delete(brandId);

      // Remover a marca da lista local
      setBrands(prev => prev.filter(b => b.id !== brandId));
      showSuccessToast("Marca excluída", "A marca foi excluída com sucesso.");
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error, 'Erro ao excluir marca');
      setLoading(false);
      throw error;
    }
  };

  return {
    brands,
    setBrands,
    fetchBrands,
    addBrand,
    updateBrand,
    deleteBrand,
    loading
  };
}
