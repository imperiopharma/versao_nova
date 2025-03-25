
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddedToCartModalProps {
  productName: string;
  productImage?: string;
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md z-10 relative overflow-hidden animate-scale-in">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium text-imperio-navy">Produto Adicionado!</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            {productImage && (
              <img 
                src={productImage} 
                alt={productName}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <p className="font-medium text-gray-800">{productName}</p>
            </div>
          </div>
          
          <div className="font-semibold text-imperio-navy text-xl text-center mb-4">
            Total do Carrinho: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            <div className="text-sm text-gray-600 font-normal">
              {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Continuar Comprando
            </Button>
            
            <Button 
              className="w-full bg-imperio-navy hover:bg-imperio-light-navy"
              asChild
            >
              <Link 
                to="/carrinho"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Ir para o Carrinho
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
