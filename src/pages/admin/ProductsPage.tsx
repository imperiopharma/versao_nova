
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { ProductsList } from '@/components/admin/products/ProductsList';
import { BrandsList } from '@/components/admin/products/BrandsList';
import { CategoriesList } from '@/components/admin/products/CategoriesList';
import { useProductStore } from '@/hooks/useProductStore';
import { useToast } from '@/components/ui/use-toast';

export const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  const { fetchData, loading } = useProductStore();
  const { toast } = useToast();
  
  // Carregar todos os dados quando a página for montada
  useEffect(() => {
    console.log("ProductsPage: Buscando dados iniciais...");
    fetchData().then(() => {
      toast({
        title: "Dados carregados",
        description: "Produtos, marcas e categorias foram carregados com sucesso.",
      });
    }).catch(error => {
      toast({
        title: "Erro ao carregar dados",
        description: "Ocorreu um erro ao carregar os dados. Tente novamente.",
        variant: "destructive"
      });
    });
  }, []);
  
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
        </div>
        
        <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="brands">Marcas</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsList />
          </TabsContent>
          
          <TabsContent value="brands">
            <BrandsList />
          </TabsContent>
          
          <TabsContent value="categories">
            <CategoriesList />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
