
import React from 'react';
import { ImageUploadField, SelectField, TextField, TextareaField } from '../common/FormFields';

// Componente para informações básicas
export const BasicInfoTab: React.FC<{
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  brands: any[];
  categories: any[];
}> = ({ formData, handleInputChange, handleSelectChange, brands, categories }) => {
  console.log("Categorias disponíveis:", categories);
  
  return (
    <div className="space-y-4 py-2">
      <TextField
        id="product-name"
        label="Nome do Produto"
        value={formData.name || ''}
        onChange={handleInputChange}
        placeholder="Nome do produto"
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          id="product-sku"
          label="SKU / Código"
          value={formData.sku || ''}
          onChange={handleInputChange}
          placeholder="Código do produto"
          required
          description="Código único do produto (gerado automaticamente)"
        />
        
        <SelectField
          label="Status"
          value={formData.status || 'active'}
          onValueChange={(value) => handleSelectChange('status', value)}
          options={[
            { value: 'active', label: 'Ativo' },
            { value: 'inactive', label: 'Inativo' }
          ]}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Marca"
          value={formData.brand || ''}
          onValueChange={(value) => handleSelectChange('brand', value)}
          options={[
            { value: '', label: 'Selecione uma marca' },
            ...brands.map(brand => ({
              value: brand.name,
              label: brand.name
            }))
          ]}
        />
        
        <SelectField
          label="Categoria"
          value={formData.category || ''}
          onValueChange={(value) => handleSelectChange('category', value)}
          options={[
            { value: '', label: 'Selecione uma categoria' },
            ...categories.map(category => ({
              value: category.name,
              label: category.name
            }))
          ]}
        />
      </div>
      
      <TextareaField
        id="product-description"
        label="Descrição"
        value={formData.description || ''}
        onChange={handleInputChange}
        placeholder="Descrição detalhada do produto..."
        rows={4}
      />
    </div>
  );
};

// Componente para preços e estoque
export const PriceStockTab: React.FC<{
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}> = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          id="product-costPrice"
          label="Preço de Custo"
          value={formData.costPrice || ''}
          onChange={handleInputChange}
          placeholder="0,00"
          type="number"
          description="Preço pago pelo produto"
        />
        
        <TextField
          id="product-sellingPrice"
          label="Preço de Venda"
          value={formData.sellingPrice || ''}
          onChange={handleInputChange}
          placeholder="0,00"
          type="number"
          required
          description="Preço que será cobrado do cliente"
        />
      </div>
      
      <TextField
        id="product-promoPrice"
        label="Preço Promocional"
        value={formData.promoPrice || ''}
        onChange={handleInputChange}
        placeholder="0,00"
        type="number"
        description="Preço durante promoções (opcional)"
      />
    </div>
  );
};

// Componente para imagens
export const ImagesTab: React.FC = () => {
  return (
    <div className="space-y-4 py-2">
      <p className="text-sm text-gray-500 mb-4">
        Faça upload de imagens do produto. A primeira imagem será usada como capa.
      </p>
      
      <ImageUploadField
        label="Imagem Principal"
        imageUrl="https://via.placeholder.com/300x300?text=Produto"
        imageName="Imagem de produto"
      />
    </div>
  );
};
