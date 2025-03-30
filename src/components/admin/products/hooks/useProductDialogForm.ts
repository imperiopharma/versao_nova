
import { useState, useEffect } from 'react';

interface ProductFormData {
  id: string;
  name: string;
  sku: string;
  brand: string;
  category: string;
  description: string;
  status: string;
  costPrice: string;
  sellingPrice: string;
  promoPrice: string;
  stock: string;
  image: string;
  isCombo: boolean;
  discountPercentage: string;
  [key: string]: any;
}

interface UseProductDialogFormProps {
  product: any;
  products: any[];
  toast: any;
}

export const useProductDialogForm = ({ product, products, toast }: UseProductDialogFormProps) => {
  const isEditing = !!product;
  
  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    sku: '',
    brand: 'selecione',
    category: 'selecione',
    description: '',
    status: 'active',
    costPrice: '',
    sellingPrice: '',
    promoPrice: '',
    stock: '1',
    image: 'https://via.placeholder.com/300x300?text=Produto',
    isCombo: false,
    discountPercentage: '0'
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
        image: product.image || 'https://via.placeholder.com/300x300?text=Produto',
        isCombo: product.isCombo || false,
        discountPercentage: product.discountPercentage?.toString() || '0'
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
        image: 'https://via.placeholder.com/300x300?text=Produto',
        isCombo: false,
        discountPercentage: '0'
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

  const handleSelectChange = (name: string, value: string | boolean) => {
    console.log(`Select ${name} alterado para:`, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
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
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSelectChange,
    isFormValid
  };
};
