
import React from 'react';
import { 
  TextField, 
  TextareaField, 
  SelectField, 
  ImageUploadField 
} from '@/components/admin/common/FormFields';

interface BasicTabProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  brands?: any[];
  categories?: any[];
}

export const BasicInfoTab: React.FC<BasicTabProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  brands = [],
  categories = []
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="product-name"
          label="Nome do Produto"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nome do produto"
          required
        />
        
        <TextField
          id="product-sku"
          label="SKU"
          value={formData.sku}
          onChange={handleInputChange}
          placeholder="SKU do produto"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Marca"
          value={formData.brand}
          onValueChange={(value) => handleSelectChange('brand', value)}
          options={brands.map(brand => ({
            value: brand.id,
            label: brand.name
          })) || [
            { value: 'Marca X', label: 'Marca X' },
            { value: 'Marca Y', label: 'Marca Y' },
            { value: 'Marca Z', label: 'Marca Z' }
          ]}
        />
        
        <SelectField
          label="Categoria"
          value={formData.category}
          onValueChange={(value) => handleSelectChange('category', value)}
          options={categories.map(category => ({
            value: category.id,
            label: category.name
          })) || [
            { value: 'Categoria 1', label: 'Categoria 1' },
            { value: 'Categoria 2', label: 'Categoria 2' },
            { value: 'Categoria 3', label: 'Categoria 3' }
          ]}
        />
      </div>
      
      <TextareaField
        id="product-description"
        label="Descrição"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Descrição detalhada do produto..."
        rows={5}
      />
      
      <SelectField
        label="Status"
        value={formData.status}
        onValueChange={(value) => handleSelectChange('status', value)}
        options={[
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
          { value: 'out_of_stock', label: 'Sem Estoque' }
        ]}
      />
    </div>
  );
};

export const PriceStockTab: React.FC<BasicTabProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="product-costPrice"
          label="Preço de Custo (R$)"
          value={formData.costPrice}
          onChange={handleInputChange}
          placeholder="0.00"
          type="number"
          description="Preço de custo para controle interno e cálculo de lucro"
        />
        
        <TextField
          id="product-sellingPrice"
          label="Preço de Venda (R$)"
          value={formData.sellingPrice}
          onChange={handleInputChange}
          placeholder="0.00"
          type="number"
          required
          description="Preço que aparecerá na loja para os clientes"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="product-promoPrice"
          label="Preço Promocional (R$)"
          value={formData.promoPrice}
          onChange={handleInputChange}
          placeholder="0.00"
          type="number"
          description="Preço durante promoções (deixe em branco se não houver)"
        />
        
        <TextField
          id="product-stock"
          label="Quantidade em Estoque"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="0"
          type="number"
          required
        />
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";

export const ImagesTab: React.FC = () => {
  return (
    <div className="space-y-4 py-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="mb-1 text-sm font-medium text-gray-900">
          Clique para fazer upload ou arraste e solte
        </p>
        <p className="text-xs text-gray-500">
          PNG, JPG ou WEBP (Máximo 5MB por imagem)
        </p>
        <Button className="mt-4" variant="outline" type="button">
          Selecionar Arquivos
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center relative">
          <p className="text-gray-500 text-sm">Sem imagens</p>
        </div>
      </div>
    </div>
  );
};
