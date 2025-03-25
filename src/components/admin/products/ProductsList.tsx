
import React, { useEffect, useState } from 'react';
import { ProductDialog } from './ProductDialog';
import { useDataList } from '@/hooks/useDataList';
import { SearchBar } from '../common/SearchBar';
import { useProductStore } from '@/hooks/useProductStore';
import { ProductsTable } from './ProductsTable';
import { DeleteProductDialog } from './DeleteProductDialog';

export const ProductsList: React.FC = () => {
  const { products, loading, deleteProduct } = useProductStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const {
    filteredData: filteredProducts,
    searchQuery,
    selectedItem: selectedProduct,
    isDialogOpen: isProductDialogOpen,
    handleEditItem: handleEditProduct,
    handleSearchChange,
    setIsDialogOpen: setIsProductDialogOpen,
    setSelectedItem: setSelectedProduct
  } = useDataList({
    initialData: products,
    searchFields: ['name', 'brand', 'sku']
  });
  
  // Atualizar os dados filtrados quando products mudar
  useEffect(() => {
    // Atualizar o initialData do useDataList
    // Isso é necessário porque o hook useDataList não atualiza automaticamente
    // quando o initialData muda
    handleSearchChange({ target: { value: searchQuery } } as React.ChangeEvent<HTMLInputElement>);
  }, [products]);

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <SearchBar 
        placeholder="Buscar produtos..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      
      <ProductsTable
        loading={loading}
        filteredProducts={filteredProducts}
        formatCurrency={formatCurrency}
        handleEditProduct={handleEditProduct}
        handleDeleteClick={handleDeleteClick}
      />
      
      {isProductDialogOpen && (
        <ProductDialog 
          product={selectedProduct}
          isOpen={isProductDialogOpen}
          onClose={() => {
            setIsProductDialogOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
      
      <DeleteProductDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
