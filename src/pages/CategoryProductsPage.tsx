
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '../components/product/ProductCard';
import { Loader2, ArrowLeft } from 'lucide-react';

export const CategoryProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Rolar para o topo quando o componente é montado
    window.scrollTo(0, 0);
    
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      
      try {
        // Informações da categoria
        let categoryData = {
          id: categoryId,
          name: categoryId === 'emagrecedores' ? 'Produtos Emagrecedores' : 
                categoryId === 'farmacia' ? 'Produtos de Farmácia' : 
                categoryId === 'suplementos' ? 'Suplementos' :
                categoryId === 'proteinas' ? 'Proteínas' :
                categoryId
        };
        
        // Tente buscar informações da categoria do Supabase, se existir
        const { data: categoryFromDB, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .eq('id', categoryId)
          .maybeSingle();
        
        if (categoryFromDB && !categoryError) {
          categoryData = categoryFromDB;
        }
        
        setCategoryInfo(categoryData);
        
        // Buscar produtos para esta categoria
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('category', categoryId)
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
        console.error('Erro ao buscar dados da categoria:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryAndProducts();
  }, [categoryId]);
  
  if (loading) {
    return (
      <Layout>
        <div className="section-container py-12 min-h-[50vh] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-imperio-navy" />
        </div>
      </Layout>
    );
  }
  
  const getCategoryTitle = () => {
    if (categoryInfo && categoryInfo.name) return categoryInfo.name;
    
    if (categoryId === 'emagrecedores') return 'Produtos Emagrecedores';
    if (categoryId === 'farmacia') return 'Produtos de Farmácia';
    if (categoryId === 'orais') return 'Produtos Orais';
    if (categoryId === 'injetaveis') return 'Produtos Injetáveis';
    if (categoryId === 'cbd') return 'Produtos CBD';
    if (categoryId === 'suplementos') return 'Suplementos';
    if (categoryId === 'proteinas') return 'Proteínas';
    
    return categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : 'Categoria';
  };
  
  const getCategoryDescription = () => {
    if (categoryInfo && categoryInfo.description) return categoryInfo.description;
    
    if (categoryId === 'emagrecedores') return 'Conheça nossa linha de produtos emagrecedores para auxiliar no seu processo de emagrecimento.';
    if (categoryId === 'farmacia') return 'Os melhores produtos farmacêuticos disponíveis para sua saúde e bem-estar.';
    if (categoryId === 'orais') return 'Produtos orais de alta qualidade para diversos tratamentos.';
    if (categoryId === 'injetaveis') return 'Produtos injetáveis seguros e eficazes.';
    if (categoryId === 'cbd') return 'Produtos à base de CBD para diversos tratamentos.';
    if (categoryId === 'suplementos') return 'Suplementos diversos para performance e saúde.';
    if (categoryId === 'proteinas') return 'Suplementos proteicos para ganho de massa muscular.';
    
    return `Confira todos os produtos da categoria ${categoryId}`;
  };
  
  return (
    <Layout>
      <div className="section-container py-8">
        <Link to="/" className="flex items-center text-imperio-navy mb-4 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para a página inicial
        </Link>
        
        <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-imperio-navy text-4xl">
              {categoryId === 'emagrecedores' && <span className="text-3xl">💊</span>}
              {categoryId === 'farmacia' && <span className="text-3xl">💊</span>}
              {categoryId === 'suplementos' && <span className="text-3xl">💪</span>}
              {categoryId === 'proteinas' && <span className="text-3xl">🥛</span>}
            </div>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-imperio-navy">{getCategoryTitle()}</h1>
              <p className="text-gray-600 mt-2">{getCategoryDescription()}</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-medium text-imperio-navy mb-6">
          {products.length > 0 ? `Produtos (${products.length})` : 'Produtos'}
        </h2>
        
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-subtle p-8 text-center">
            <p className="text-gray-600">Nenhum produto disponível nesta categoria no momento.</p>
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
