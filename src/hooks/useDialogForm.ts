
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useProductStore } from './useProductStore';
import { ProductInputData } from '@/types/product';

interface UseDialogFormProps<T> {
  initialData: T;
  entityName: string;
  entityId?: string;
  isEditing: boolean;
  onClose: () => void;
}

export function useDialogForm<T>({
  initialData,
  entityName,
  entityId,
  isEditing,
  onClose,
}: UseDialogFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const { toast } = useToast();
  const productStore = useProductStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace(`${entityName.toLowerCase()}-`, '')]: value
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
    
    // Prepara os dados com id se estiver editando
    const dataToSave = isEditing 
      ? { ...formData, id: entityId } 
      : { ...formData, id: Date.now().toString() };

    console.log(`Saving ${entityName.toLowerCase()}:`, dataToSave);
    
    // Salva os dados no store apropriado com base no tipo de entidade
    if (entityName === 'Product') {
      if (isEditing) {
        productStore.updateProduct(dataToSave as unknown as ProductInputData);
      } else {
        productStore.addProduct(dataToSave as unknown as ProductInputData);
      }
    } else if (entityName === 'Brand') {
      if (isEditing) {
        productStore.updateBrand(dataToSave);
      } else {
        productStore.addBrand(dataToSave);
      }
    } else if (entityName === 'Category') {
      if (isEditing) {
        productStore.updateCategory(dataToSave);
      } else {
        productStore.addCategory(dataToSave);
      }
    }
    
    toast({
      title: isEditing ? `${entityName} atualizado` : `${entityName} adicionado`,
      description: `${formData['name' as keyof T]} foi ${isEditing ? 'atualizado' : 'adicionado'} com sucesso.`,
    });
    
    onClose();
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSelectChange,
    handleSubmit
  };
}
