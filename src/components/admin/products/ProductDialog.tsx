
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

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
            
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Nome do Produto</Label>
                  <Input 
                    id="product-name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome do produto"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-sku">SKU</Label>
                  <Input 
                    id="product-sku" 
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="SKU do produto"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-brand">Marca</Label>
                  <Select 
                    value={formData.brand}
                    onValueChange={(value) => handleSelectChange('brand', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Marca X">Marca X</SelectItem>
                      <SelectItem value="Marca Y">Marca Y</SelectItem>
                      <SelectItem value="Marca Z">Marca Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-category">Categoria</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Categoria 1">Categoria 1</SelectItem>
                      <SelectItem value="Categoria 2">Categoria 2</SelectItem>
                      <SelectItem value="Categoria 3">Categoria 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-description">Descrição</Label>
                <Textarea 
                  id="product-description" 
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descrição detalhada do produto..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-status">Status</Label>
                <Select 
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="out_of_stock">Sem Estoque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="price" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-costPrice">
                    Preço de Custo (R$)
                  </Label>
                  <Input 
                    id="product-costPrice" 
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">
                    Preço de custo para controle interno e cálculo de lucro
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-sellingPrice">
                    Preço de Venda (R$)
                  </Label>
                  <Input 
                    id="product-sellingPrice" 
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Preço que aparecerá na loja para os clientes
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-promoPrice">
                    Preço Promocional (R$)
                  </Label>
                  <Input 
                    id="product-promoPrice" 
                    type="number"
                    step="0.01"
                    value={formData.promoPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">
                    Preço durante promoções (deixe em branco se não houver)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-stock">Quantidade em Estoque</Label>
                  <Input 
                    id="product-stock" 
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="space-y-4 py-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="mb-1 text-sm font-medium text-gray-900">
                  Clique para fazer upload ou arraste e solte
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG ou WEBP (Máximo 5MB por imagem)
                </p>
                <Button className="mt-4" variant="outline" type="button">
                  Selecionar Arquivos
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-4">
                {/* Aqui iriam as miniaturas das imagens já carregadas */}
                <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center relative">
                  <p className="text-gray-500 text-sm">Sem imagens</p>
                </div>
              </div>
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
