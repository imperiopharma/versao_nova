
import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useCart } from '../contexts/CartContext';
import { useCheckout } from '../contexts/CheckoutContext';
import { Link, useNavigate } from 'react-router-dom';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { Trash2, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    couponCode, 
    setCouponCode, 
    discount, 
    shippingCost,
    total
  } = useCart();
  const { setCheckoutStep } = useCheckout();
  const navigate = useNavigate();
  
  const [tempCouponCode, setTempCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };
  
  const handleApplyCoupon = () => {
    if (!tempCouponCode.trim()) {
      setCouponError('Por favor, insira um cupom');
      return;
    }
    
    // Simple validation for the example
    if (tempCouponCode.toUpperCase() === 'DESCONTO10') {
      setCouponCode(tempCouponCode.toUpperCase());
      setCouponError('');
    } else {
      setCouponError('Cupom inválido ou expirado');
    }
  };
  
  const handleProceedToCheckout = () => {
    // In a real app, check if user is logged in here
    // if not, redirect to login page
    // For now, we'll just proceed to the next step
    
    setCheckoutStep(2); // Move to 'Dados' step
    navigate('/checkout/dados');
  };

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mb-8">
          <CheckoutSteps currentStep={1} />
        </div>
        
        <h1 className="text-3xl font-semibold text-imperio-navy mb-8">Carrinho de Compras</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-500 mb-8">Adicione produtos ao seu carrinho para continuar suas compras.</p>
            <Button asChild>
              <Link to="/marcas">Explorar Marcas</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-subtle p-6">
                <div className="space-y-6">
                  {/* Cart Items */}
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-100 last:border-b-0 animate-fade-in"
                    >
                      {/* Image and Information */}
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="w-16 h-16 rounded-md bg-gray-200 mr-4 flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              Sem imagem
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          
                          <div className="flex sm:hidden mt-2">
                            <div className="flex items-center border border-gray-200 rounded-md">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-500 hover:text-imperio-navy focus:outline-none"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 border-x border-gray-200">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-500 hover:text-imperio-navy focus:outline-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price, Quantity, Actions */}
                      <div className="flex items-center justify-between w-full sm:w-auto space-x-4">
                        <div className="hidden sm:flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-500 hover:text-imperio-navy focus:outline-none"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-500 hover:text-imperio-navy focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium text-imperio-navy">
                            {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {(item.originalPrice * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-imperio-red hover:text-imperio-red/80 focus:outline-none"
                          aria-label="Remover"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-subtle p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Resumo do Pedido</h2>
                
                {/* Coupon Code */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium mb-2">
                    Cupom de Desconto
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="coupon"
                      placeholder="Digite o código"
                      value={tempCouponCode}
                      onChange={(e) => setTempCouponCode(e.target.value)}
                    />
                    <Button onClick={handleApplyCoupon}>
                      Aplicar
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-imperio-red text-sm mt-1">{couponError}</p>
                  )}
                  {couponCode && (
                    <p className="text-green-600 text-sm mt-1">
                      Cupom {couponCode} aplicado!
                    </p>
                  )}
                </div>
                
                {/* Order Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto</span>
                      <span>
                        -{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span>
                      {shippingCost > 0 
                        ? shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        : '+ frete'
                      }
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-imperio-red hover:bg-imperio-red/90 text-white text-lg py-6"
                  onClick={handleProceedToCheckout}
                >
                  Confirmar Carrinho
                  <ChevronRight size={18} className="ml-2" />
                </Button>
                
                <div className="mt-4">
                  <Button 
                    variant="ghost" 
                    className="text-gray-500 hover:text-imperio-navy w-full"
                    asChild
                  >
                    <Link to="/">
                      <ChevronLeft size={18} className="mr-2" />
                      Continuar Comprando
                    </Link>
                  </Button>
                </div>
                
                <Alert className="mt-6 bg-imperio-extra-light-navy border-imperio-navy/20">
                  <AlertTriangle className="h-4 w-4 text-imperio-navy" />
                  <AlertDescription className="text-imperio-navy text-sm">
                    Os valores de frete serão calculados na próxima etapa.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
