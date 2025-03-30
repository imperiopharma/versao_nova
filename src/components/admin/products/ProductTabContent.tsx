
import React from 'react';
import { ImageUploadField, SelectField, TextField, TextareaField } from '../common/FormFields';

// Componente para informações básicas
export const BasicInfoTab: React.FC<{
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string | boolean) => void;
  brands: any[];
  categories: any[];
}> = ({ formData, handleInputChange, handleSelectChange, brands, categories }) => {
  console.log("Renderizando BasicInfoTab com dados:", formData);
  console.log("Categorias disponíveis:", categories);
  console.log("Marcas disponíveis:", brands);
  
  return (
    <div className="space-y-4 py-2">
      <TextField
        id="name"
        label="Nome do Produto"
        value={formData.name || ''}
        onChange={handleInputChange}
        placeholder="Nome do produto"
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          id="sku"
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
          value={formData.brand || 'selecione'}
          onValueChange={(value) => handleSelectChange('brand', value)}
          options={[
            { value: "selecione", label: 'Selecione uma marca' },
            ...brands.map(brand => ({
              value: brand.name,
              label: brand.name
            }))
          ]}
        />
        
        <SelectField
          label="Categoria"
          value={formData.category || 'selecione'}
          onValueChange={(value) => handleSelectChange('category', value)}
          options={[
            { value: "selecione", label: 'Selecione uma categoria' },
            ...categories.map(category => ({
              value: category.name,
              label: category.name
            }))
          ]}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Tipo de Produto"
          value={formData.isCombo ? 'combo' : 'regular'}
          onValueChange={(value) => handleSelectChange('isCombo', value === 'combo')}
          options={[
            { value: "regular", label: 'Produto Regular' },
            { value: "combo", label: 'Combo/Kit' }
          ]}
        />
        
        {formData.isCombo && (
          <TextField
            id="discountPercentage"
            label="Desconto do Combo (%)"
            value={formData.discountPercentage || '0'}
            onChange={handleInputChange}
            type="number"
            placeholder="0"
            description="Desconto aplicado ao combo"
          />
        )}
      </div>
      
      <TextareaField
        id="description"
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
}> = ({ formData, handleInputChange }) => {
  console.log("Renderizando PriceStockTab com dados:", formData);
  
  return (
    <div className="space-y-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          id="costPrice"
          label="Preço de Custo"
          value={formData.costPrice || ''}
          onChange={handleInputChange}
          placeholder="0,00"
          type="number"
          description="Preço pago pelo produto"
        />
        
        <TextField
          id="sellingPrice"
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
        id="promoPrice"
        label="Preço Promocional"
        value={formData.promoPrice || ''}
        onChange={handleInputChange}
        placeholder="0,00"
        type="number"
        description="Preço durante promoções (opcional)"
      />
      
      <TextField
        id="stock"
        label="Estoque"
        value={formData.stock || '1'}
        onChange={handleInputChange}
        placeholder="1"
        type="number"
        description="Quantidade disponível em estoque"
      />
    </div>
  );
};

// Componente para imagens
export const ImagesTab: React.FC<{
  formData: any;
  handleImageChange?: (imageUrl: string) => void;
}> = ({ formData, handleImageChange }) => {
  console.log("Renderizando ImagesTab com dados:", formData);
  
  return (
    <div className="space-y-4 py-2">
      <p className="text-sm text-gray-500 mb-4">
        Faça upload de imagens do produto. A primeira imagem será usada como capa.
      </p>
      
      <ImageUploadField
        label="Imagem Principal"
        imageUrl={formData.image || "https://via.placeholder.com/300x300?text=Produto"}
        imageName="Imagem de produto"
      />
    </div>
  );
};
