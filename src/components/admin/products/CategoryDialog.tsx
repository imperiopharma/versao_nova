
import React from 'react';
import { EntityDialog } from '@/components/admin/common/EntityDialog';
import { TextField, TextareaField, SelectField } from '@/components/admin/common/FormFields';
import { useDialogForm } from '@/hooks/useDialogForm';

interface CategoryDialogProps {
  category?: any;
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryDialog: React.FC<CategoryDialogProps> = ({ 
  category, 
  isOpen, 
  onClose 
}) => {
  const isEditing = !!category;
  
  const initialData = {
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    status: category?.status || 'active'
  };
  
  const { 
    formData, 
    handleInputChange, 
    handleSelectChange, 
    handleSubmit 
  } = useDialogForm({
    initialData,
    entityName: 'Category',
    isEditing,
    onClose
  });

  return (
    <EntityDialog
      title={isEditing ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isEditing ? 'Salvar Alterações' : 'Adicionar Categoria'}
    >
      <TextField
        id="category-name"
        label="Nome da Categoria"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Nome da categoria"
        required
      />
      
      <TextField
        id="category-slug"
        label="Slug (URL)"
        value={formData.slug}
        onChange={handleInputChange}
        placeholder="slug-da-categoria"
        required
        description="O slug será usado na URL para acessar a página da categoria"
      />
      
      <TextareaField
        id="category-description"
        label="Descrição"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Descrição da categoria..."
      />
      
      <SelectField
        label="Status"
        value={formData.status}
        onValueChange={(value) => handleSelectChange('status', value)}
        options={[
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' }
        ]}
      />
    </EntityDialog>
  );
};
