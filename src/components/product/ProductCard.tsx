
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart, CartItem } from '../../contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image?: string;
  url: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  url,
}) => {
  const { addItem, itemCount, total } = useCart();
  const [showDialog, setShowDialog] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item: CartItem = {
      id,
      name,
      brand,
      price,
      originalPrice,
      quantity,
      image,
    };
    
    addItem(item);
    setShowDialog(true);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  return (
    <>
      <div className="imperio-card hover-lift group">
        <Link to={url} className="block">
          <div className="relative">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full aspect-square object-cover rounded-md mb-3"
              />
            ) : (
              <div className="w-full aspect-square bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                <span className="text-gray-400">Sem imagem</span>
              </div>
            )}
            
            {originalPrice && (
              <div className="absolute top-2 left-2 bg-imperio-red text-white text-xs font-medium px-2 py-1 rounded">
                -{discountPercentage}%
              </div>
            )}
          </div>
          
          <div className="flex flex-col h-[120px]">
            <h3 className="font-medium text-lg group-hover:text-imperio-navy transition-colors">{name}</h3>
            <p className="text-sm text-gray-500 mb-2">{brand}</p>
            
            <div className="mt-auto">
              {originalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  {originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              )}
              <div className="flex justify-between items-end">
                <p className="text-lg font-semibold text-imperio-navy">
                  {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                
                <div className="flex items-center space-x-2">
                  <select 
                    value={quantity} 
                    onChange={handleQuantityChange}
                    className="bg-white border border-gray-200 rounded p-1 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  
                  <Button 
                    size="sm" 
                    className="bg-imperio-navy hover:bg-imperio-light-navy text-white"
                    onClick={handleAddToCart}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-imperio-navy">Produto Adicionado!</DialogTitle>
            <DialogDescription>
              <p className="mt-2">{name}</p>
              <p className="text-sm text-gray-500">{brand}</p>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="font-medium text-xl">
              Total do Carrinho: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:w-full"
              onClick={() => setShowDialog(false)}
            >
              Continuar Comprando
            </Button>
            <Button 
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:w-full"
              onClick={() => {
                setShowDialog(false);
                window.location.href = '/carrinho';
              }}
            >
              Ir para o Carrinho
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
