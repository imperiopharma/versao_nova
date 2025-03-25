
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '../components/product/ProductCard';
import { Loader2 } from 'lucide-react';

export const BrandProductsPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brandInfo, setBrandInfo] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const fetchBrandAndProducts = async () => {
      setLoading(true);
      
      try {
        // Fetch brand information
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('*')
          .eq('id', brandId)
          .single();
        
        if (brandError) throw brandError;
        setBrandInfo(brandData);
        
        // Fetch products for this brand
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('brand', brandData.name)
          .order('created_at', { ascending: false });
        
        if (productsError) throw productsError;
        
        const formattedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price || 0,
          originalPrice: product.original_price || product.price,
          image: product.image || 'https://via.placeholder.com/300x300?text=Produto',
          url: `/produto/${product.id}`
        }));
        
        setProducts(formattedProducts);
        
      } catch (error) {
        console.error('Error fetching brand data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrandAndProducts();
  }, [brandId]);
  
  if (loading) {
    return (
      <Layout>
        <div className="section-container py-12 min-h-[50vh] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-imperio-navy" />
        </div>
      </Layout>
    );
  }
  
  if (!brandInfo) {
    return (
      <Layout>
        <div className="section-container py-12">
          <h1 className="text-2xl font-semibold text-center">Marca não encontrada</h1>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="section-container py-8">
        <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center">
              <img 
                src={brandInfo.logo_url || `https://via.placeholder.com/150x100?text=${brandInfo.name}`} 
                alt={brandInfo.name} 
                className="max-w-full max-h-full"
              />
            </div>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-imperio-navy">{brandInfo.name}</h1>
              {brandInfo.description ? (
                <p className="text-gray-600 mt-2">{brandInfo.description}</p>
              ) : (
                <p className="text-gray-600 mt-2">
                  Confira abaixo todos os produtos da marca {brandInfo.name} disponíveis na Império Pharma.
                </p>
              )}
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-medium text-imperio-navy mb-6">
          Produtos de {brandInfo.name} ({products.length})
        </h2>
        
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-subtle p-8 text-center">
            <p className="text-gray-600">Nenhum produto disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                url={product.url}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
