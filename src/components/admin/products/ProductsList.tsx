
import React, { useEffect, useState } from 'react';
import { ProductDialog } from './ProductDialog';
import { SearchBar } from '../common/SearchBar';
import { useProductStore } from '@/hooks/useProductStore';
import { ProductsTable } from './ProductsTable';
import { DeleteProductDialog } from './DeleteProductDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const ProductsList: React.FC = () => {
  const { products, loading, deleteProduct, fetchData } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
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
    setCurrentPage(1); // Reset para a primeira página ao filtrar
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

  // Paginação dos produtos
  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <SearchBar 
          placeholder="Buscar produtos..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
          className="w-full sm:w-auto"
        />
        
        <Button 
          onClick={handleAddProduct} 
          className="flex items-center gap-1 w-full sm:w-auto"
        >
          <PlusCircle size={18} />
          <span>Adicionar Produto</span>
        </Button>
      </div>
      
      <div className="w-full overflow-hidden">
        <ProductsTable
          loading={loading}
          filteredProducts={paginatedProducts}
          formatCurrency={formatCurrency}
          handleEditProduct={handleEditProduct}
          handleDeleteClick={handleDeleteClick}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      
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
