
import React, { useEffect, useState } from 'react';
import { EntityDialog } from '@/components/admin/common/EntityDialog';
import { TextField, TextareaField, SelectField, ImageUploadField } from '@/components/admin/common/FormFields';
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

  // Gerar slug automático baseado no nome
  useEffect(() => {
    if (!isEditing && formData.name && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: slugify(formData.name)
      }));
    }
  }, [formData.name, isEditing]);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      logoUrl: e.target.value
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
      
      <TextField
        id="logoUrl"
        label="URL da Logo"
        value={formData.logoUrl}
        onChange={handleImageUrlChange}
        placeholder="https://exemplo.com/imagem.png"
        description="Digite a URL da imagem da logo da marca"
      />
      
      {formData.logoUrl && (
        <div className="mt-2">
          <p className="text-sm font-medium mb-2">Pré-visualização:</p>
          <div className="border border-gray-200 rounded-md p-4 flex justify-center">
            <img 
              src={formData.logoUrl} 
              alt="Pré-visualização" 
              className="max-h-24 object-contain" 
            />
          </div>
        </div>
      )}
    </EntityDialog>
  );
};
