import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AddedToCartModal } from '@/components/cart/AddedToCartModal';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showCartModal, setShowCartModal] = useState(false);
  const { addItem, itemCount, total } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) throw error;

        const formattedProduct = {
          id: data.id,
          name: data.name,
          brand: data.brand,
          price: data.price,
          originalPrice: data.original_price,
          image: data.image || 'https://via.placeholder.com/500x500?text=Produto',
          sku: data.sku,
          category: data.category,
          description: data.description,
          status: data.status,
          costPrice: data.cost_price,
          sellingPrice: data.selling_price,
          promoPrice: data.promo_price,
          stock: data.stock,
        };

        setProduct(formattedProduct);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes do produto. Tente novamente mais tarde.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price || product.sellingPrice,
        originalPrice: product.originalPrice || product.costPrice,
        quantity,
        image: product.image
      });

      setShowCartModal(true);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-container py-12">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="animate-pulse space-y-6 w-full max-w-4xl">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[400px] bg-gray-200 rounded"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="section-container py-12">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl text-gray-700 mb-4">Produto não encontrado</h1>
            <Link to="/" className="flex items-center text-imperio-navy hover:underline">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const discountPercentage = product?.originalPrice && product?.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-imperio-navy hover:text-imperio-light-navy transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para a loja
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagem do Produto */}
          <div className="bg-white p-4 rounded-lg imperio-card">
            <img 
              src={product?.image} 
              alt={product?.name} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          
          {/* Detalhes do Produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-imperio-navy">{product?.name}</h1>
              <p className="text-gray-600 mt-1">Marca: {product?.brand}</p>
              <p className="text-sm text-gray-500 mt-1">SKU: {product?.sku}</p>
            </div>
            
            <div className="border-t border-b py-4">
              <div className="flex items-baseline gap-2">
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <>
                    <span className="text-gray-500 line-through">
                      {product.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <span className="bg-imperio-red text-white text-xs px-2 py-1 rounded">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              <div className="text-2xl font-semibold text-imperio-navy mt-1">
                {(product?.price || product?.sellingPrice)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {product?.stock > 0 ? (
                  <span className="text-green-600">Em estoque: {product.stock} unidades</span>
                ) : (
                  <span className="text-red-600">Fora de estoque</span>
                )}
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Descrição</h2>
              <p className="text-gray-700">{product?.description || "Sem descrição disponível."}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-24">
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Qtd" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="bg-imperio-navy hover:bg-imperio-light-navy flex-1"
                onClick={handleAddToCart}
                disabled={product?.stock <= 0}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 border-t pt-4">
              <p>Categoria: {product?.category || "Não categorizado"}</p>
            </div>
          </div>
        </div>
      </div>

      {showCartModal && (
        <AddedToCartModal
          productName={product.name}
          productImage={product.image}
          total={total}
          itemCount={itemCount}
          onClose={() => setShowCartModal(false)}
        />
      )}
    </Layout>
  );
};
