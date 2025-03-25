
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ProductCard } from '../components/product/ProductCard';
import { useProductStore } from '@/hooks/useProductStore';

export const BrandProductsPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const { brands, products } = useProductStore();
  
  // Encontra a marca selecionada
  const brand = brands.find(b => b.id === brandId);
  
  // Filtra produtos pela marca
  const brandProducts = products.filter(product => product.brand === brand?.name);
  
  if (!brand) {
    return (
      <Layout>
        <div className="section-container py-12">
          <h1 className="text-3xl font-semibold text-imperio-navy mb-6">Marca não encontrada</h1>
          <p>A marca que você está procurando não existe ou foi removida.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-imperio-navy">{brand.name}</h1>
            <p className="text-gray-600 mt-2">{brand.description}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <img 
              src={brand.logoUrl} 
              alt={brand.name} 
              className="h-16 object-contain" 
            />
          </div>
        </div>
        
        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                url={`/produto/${product.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-600">Nenhum produto disponível</h3>
            <p className="text-gray-500 mt-2">
              Não existem produtos cadastrados para esta marca ainda.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
