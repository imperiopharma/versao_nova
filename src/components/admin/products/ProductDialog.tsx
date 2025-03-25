
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
  const { addProduct, updateProduct, brands, categories, products, fetchData } = useProductStore();
  const isEditing = !!product;
  
  console.log("Renderizando ProductDialog, isEditing:", isEditing);
  console.log("Produto para edição:", product);
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    sku: '',
    brand: 'selecione', // Valor padrão usando 'selecione' ao invés de string vazia
    category: 'selecione', // Valor padrão usando 'selecione' ao invés de string vazia
    description: '',
    status: 'active',
    costPrice: '',
    sellingPrice: '',
    promoPrice: '',
    stock: '1',
    image: 'https://via.placeholder.com/300x300?text=Produto'
  });

  // Popular o formulário quando um produto é passado para edição
  useEffect(() => {
    if (isEditing && product) {
      setFormData({
        id: product.id || '',
        name: product.name || '',
        sku: product.sku || '',
        brand: product.brand || 'selecione',
        category: product.category || 'selecione',
        description: product.description || '',
        status: product.status || 'active',
        costPrice: product.costPrice?.toString() || '',
        sellingPrice: product.sellingPrice?.toString() || '',
        promoPrice: product.promoPrice?.toString() || '',
        stock: product.stock?.toString() || '1',
        image: product.image || 'https://via.placeholder.com/300x300?text=Produto'
      });
    } else {
      // Gera um SKU sequencial baseado no número de produtos
      const nextNumber = products.length + 1;
      const generatedSku = `PROD${String(nextNumber).padStart(4, '0')}`;
      
      setFormData(prev => ({
        ...prev,
        id: '',
        name: '',
        sku: generatedSku,
        brand: 'selecione',
        category: 'selecione',
        description: '',
        status: 'active',
        costPrice: '',
        sellingPrice: '',
        promoPrice: '',
        stock: '1',
        image: 'https://via.placeholder.com/300x300?text=Produto'
      }));
    }
  }, [isEditing, product, products.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    console.log(`Campo ${id} alterado para: ${value}`);
    
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    console.log(`Select ${name} alterado para: ${value}`);
    
    // Se o valor for o valor do placeholder ("selecione"), tratamos de forma especial
    const finalValue = value === "selecione" ? "" : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: value // Mantemos "selecione" no estado do formulário
    }));
  };

  const isFormValid = () => {
    // Verificação básica de campos obrigatórios
    if (!formData.name || !formData.sku) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios para continuar.",
        variant: "destructive"
      });
      return false;
    }

    // Verificação de valores de marcas e categorias
    if (formData.brand === 'selecione' || formData.category === 'selecione') {
      toast({
        title: "Seleção obrigatória",
        description: "Selecione uma marca e uma categoria para o produto.",
        variant: "destructive"
      });
      return false;
    }

    // Verificação de preço de venda
    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
      toast({
        title: "Preço inválido",
        description: "O preço de venda deve ser maior que zero.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  }

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
        stock: parseInt(formData.stock, 10) || 1
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
