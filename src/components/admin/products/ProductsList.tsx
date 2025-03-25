
import React, { useEffect, useState } from 'react';
import { ProductDialog } from './ProductDialog';
import { SearchBar } from '../common/SearchBar';
import { useProductStore } from '@/hooks/useProductStore';
import { ProductsTable } from './ProductsTable';
import { DeleteProductDialog } from './DeleteProductDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const ProductsList: React.FC = () => {
  const { products, loading, deleteProduct, fetchData } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  console.log("ProductsList renderizado, total de produtos:", products.length);
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  // Atualizar os dados quando a página carregar
  useEffect(() => {
    console.log("Buscando dados de produtos...");
    fetchData();
  }, []);
  
  // Filtrar produtos quando a lista de produtos ou a consulta de pesquisa mudarem
  useEffect(() => {
    console.log(`Aplicando filtro: ${searchQuery} em ${products.length} produtos`);
    
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(product => {
      return (
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.brand && product.brand.toLowerCase().includes(query)) ||
        (product.sku && product.sku.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    });
    
    console.log(`Resultados filtrados: ${filtered.length} produtos`);
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  // Manipulador para abrir o diálogo de adição de produto
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductDialogOpen(true);
  };

  // Manipulador para editar um produto
  const handleEditProduct = (product: any) => {
    console.log("Produto selecionado para edição:", product);
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  // Manipulador para o clique de exclusão
  const handleDeleteClick = (productId: string) => {
    console.log("Produto selecionado para exclusão:", productId);
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  // Confirmar exclusão de produto
  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        console.log("Confirmando exclusão do produto:", productToDelete);
        await deleteProduct(productToDelete);
        setDeleteDialogOpen(false);
        setProductToDelete(null);
        // Recarregar dados após excluir
        fetchData();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  // Manipulador para fechar o diálogo de produto
  const handleCloseProductDialog = () => {
    console.log("Fechando diálogo de produto");
    setIsProductDialogOpen(false);
    setSelectedProduct(null);
    // Recarregar dados após fechar o diálogo
    fetchData();
  };

  // Manipulador para mudança na pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar 
          placeholder="Buscar produtos..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        
        <Button 
          onClick={handleAddProduct} 
          className="flex items-center gap-1"
        >
          <PlusCircle size={18} />
          <span>Adicionar Produto</span>
        </Button>
      </div>
      
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
          onClose={handleCloseProductDialog}
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
