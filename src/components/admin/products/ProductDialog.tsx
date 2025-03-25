
import React, { useState } from 'react';
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
  const isEditing = !!product;
  
  // Form state
  const [formData, setFormData] = useState({
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
  });

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
    // Here you would typically save the data to your backend
    console.log('Saving product:', formData);
    
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
              <TabsTrigger value="price">Preços e Estoque</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <BasicInfoTab 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
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
