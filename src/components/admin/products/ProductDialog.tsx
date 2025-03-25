
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
  const { addProduct, updateProduct, brands, categories, products } = useProductStore();
  const isEditing = !!product;
  
  // Form state
  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    sku: product?.sku || '',
    brand: product?.brand || '',
    category: product?.category || '',
    description: product?.description || '',
    status: product?.status || 'active',
    costPrice: product?.costPrice || '',
    sellingPrice: product?.sellingPrice || '',
    promoPrice: product?.promoPrice || '',
    stock: product?.stock || '',
    image: product?.image || 'https://via.placeholder.com/300x300?text=Produto'
  });

  // Atualiza o SKU automaticamente ao abrir o formulário para um novo produto
  useEffect(() => {
    if (!isEditing) {
      // Gera um SKU sequencial baseado no número de produtos
      const nextNumber = products.length + 1;
      const generatedSku = `PROD${String(nextNumber).padStart(4, '0')}`;
      
      setFormData(prev => ({
        ...prev,
        sku: generatedSku
      }));
    }
  }, [isEditing, products.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('product-', '')]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepara o produto para ser salvo
    const productToSave = {
      ...formData,
      // Converte valores de string para número
      price: parseFloat(formData.sellingPrice) || 0,
      originalPrice: parseFloat(formData.costPrice) || 0,
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      costPrice: parseFloat(formData.costPrice) || 0,
      promoPrice: parseFloat(formData.promoPrice) || 0,
      stock: 1 // Valor padrão para estoque (não mais obrigatório)
    };

    // Salva no store
    if (isEditing) {
      updateProduct(productToSave);
    } else {
      addProduct(productToSave);
    }
    
    console.log('Saving product:', productToSave);
    
    toast({
      title: isEditing ? "Produto atualizado" : "Produto adicionado",
      description: `${formData.name} foi ${isEditing ? 'atualizado' : 'adicionado'} com sucesso.`,
    });
    
    onClose();
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
                handleSelectChange={handleSelectChange}
              />
            </TabsContent>
            
            <TabsContent value="images">
              <ImagesTab />
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
