
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadFieldProps {
  label: string;
  imageUrl?: string;
  onImageUpload: (url: string) => void;
  folder?: string;
  description?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({ 
  label, 
  imageUrl, 
  onImageUpload, 
  folder = 'logos',
  description
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(imageUrl || null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validar tipo de arquivo (apenas imagens)
    if (!file.type.match('image.*')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione apenas arquivos de imagem (JPG, PNG, etc).",
        variant: "destructive"
      });
      return;
    }
    
    // Validar tamanho (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 2MB.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Criar um nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      // Fazer upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from('brands')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Obter URL pública da imagem
      const { data: publicUrlData } = supabase.storage
        .from('brands')
        .getPublicUrl(filePath);
      
      if (publicUrlData?.publicUrl) {
        // Atualizar preview e notificar o componente pai
        setPreview(publicUrlData.publicUrl);
        onImageUpload(publicUrlData.publicUrl);
        
        toast({
          title: "Upload concluído",
          description: "A imagem foi carregada com sucesso."
        });
      }
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      toast({
        title: "Erro no upload",
        description: error.message || "Não foi possível fazer o upload da imagem.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload('');
  };
  
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {preview ? (
        <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
          <div className="relative mb-3 max-w-xs">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-24 max-w-full object-contain" 
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => document.getElementById('fileInput' + label.replace(/\s+/g, ''))?.click()}
          >
            Trocar Imagem
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
              <p className="text-sm text-gray-500">Enviando...</p>
            </div>
          ) : (
            <>
              <div className="mb-2">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-2">
                PNG, JPG ou WEBP (Máximo 2MB)
              </p>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => document.getElementById('fileInput' + label.replace(/\s+/g, ''))?.click()}
              >
                Selecionar Arquivo
              </Button>
            </>
          )}
        </div>
      )}
      
      <input
        id={'fileInput' + label.replace(/\s+/g, '')}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};
