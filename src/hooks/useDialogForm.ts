
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseDialogFormProps<T> {
  initialData: T;
  entityName: string;
  isEditing: boolean;
  onClose: () => void;
}

export function useDialogForm<T>({
  initialData,
  entityName,
  isEditing,
  onClose,
}: UseDialogFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const { toast } = useToast();

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
    console.log(`Saving ${entityName.toLowerCase()}:`, formData);
    
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
