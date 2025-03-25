
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, AlertTriangle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    discount, 
    couponCode, 
    setCouponCode,
    total
  } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coupon, setCoupon] = React.useState(couponCode || '');
  
  const handleApplyCoupon = () => {
    if (coupon.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Por favor, insira um código de cupom válido.',
      });
      return;
    }
    
    if (coupon === 'DESCONTO10') {
      setCouponCode(coupon);
      toast({
        title: 'Cupom aplicado!',
        description: 'Desconto de 10% aplicado com sucesso.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Cupom inválido',
        description: 'O código inserido não é válido ou expirou.',
      });
    }
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="section-container py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-imperio-extra-light-navy flex items-center justify-center">
                <ShoppingBag size={36} className="text-imperio-navy" />
              </div>
            </div>
            
            <h1 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h1>
            <p className="text-gray-600 mb-8">
              Navegue pelos nossos produtos e adicione-os ao seu carrinho.
            </p>
            
            <Button asChild className="bg-imperio-navy hover:bg-imperio-light-navy">
              <Link to="/">Explorar Produtos</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="section-container py-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-imperio-navy mb-6">
          Carrinho de Compras
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-lg shadow-subtle p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-shrink-0">
                  <img 
                    src={item.image || 'https://via.placeholder.com/100'} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mx-auto"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  
                  <div className="flex flex-wrap items-center justify-between mt-3 gap-2">
                    <div className="flex items-center">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-l-md rounded-r-none border-r-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <div className="h-8 w-12 flex items-center justify-center border border-input">
                        {item.quantity}
                      </div>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-r-md rounded-l-none border-l-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through block">
                            {item.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </span>
                        )}
                        <span className="font-bold text-lg text-imperio-navy">
                          {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 text-imperio-red hover:bg-imperio-red/10 hover:text-imperio-red border-imperio-red/20"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-subtle p-6">
              <div className="space-y-6">
                {/* Cupom de Desconto */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Digite o código"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleApplyCoupon}
                      className="whitespace-nowrap bg-imperio-navy hover:bg-imperio-light-navy"
                    >
                      Aplicar
                    </Button>
                  </div>
                </div>
                
                {/* Cálculos */}
                <div className="border-t border-b py-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto</span>
                      <span>-{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-gray-500">Calculado no checkout</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-imperio-navy">
                    {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                
                {/* Botão de Checkout */}
                <Button 
                  className="w-full bg-imperio-navy hover:bg-imperio-light-navy"
                  onClick={() => navigate('/checkout/dados')}
                >
                  Finalizar Compra
                  <ChevronRight size={16} className="ml-2" />
                </Button>
                
                {/* Aviso */}
                <div className="bg-imperio-extra-light-navy p-3 rounded-md flex gap-2 items-start text-sm">
                  <AlertTriangle size={18} className="text-imperio-navy flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Produtos disponíveis conforme estoque. Preços sujeitos a alteração sem aviso prévio.
                  </p>
                </div>
                
                <div className="text-center">
                  <Link 
                    to="/" 
                    className="text-imperio-navy text-sm hover:underline"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
