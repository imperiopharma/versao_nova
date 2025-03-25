
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BrandDialog } from './BrandDialog';
import { SearchBar } from '../common/SearchBar';
import { useProductStore } from '@/hooks/useProductStore';
import { BrandsTable } from './BrandsTable';
import { DeleteBrandDialog } from './DeleteBrandDialog';

export const BrandsList: React.FC = () => {
  const { brands, deleteBrand } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<string | null>(null);

  const handleAddBrand = () => {
    setSelectedBrand(null);
    setIsBrandDialogOpen(true);
  };

  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand);
    setIsBrandDialogOpen(true);
  };

  const handleDeleteBrand = (brandId: string) => {
    setBrandToDelete(brandId);
  };

  const confirmDeleteBrand = async () => {
    if (!brandToDelete) return;
    
    try {
      await deleteBrand(brandToDelete);
      setBrandToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir marca:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBrands = brands.filter(brand => {
    const searchLower = searchQuery.toLowerCase();
    return (
      brand.name.toLowerCase().includes(searchLower) || 
      (brand.description && brand.description.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar 
          placeholder="Buscar marcas..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <Button onClick={handleAddBrand} className="ml-auto">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Marca
        </Button>
      </div>
      
      <BrandsTable 
        brands={filteredBrands}
        onEdit={handleEditBrand}
        onDelete={handleDeleteBrand}
      />
      
      {isBrandDialogOpen && (
        <BrandDialog 
          brand={selectedBrand}
          isOpen={isBrandDialogOpen}
          onClose={() => {
            setIsBrandDialogOpen(false);
            setSelectedBrand(null);
          }}
        />
      )}

      <DeleteBrandDialog 
        isOpen={brandToDelete !== null}
        onClose={() => setBrandToDelete(null)}
        onConfirm={confirmDeleteBrand}
      />
    </div>
  );
};
