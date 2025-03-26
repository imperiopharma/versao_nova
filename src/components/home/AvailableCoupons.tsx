
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
  
  // Limitamos a exibição a apenas 2 cupons para ficar mais organizado
  const displayCoupons = availableCoupons.slice(0, 2);
  
  if (displayCoupons.length === 0) {
    return null;
  }
  
  return (
    <section className="py-4 bg-white relative">
      <div className="section-container max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center justify-center gap-2">
            <BadgePercent className="w-5 h-5 text-imperio-navy" />
            <h2 className="text-lg font-bold text-imperio-navy">Cupons Disponíveis</h2>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {displayCoupons.map((coupon, index) => {
            const { title, description } = getCouponInfo(coupon);
            
            return (
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="p-3">
                  <h3 className="font-bold text-imperio-navy text-base">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{description}</p>
                  
                  <div className="bg-white p-2 rounded border border-dashed border-gray-200 flex justify-between items-center">
                    <code className="text-xs font-mono font-bold tracking-wide text-imperio-navy">
                      {coupon.code}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs hover:bg-imperio-navy/5 text-imperio-navy"
                      onClick={() => handleCopyCoupon(coupon.code)}
                    >
                      {copiedCoupon === coupon.code ? (
                        <Check size={12} className="mr-1 text-green-600" />
                      ) : (
                        <Copy size={12} className="mr-1" />
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
