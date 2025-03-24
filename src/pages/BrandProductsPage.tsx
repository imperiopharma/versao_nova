
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ChevronLeft, ChevronDown, AlertTriangle } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data - would come from Supabase in a real app
const MOCK_BRANDS = {
  'king-pharma': {
    id: 'king-pharma',
    name: 'King Pharma',
    logo: 'https://via.placeholder.com/200x100?text=King+Pharma',
    shippingNote: 'Produtos King Pharma não podem ser misturados com outras marcas (frete adicional).',
    products: {
      injetaveis: [
        { id: 'kp-1', name: 'King Test 250', price: 180, originalPrice: 200, image: 'https://via.placeholder.com/300?text=King+Test' },
        { id: 'kp-2', name: 'King Deca 200', price: 150, image: 'https://via.placeholder.com/300?text=King+Deca' },
        { id: 'kp-3', name: 'King Prop 100', price: 120, originalPrice: 140, image: 'https://via.placeholder.com/300?text=King+Prop' },
      ],
      orais: [
        { id: 'kp-4', name: 'King Stan 10mg', price: 90, image: 'https://via.placeholder.com/300?text=King+Stan' },
        { id: 'kp-5', name: 'King Dbol 20mg', price: 85, originalPrice: 100, image: 'https://via.placeholder.com/300?text=King+Dbol' },
      ],
      combos: [
        { id: 'kp-6', name: 'Combo Definição King', price: 399, originalPrice: 450, image: 'https://via.placeholder.com/300?text=Combo+King' },
      ],
    }
  },
  'cooper-pharma': {
    id: 'cooper-pharma',
    name: 'Cooper Pharma',
    logo: 'https://via.placeholder.com/200x100?text=Cooper+Pharma',
    products: {
      injetaveis: [
        { id: 'cp-1', name: 'Cooper Test 300', price: 190, image: 'https://via.placeholder.com/300?text=Cooper+Test' },
        { id: 'cp-2', name: 'Cooper Deca 250', price: 160, originalPrice: 180, image: 'https://via.placeholder.com/300?text=Cooper+Deca' },
      ],
      orais: [
        { id: 'cp-3', name: 'Cooper Oxan 50mg', price: 95, image: 'https://via.placeholder.com/300?text=Cooper+Oxan' },
      ],
    }
  },
  'muscle-labs': {
    id: 'muscle-labs',
    name: 'Muscle Labs',
    logo: 'https://via.placeholder.com/200x100?text=Muscle+Labs',
    products: {
      injetaveis: [
        { id: 'ml-1', name: 'Muscle Test 300', price: 195, originalPrice: 220, image: 'https://via.placeholder.com/300?text=Muscle+Test' },
      ],
      orais: [
        { id: 'ml-2', name: 'Muscle Winstrol 50mg', price: 110, image: 'https://via.placeholder.com/300?text=Muscle+Winstrol' },
        { id: 'ml-3', name: 'Muscle Anavar 20mg', price: 130, originalPrice: 150, image: 'https://via.placeholder.com/300?text=Muscle+Anavar' },
      ],
      combos: [
        { id: 'ml-4', name: 'Combo Bulking Muscle', price: 450, image: 'https://via.placeholder.com/300?text=Combo+Muscle' },
      ],
    }
  },
  'growth': {
    id: 'growth',
    name: 'Growth',
    logo: 'https://via.placeholder.com/200x100?text=Growth',
    products: {
      injetaveis: [
        { id: 'gr-1', name: 'Growth Test 200', price: 150, image: 'https://via.placeholder.com/300?text=Growth+Test' },
      ],
      orais: [
        { id: 'gr-2', name: 'Growth Dianabol 10mg', price: 80, originalPrice: 90, image: 'https://via.placeholder.com/300?text=Growth+Dianabol' },
      ],
    }
  },
  'r-pharm': {
    id: 'r-pharm',
    name: 'R.Pharm',
    logo: 'https://via.placeholder.com/200x100?text=R.Pharm',
    products: {
      injetaveis: [
        { id: 'rp-1', name: 'R.Pharm Test 250', price: 170, originalPrice: 190, image: 'https://via.placeholder.com/300?text=R.Pharm+Test' },
      ],
      orais: [
        { id: 'rp-2', name: 'R.Pharm Stan 10mg', price: 85, image: 'https://via.placeholder.com/300?text=R.Pharm+Stan' },
      ],
    }
  },
};

export const BrandProductsPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call to fetch brand data
    const fetchBrandData = async () => {
      setLoading(true);
      
      // In a real app, this would be a Supabase query
      setTimeout(() => {
        if (brandId && MOCK_BRANDS[brandId as keyof typeof MOCK_BRANDS]) {
          setBrand(MOCK_BRANDS[brandId as keyof typeof MOCK_BRANDS]);
        } else {
          // Handle brand not found
          console.error('Brand not found');
        }
        setLoading(false);
      }, 500);
    };
    
    fetchBrandData();
  }, [brandId]);
  
  if (loading) {
    return (
      <Layout>
        <div className="section-container py-12 flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse space-y-6 w-full max-w-3xl">
            <div className="flex items-center">
              <div className="w-40 h-14 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!brand) {
    return (
      <Layout>
        <div className="section-container py-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Marca não encontrada</h1>
          <p className="mb-6">Não conseguimos encontrar a marca que você procura.</p>
          <Button asChild>
            <Link to="/marcas">Voltar para Marcas</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const hasInjetaveis = brand.products.injetaveis && brand.products.injetaveis.length > 0;
  const hasOrais = brand.products.orais && brand.products.orais.length > 0;
  const hasCombos = brand.products.combos && brand.products.combos.length > 0;

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link to="/marcas">
              <ChevronLeft size={18} />
              <span>Voltar</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-8">
          <img src={brand.logo} alt={brand.name} className="h-24 object-contain" />
          <h1 className="text-3xl font-semibold text-imperio-navy">{brand.name}</h1>
        </div>
        
        {brand.shippingNote && (
          <Alert className="mb-8 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              {brand.shippingNote}
            </AlertDescription>
          </Alert>
        )}
        
        <Accordion type="single" collapsible className="w-full">
          {hasInjetaveis && (
            <AccordionItem value="injetaveis" className="border-b border-gray-200">
              <AccordionTrigger className="text-xl font-medium hover:text-imperio-navy">
                Produtos Injetáveis
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brand.products.injetaveis.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      brand={brand.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      url={`/produto/${product.id}`}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          
          {hasOrais && (
            <AccordionItem value="orais" className="border-b border-gray-200">
              <AccordionTrigger className="text-xl font-medium hover:text-imperio-navy">
                Produtos Orais
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brand.products.orais.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      brand={brand.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      url={`/produto/${product.id}`}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          
          {hasCombos && (
            <AccordionItem value="combos" className="border-b border-gray-200">
              <AccordionTrigger className="text-xl font-medium hover:text-imperio-navy">
                Combos
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brand.products.combos.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      brand={brand.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      url={`/produto/${product.id}`}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </Layout>
  );
};
