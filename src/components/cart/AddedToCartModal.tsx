
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/formatters';

interface AddedToCartModalProps {
  productName: string;
  productImage: string;
  total: number;
  itemCount: number;
  onClose: () => void;
}

export const AddedToCartModal: React.FC<AddedToCartModalProps> = ({
  productName,
  productImage,
  total,
  itemCount,
  onClose
}) => {
  // Fechar automaticamente após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative z-10 overflow-hidden animate-scale-in">
        <div className="bg-imperio-navy text-white py-3 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle size={18} className="mr-2" />
            <h3 className="font-medium">Produto adicionado ao carrinho</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-50 rounded border overflow-hidden flex-shrink-0">
              <img 
                src={productImage} 
                alt={productName} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="ml-3">
              <p className="font-medium">{productName}</p>
              <p className="text-sm text-imperio-navy">Adicionado com sucesso!</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-md p-3 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Seu carrinho</p>
                <p className="font-medium">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</p>
              </div>
              <p className="font-bold text-imperio-navy">{formatCurrency(total)}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Continuar Comprando
            </Button>
            
            <Button
              asChild
              className="flex-1 bg-imperio-navy hover:bg-imperio-light-navy"
            >
              <Link to="/carrinho" className="flex items-center justify-center">
                <ShoppingBag size={16} className="mr-2" />
                Ver Carrinho
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
