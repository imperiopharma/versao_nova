
import React, { useEffect, useState } from 'react';
import { EntityDialog } from '@/components/admin/common/EntityDialog';
import { TextField, TextareaField, SelectField } from '@/components/admin/common/FormFields';
import { FileUploadField } from '@/components/admin/common/FileUploadField';
import { useDialogForm } from '@/hooks/useDialogForm';
import { slugify } from '@/lib/utils';

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
    logoUrl: brand?.logoUrl || '',
    category: brand?.category || 'national'
  };
  
  const { 
    formData, 
    setFormData,
    handleInputChange, 
    handleSelectChange, 
    handleSubmit 
  } = useDialogForm({
    initialData,
    entityName: 'Brand',
    entityId: brand?.id,
    isEditing,
    onClose
  });

  // Focar no campo da imagem se indicado
  const [focusLogo, setFocusLogo] = useState(brand?.focus === 'logo');

  // Gerar slug automático baseado no nome
  useEffect(() => {
    if (!isEditing && formData.name && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: slugify(formData.name)
      }));
    }
  }, [formData.name, isEditing]);

  // Lidar com upload de imagem
  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      logoUrl: url
    }));
  };

  return (
    <EntityDialog
      title={isEditing ? 'Editar Marca' : 'Adicionar Nova Marca'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isEditing ? 'Salvar Alterações' : 'Adicionar Marca'}
    >
      <TextField
        id="name"
        label="Nome da Marca"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Nome da marca"
        required
      />
      
      <TextField
        id="slug"
        label="Slug (URL)"
        value={formData.slug}
        onChange={handleInputChange}
        placeholder="slug-da-marca"
        required
        description="O slug será usado na URL para acessar a página da marca"
      />
      
      <TextareaField
        id="description"
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
      
      <SelectField
        label="Categoria"
        value={formData.category}
        onValueChange={(value) => handleSelectChange('category', value)}
        options={[
          { value: 'imported', label: 'Importada' },
          { value: 'premium', label: 'Premium' },
          { value: 'national', label: 'Nacional' },
          { value: 'various', label: 'Diversos' }
        ]}
      />
      
      <FileUploadField
        label="Logo da Marca"
        imageUrl={formData.logoUrl}
        onImageUpload={handleImageUpload}
        description="Faça upload da logo da marca (formatos recomendados: PNG, JPG ou WEBP)"
      />
    </EntityDialog>
  );
};
