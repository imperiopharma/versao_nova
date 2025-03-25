
import React from 'react';
import { EntityDialog } from '@/components/admin/common/EntityDialog';
import { TextField, TextareaField, SelectField, ImageUploadField } from '@/components/admin/common/FormFields';
import { useDialogForm } from '@/hooks/useDialogForm';

interface BrandDialogProps {
  brand?: any;
  isOpen: boolean;
  onClose: () => void;
}

export const BrandDialog: React.FC<BrandDialogProps> = ({ 
  brand, 
  isOpen, 
  onClose 
}) => {
  const isEditing = !!brand;
  
  const initialData = {
    name: brand?.name || '',
    slug: brand?.slug || '',
    description: brand?.description || '',
    status: brand?.status || 'active',
    logoUrl: brand?.logoUrl || ''
  };
  
  const { 
    formData, 
    handleInputChange, 
    handleSelectChange, 
    handleSubmit 
  } = useDialogForm({
    initialData,
    entityName: 'Brand',
    isEditing,
    onClose
  });

  return (
    <EntityDialog
      title={isEditing ? 'Editar Marca' : 'Adicionar Nova Marca'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isEditing ? 'Salvar Alterações' : 'Adicionar Marca'}
    >
      <TextField
        id="brand-name"
        label="Nome da Marca"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Nome da marca"
        required
      />
      
      <TextField
        id="brand-slug"
        label="Slug (URL)"
        value={formData.slug}
        onChange={handleInputChange}
        placeholder="slug-da-marca"
        required
        description="O slug será usado na URL para acessar a página da marca"
      />
      
      <TextareaField
        id="brand-description"
        label="Descrição"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Descrição da marca..."
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
      
      <ImageUploadField
        label="Logo da Marca"
        imageUrl={formData.logoUrl}
        imageName={formData.name}
      />
    </EntityDialog>
  );
};
