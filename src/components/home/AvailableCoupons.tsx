
import React, { useState } from 'react';
import { Scissors, Copy, Check, BadgePercent } from 'lucide-react';
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
  
  // Função para retornar título e descrição dos cupons
  const getCouponInfo = (coupon: Coupon): { title: string; description: string } => {
    switch (coupon.type) {
      case 'percentage':
        return {
          title: `${coupon.value}% OFF`,
          description: coupon.minValue ? `Para compras acima de ${coupon.minValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : 'Sem valor mínimo'
        };
      case 'fixed':
        return {
          title: `${coupon.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} OFF`,
          description: coupon.minValue ? `Para compras acima de ${coupon.minValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : 'Sem valor mínimo'
        };
      case 'shipping':
        return {
          title: 'FRETE GRÁTIS',
          description: coupon.minValue ? `Para compras acima de ${coupon.minValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : 'Sem valor mínimo'
        };
      default:
        return {
          title: 'CUPOM',
          description: 'Desconto especial'
        };
    }
  };
  
  return (
    <section className="py-12 bg-white relative">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <BadgePercent className="w-5 h-5 text-imperio-navy" />
            <h2 className="text-2xl font-bold text-imperio-navy">Cupons de Desconto</h2>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Confira nossos cupons exclusivos para você economizar nas suas compras
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {availableCoupons.slice(0, 3).map((coupon, index) => {
            const { title, description } = getCouponInfo(coupon);
            
            return (
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="absolute right-2 top-2 text-gray-300">
                  <Scissors size={14} />
                </div>
                
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-bold text-imperio-navy text-lg">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                  
                  <div className="bg-white p-2 rounded border border-dashed border-gray-300 flex justify-between items-center my-3">
                    <code className="text-xs font-mono font-bold tracking-wide text-imperio-navy">
                      {coupon.code}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs hover:bg-imperio-navy/5 text-imperio-navy"
                      onClick={() => handleCopyCoupon(coupon.code)}
                    >
                      {copiedCoupon === coupon.code ? (
                        <Check size={14} className="mr-1 text-green-600" />
                      ) : (
                        <Copy size={14} className="mr-1" />
                      )}
                      <span>{copiedCoupon === coupon.code ? "Copiado" : "Copiar"}</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
