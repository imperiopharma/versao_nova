
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Minus, Plus, Trash2, ShoppingBag, 
  ChevronRight, AlertTriangle, 
  Tag, ShieldCheck, Truck, ArrowRight
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

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
  const [coupon, setCoupon] = useState(couponCode || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleApplyCoupon = () => {
    if (coupon.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Por favor, insira um código de cupom válido.',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulando um tempo de processamento para feedback visual
    setTimeout(() => {
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
      setIsSubmitting(false);
    }, 600);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="section-container py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-imperio-extra-light-navy flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:10px_10px] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-imperio-navy/5 to-imperio-light-navy/20"></div>
                <ShoppingBag size={40} className="text-imperio-navy relative z-10" />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent mb-4">
              Seu carrinho está vazio
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Navegue pelos nossos produtos e adicione-os ao seu carrinho para começar sua jornada de compras.
            </p>
            
            <Button asChild className="bg-gradient-to-r from-imperio-navy to-imperio-light-navy hover:brightness-110 text-white px-6 py-6 h-auto rounded-xl relative overflow-hidden group">
              <Link to="/">
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0 -translate-x-full animate-shimmer"></span>
                <span className="flex items-center relative z-10">
                  <span>Explorar Produtos</span>
                  <ArrowRight size={18} className="ml-2" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="section-container py-8 md:py-12">
        <div className="relative overflow-hidden">
          {/* Elementos decorativos - efeitos de luz e gradientes */}
          <div className="absolute -right-40 -top-40 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-white/5 to-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
          <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-gradient-to-tl from-blue-500/5 via-white/5 to-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
          
          {/* Grid de pontos decorativos */}
          <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy bg-clip-text text-transparent mb-8 relative z-10"
          >
            Carrinho de Compras
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Produtos */}
            <motion.div 
              className="lg:col-span-2 space-y-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {items.map((item, index) => (
                <motion.div 
                  key={item.id}
                  variants={item}
                  className="bg-white rounded-xl shadow-subtle p-5 flex flex-col sm:flex-row gap-5 border border-white hover:shadow-md transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-imperio-extra-light-navy/0 to-imperio-extra-light-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex-shrink-0 relative">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 shadow-sm">
                      <img 
                        src={item.image || 'https://via.placeholder.com/100'} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md mx-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Tag size={14} className="mr-1 text-imperio-navy/60" />
                      {item.brand}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
                      <div className="flex items-center">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-l-md rounded-r-none border-r-0 border-imperio-navy/20 hover:bg-imperio-extra-light-navy hover:text-imperio-navy"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <div className="h-8 px-3 min-w-[3rem] flex items-center justify-center border border-imperio-navy/20 bg-white text-imperio-navy font-medium">
                          {item.quantity}
                        </div>
                        
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-r-md rounded-l-none border-l-0 border-imperio-navy/20 hover:bg-imperio-extra-light-navy hover:text-imperio-navy"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3">
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
                          className="h-9 w-9 text-imperio-red hover:bg-imperio-red/10 hover:text-imperio-red border-imperio-red/20 rounded-full transition-all"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Resumo do Pedido */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-subtle p-6 border border-white relative overflow-hidden">
                <div className="absolute -z-10 w-80 h-80 bg-gradient-to-br from-imperio-navy/5 via-imperio-light-navy/5 to-imperio-extra-light-navy/5 -right-20 -top-20 rounded-full blur-3xl"></div>
                
                <h2 className="text-lg font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent mb-6">
                  Resumo do Pedido
                </h2>
                
                <div className="space-y-6">
                  {/* Cupom de Desconto */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 relative">
                        <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-imperio-navy/60" />
                        <Input
                          placeholder="Digite o código"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="pl-10 border-imperio-navy/20 bg-white shadow-sm rounded-lg hover:border-imperio-navy/40 focus:ring-imperio-navy/30"
                        />
                      </div>
                      <Button 
                        onClick={handleApplyCoupon}
                        disabled={isSubmitting}
                        className="whitespace-nowrap bg-gradient-to-r from-imperio-navy to-imperio-light-navy hover:brightness-110 text-white rounded-lg relative overflow-hidden group"
                      >
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {isSubmitting ? 'Aplicando...' : 'Aplicar'}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Cálculos */}
                  <div className="border-t border-b border-imperio-navy/10 py-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-green-600">
                        <span className="flex items-center">
                          <Tag size={16} className="mr-1" />
                          Desconto
                        </span>
                        <span>-{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-gray-600">
                        <Truck size={16} className="mr-1" />
                        Frete
                      </span>
                      <span className="text-gray-500">Calculado no checkout</span>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent">
                      {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  
                  {/* Botão de Checkout */}
                  <Button 
                    className="w-full bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy hover:brightness-110 text-white h-12 rounded-xl relative overflow-hidden group"
                    onClick={() => {
                      setIsSubmitting(true);
                      setTimeout(() => {
                        navigate('/checkout/dados');
                      }, 300);
                    }}
                    disabled={isSubmitting}
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0 -translate-x-full animate-shimmer"></span>
                    <span className="flex items-center relative z-10">
                      <span>Finalizar Compra</span>
                      <ChevronRight size={18} className="ml-2" />
                    </span>
                  </Button>
                  
                  {/* Badge de Segurança */}
                  <div className="flex items-center justify-center gap-2 bg-imperio-extra-light-navy/50 p-3 rounded-lg">
                    <ShieldCheck size={18} className="text-imperio-navy" />
                    <span className="text-sm text-imperio-navy">Compra 100% Segura</span>
                  </div>
                  
                  {/* Aviso */}
                  <div className="bg-imperio-extra-light-navy p-3 rounded-lg flex gap-2 items-start text-sm">
                    <AlertTriangle size={18} className="text-imperio-navy flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Produtos disponíveis conforme estoque. Preços sujeitos a alteração sem aviso prévio.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <Link 
                      to="/" 
                      className="text-imperio-navy text-sm hover:underline flex items-center justify-center"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <ArrowRight size={16} className="mr-1 rotate-180" />
                      Continuar Comprando
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
