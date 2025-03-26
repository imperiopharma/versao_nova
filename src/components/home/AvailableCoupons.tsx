
import React, { useState } from 'react';
import { Tag, Copy, Check, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart, Coupon } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

export const AvailableCoupons: React.FC = () => {
  const { availableCoupons } = useCart();
  const { toast } = useToast();
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  
  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    
    toast({
      title: 'Cupom copiado!',
      description: 'Agora você pode aplicá-lo no seu carrinho.',
    });
    
    setTimeout(() => {
      setCopiedCoupon(null);
    }, 3000);
  };
  
  // Função auxiliar para formatar o valor mínimo do cupom
  const formatMinValue = (value?: number): string => {
    if (!value) return '';
    return `acima de ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  };
  
  // Função para retornar título e descrição dos cupons
  const getCouponInfo = (coupon: Coupon): { title: string; description: string } => {
    switch (coupon.type) {
      case 'percentage':
        return {
          title: `${coupon.value}% OFF`,
          description: `Desconto de ${coupon.value}% ${formatMinValue(coupon.minValue)}`
        };
      case 'fixed':
        return {
          title: `${coupon.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} OFF`,
          description: `Desconto de ${coupon.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ${formatMinValue(coupon.minValue)}`
        };
      case 'shipping':
        return {
          title: 'FRETE GRÁTIS',
          description: `Frete grátis para compras ${formatMinValue(coupon.minValue)}`
        };
      default:
        return {
          title: 'CUPOM',
          description: 'Desconto especial'
        };
    }
  };
  
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-imperio-navy/10 via-imperio-light-navy/30 to-imperio-navy/10"></div>
      <div className="absolute w-96 h-96 -top-48 -right-48 bg-gradient-to-br from-imperio-navy/5 via-imperio-light-navy/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-gradient-to-tl from-imperio-navy/5 via-imperio-light-navy/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-3">
            <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-imperio-navy/10 text-imperio-navy rounded-full">
              Economize Mais
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-imperio-navy mb-4">Cupons de Desconto</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aproveite nossos cupons exclusivos e economize em suas compras. Basta copiar o código e aplicar no carrinho.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCoupons.map((coupon, index) => {
            const { title, description } = getCouponInfo(coupon);
            
            return (
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white rounded-lg overflow-hidden shadow-subtle group"
              >
                {/* Elemento decorativo - pontilhado no lado esquerdo */}
                <div className="absolute h-full w-3 left-0 top-0 flex flex-col justify-between py-4">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                </div>
                
                {/* Elemento decorativo - tesoura */}
                <div className="absolute right-4 top-4 text-gray-300 transform rotate-45">
                  <Scissors size={24} />
                </div>
                
                <div className="pt-6 px-6 pb-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-imperio-navy/10 rounded-full flex items-center justify-center mr-3">
                      <Tag className="text-imperio-navy" size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-imperio-navy">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg border border-dashed border-imperio-navy/30 flex justify-between items-center mt-4">
                    <code className="text-sm font-mono font-bold tracking-wide text-imperio-navy">
                      {coupon.code}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 bg-white border-imperio-navy/20 hover:bg-imperio-navy/10 text-imperio-navy group"
                      onClick={() => handleCopyCoupon(coupon.code)}
                    >
                      {copiedCoupon === coupon.code ? (
                        <span className="flex items-center">
                          <Check size={14} className="mr-1 text-green-600" />
                          <span className="text-green-600">Copiado</span>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Copy size={14} className="mr-1" />
                          <span>Copiar</span>
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-gray-50 border-t border-dashed border-imperio-navy/20">
                  <p className="text-xs text-gray-500">
                    Use no carrinho ou na finalização da compra
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
