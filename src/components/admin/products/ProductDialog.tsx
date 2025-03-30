
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useProductStore } from '@/hooks/useProductStore';
import {
  BasicInfoTab,
  PriceStockTab,
  ImagesTab
} from './ProductTabContent';
import { useProductDialogForm } from './hooks/useProductDialogForm';

interface ProductDialogProps {
  product?: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({ 
  product, 
  isOpen, 
  onClose 
}) => {
  const { toast } = useToast();
  const { addProduct, updateProduct, brands, categories, products, fetchData } = useProductStore();
  const isEditing = !!product;
  
  console.log("Renderizando ProductDialog, isEditing:", isEditing);
  
  // Usar hook personalizado para gerenciar o formulário
  const { formData, setFormData, handleInputChange, handleSelectChange, isFormValid } = useProductDialogForm({
    product,
    products,
    toast
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação do formulário
    if (!isFormValid()) {
      return;
    }
    
    try {
      // Prepara o produto para ser salvo
      const productToSave = {
        ...formData,
        // Convertemos "selecione" para string vazia antes de salvar
        brand: formData.brand === 'selecione' ? '' : formData.brand,
        category: formData.category === 'selecione' ? '' : formData.category,
        // Converte valores de string para número
        price: parseFloat(formData.sellingPrice) || 0,
        originalPrice: parseFloat(formData.costPrice) || 0,
        sellingPrice: parseFloat(formData.sellingPrice) || 0,
        costPrice: parseFloat(formData.costPrice) || 0,
        promoPrice: parseFloat(formData.promoPrice) || 0,
        stock: parseInt(formData.stock, 10) || 1,
        // Campos de combo
        isCombo: !!formData.isCombo,
        discountPercentage: parseInt(formData.discountPercentage, 10) || 0
      };

      console.log('Salvando produto:', productToSave);
      
      // Salva no store
      if (isEditing) {
        await updateProduct(productToSave);
      } else {
        await addProduct(productToSave);
      }

      // Após salvar, fechar o diálogo e atualizar a lista
      onClose();
      
      // Recarregar dados para garantir que a lista seja atualizada
      fetchData();
      
      toast({
        title: isEditing ? "Produto atualizado" : "Produto adicionado",
        description: `${formData.name} foi ${isEditing ? 'atualizado' : 'adicionado'} com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o produto. Tente novamente.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="price">Preços</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <BasicInfoTab 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                brands={brands}
                categories={categories}
              />
            </TabsContent>
            
            <TabsContent value="price">
              <PriceStockTab 
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </TabsContent>
            
            <TabsContent value="images">
              <ImagesTab formData={formData} />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit">
              {isEditing ? 'Salvar Alterações' : 'Adicionar Produto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
