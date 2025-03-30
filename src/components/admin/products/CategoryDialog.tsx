
import React, { useState } from 'react';
import { EntityDialog } from '@/components/admin/common/EntityDialog';
import { TextField, TextareaField, SelectField } from '@/components/admin/common/FormFields';
import { useDialogForm } from '@/hooks/useDialogForm';
import { Pill, ShoppingBag, Heart, Star, Package, Tag, Sparkles } from 'lucide-react';

// Opções de ícones disponíveis
const iconOptions = [
  { value: 'pill', label: 'Remédio', icon: <Pill className="h-4 w-4" /> },
  { value: 'shopping-bag', label: 'Sacola', icon: <ShoppingBag className="h-4 w-4" /> },
  { value: 'heart', label: 'Coração', icon: <Heart className="h-4 w-4" /> },
  { value: 'star', label: 'Estrela', icon: <Star className="h-4 w-4" /> },
  { value: 'package', label: 'Pacote', icon: <Package className="h-4 w-4" /> },
  { value: 'tag', label: 'Etiqueta', icon: <Tag className="h-4 w-4" /> },
  { value: 'sparkles', label: 'Brilho', icon: <Sparkles className="h-4 w-4" /> }
];

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
    status: category?.status || 'active',
    iconName: category?.iconName || 'pill'
  };
  
  const { 
    formData, 
    handleInputChange, 
    handleSelectChange, 
    handleSubmit 
  } = useDialogForm({
    initialData,
    entityName: 'Category',
    entityId: category?.id,
    isEditing,
    onClose
  });

  // Renderizar o ícone selecionado
  const renderSelectedIcon = () => {
    switch (formData.iconName) {
      case 'pill': return <Pill />;
      case 'shopping-bag': return <ShoppingBag />;
      case 'heart': return <Heart />;
      case 'star': return <Star />;
      case 'package': return <Package />;
      case 'tag': return <Tag />;
      case 'sparkles': return <Sparkles />;
      default: return <Pill />;
    }
  };

  return (
    <EntityDialog
      title={isEditing ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isEditing ? 'Salvar Alterações' : 'Adicionar Categoria'}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 md:col-span-1">
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
          
          <SelectField
            label="Status"
            value={formData.status}
            onValueChange={(value) => handleSelectChange('status', value)}
            options={[
              { value: 'active', label: 'Ativo' },
              { value: 'inactive', label: 'Inativo' }
            ]}
          />
        </div>
        
        <div className="space-y-4 md:col-span-1">
          <TextareaField
            id="category-description"
            label="Descrição"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Descrição da categoria..."
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Ícone</label>
            <div className="grid grid-cols-4 gap-2">
              {iconOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelectChange('iconName', option.value)}
                  className={`p-3 flex flex-col items-center justify-center rounded-md border transition-colors ${
                    formData.iconName === option.value 
                      ? 'border-imperio-navy bg-imperio-extra-light-navy text-imperio-navy' 
                      : 'border-gray-200 hover:border-imperio-navy/50'
                  }`}
                >
                  <div className="mb-1">{option.icon}</div>
                  <span className="text-xs">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EntityDialog>
  );
};
